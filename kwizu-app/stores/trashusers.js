//		axios.get(API_ROOT + '/logged_in', 
//				{withCredentials: true})
//				.then(response => {
//					if (response.data.logged_in) {
//						this.handleSuccess()
//						this.handleLogin(response.data.user)
//					} else {
//						this.handleErrors(response.data.errors)
//						this.handleLogout()
//					}
//				})
//				.catch(errors => {
//					this.handleErrors(errors)
//					console.log('api errors:', errors)
//				})


import {observable, computed, map, toJS, action} from 'mobx'; 
import axios from 'axios'
import chats from './chats'
import firebase from 'firebase';
import { firebaseApp } from '../firebase';
import notifications from '../notifications'

class Users {
	@observable id = null;
	@observable isLoggedIn = false; 
	@observable name = null;
	@observable avatar = null; 
	@observable notificationsToken = null;
	@observable loggingIn = false; 
	@observable registering = false; 
	@observable loggingError = null;
	@observable registeringError = null;
	
	@action login = function(username, password) { 
		//login with Firebase email/password method
		this.loggingIn = true;
		this.loggingError = null;
		firebase.auth().signInWithEmailAndPassword(username, password)
		.then(() => {
			this.loggingIn = false;
			notifications.init((notificationsToken) => {
				this.setNotificationsToken(notificationsToken);
			});
		})
		.catch((error) => { 
			this.loggingIn = false;
			this.loggingError = error.message;
		});
	}
	@action logout = function() {
		//logout from Firebase authentication service
		notifications.unbind();
		this.setNotificationsToken('');
		firebase.auth().signOut();
	}
	@action register = function(email, password, name) { 
		//register through firebase authentication service
		if(!name || name == '') {
			this.registering = false; this.registeringError = 'Name was not entered'; return;
		}
		this.registering = true;
		this.registeringError = null; 
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((user) => {
			this.registering = false;
			notifications.init((notificationsToken) => {
				this.setNotificationsToken(notificationsToken);
			});
			firebaseApp.database().ref('/users/' + user.uid).set({
				name: name
			});
		})
		.catch((error) => {
			this.registering = false;
			this.registeringError = error.message;
		})
	}
	@action setNotificationsToken(token) {
		//store the notifications token for this device
		if(!this.id) return;
		this.notificationsToken = token;
		firebaseApp.database().ref('/users/' + this.id).update({
			notificationsToken: token
		});
	}
	searchUsers(name) {
		//helper for searching users by name in the database
		return new Promise(function(resolve) {
			firebaseApp.database().ref('/users/').once('value')
			.then(function(snapshot) {
				let foundUsers = [];
				const users = snapshot.val();
				for(var id in users) {
					if(users[id].name === name) { 
						foundUsers.push({
							name: users[id].name, 
							avatar: users[id].avatar, 
							notificationsToken: users[id].notificationsToken, 
							id
						})
					}
				}
				resolve(foundUsers);
			})
		})
	}
	constructor() {
		this.bindToFirebase();
	}
	bindToFirebase() {
		//Initialise connection to Firebase user
		//authentication status and data
		return firebase.auth().onAuthStateChanged((user) => {
			if(this.chatsBind && typeof this.chatsBind.off === 'function') 
				this.chatsBind.off();
			if(this.userBind && typeof this.userBind.off === 'function') 
				this.userBind.off();

			if (user) {
				this.id = user.uid;
				this.isLoggedIn = true;
				this.chatsBind = chats.bindToFirebase(user.uid);
				this.userBind = firebaseApp.database().ref('/users/' + this.id).on('value', (snapshot) =>
				{
					const userObj = snapshot.val(); 
					if(!userObj) return;
					this.name = userObj.name;
					this.avatar = userObj.avatar;
				});
			} else {
				this.id = null; 
				this.isLoggedIn = false;
				this.userBind = null;
				this.name = null; 
				this.avatar = null;
			} 
		});
	}
}

const users = new Users();
export default users;