import {observable, computed, map, toJS, action} from 'mobx'; 
import axios from 'axios'
import { API_ROOT } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';

class Users {
	@observable user = null;
	@observable id = null;
	@observable isLoggedIn = false;
	@observable busy = false; 
	@observable errors = null;
	@observable success = null;
	
	@action login = function(id, email, password, facebook_id, apple_id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		let user = {
				id: id,
				email: email,
				password: password, 
				facebook_id: facebook_id,
				apple_id: apple_id,
		}
		
		return new Promise(function(resolve, reject) {
			axios.post(API_ROOT + '/login', {user}, {withCredentials: true})
			.then(response => {
				if (response.data.logged_in) {
					console.log("LOGGED IN")
					that.handleSuccess()
					that.handleLogin(response.data.user)
					resolve(response.data.user)
				} else {
					that.handleErrors(response.data.errors)
					that.handleLogout()
					reject(response.data.errors);
				}
			})
			.catch(errors => {
				AsyncStorage.clear();
				that.handleLogout();
				console.log('api errors:', errors)
			})
		})
	}
	@action logout = function() {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.delete(API_ROOT + '/logout', {withCredentials: true})
			.then(response => {
				that.handleSuccess()
				that.handleLogout()
				resolve(response)
			})
			.catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
			})
		})
	}
	@action register = function(email, name, username, password, password_confirmation, facebook_id, apple_id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then

		let user = {
				email: email,
				name: name,
				username: username,
				password: password,
				password_confirmation: password_confirmation,
				facebook_id: facebook_id,
				apple_id: apple_id
		}
		
		return new Promise(function(resolve, reject) {
			// validate password confirmation
			if (password != password_confirmation) {
				that.handleErrors(["Passwords did not match"])
				that.handleLogout()
				reject(["Passwords did not match"])
				return;
			}
			axios.post(API_ROOT + '/users', {user}, {withCredentials: true})
			.then(response => {
				if (response.data.status === 'created') {
					that.handleSuccess()
					that.handleLogin(response.data.user)
					resolve(response.data.user)
				} else {
					that.handleErrors(response.data.errors)
					that.handleLogout()
					reject(response.data.errors)
				}
			})
			.catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
			})
		})
	}
	
	@action async loginStatus() {
		this.isLoggedIn = false; 
		console.log("check log in")
		
		try {
			const user_id = await AsyncStorage.getItem('@user_id')
			if (user_id) {
				this.login(user_id);
			} else {
				this.handleLogout();
			}
		} catch(errors) {
			this.handleLogout()
			console.log('async storage errors:', errors)
		}
	}
	
	@action verifyAppleToken = function(identity_token, user_identity) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.put(API_ROOT + '/apple_token', {identity_token, user_identity}, {withCredentials: true})
	        .then(response => {
	        	if (response.data.status === 'verified') {
		            resolve(response.data.apple_id);
				} else {
					that.handleErrors(response.data.errors)
					reject(response.data.errors)
				}
	        })
	        .catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
			})
		})
	}
	
	@action connectFacebook = function(facebook_id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.put(API_ROOT + '/users/' + that.id + '/connect_facebook', {facebook_id}, {withCredentials: true})
	        .then(response => {
	        	if (response.data.status === 'updated') {
					that.handleSuccess()
					that.handleLogin(response.data.user)
		        	that.success = "Your Facebook account was connected successfully";
		            resolve(response.data.user);
				} else {
					that.handleErrors(response.data.errors)
					reject(response.data.errors)
				}
	        })
	        .catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
			})
		})
	}
	
	@action importFacebookFriends = function(token) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			fetch('https://graph.facebook.com/v7.0/me?fields=email,name,friends&access_token=' + token)
			.then((response) => response.json())
			.then((json) => {
				// get all friends with the facebook_id
				let { data } = json.friends;
				let ids = data.map(user => {
				    return user.id
				})
				axios.put(API_ROOT + '/users/' + that.id + '/facebook_friends', {user_ids: ids}, {withCredentials: true})
		        .then(response => {
		            that.handleSuccess()
					resolve(response.data.friends);
		        })
		        .catch(errors => reject(errors))
			})
			.catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
			})
		})
	}
	
	@action search = function(keyword) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/users/search/' + keyword, {withCredentials: true})
	        .then(response => {
	            that.handleSuccess()
				resolve(response.data.users);
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	@action show = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/users/' + id, {withCredentials: true})
	        .then(response => {
	        	that.handleSuccess();
	        	// if same as logged in user
	        	if (response.data.user.id == that.id) {
					that.handleLogin(response.data.user)
	        	}
	            resolve(response.data.user);
	        })
	        .catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
			})
		})
	}
	
	@action update = function(user) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.put(API_ROOT + '/users/' + user.id, {user}, {withCredentials: true})
	        .then(response => {
	        	if (response.data.status === 'updated') {
					that.handleSuccess()
					that.handleLogin(response.data.user)
		        	that.success = "Your profile was saved successfully";
		            resolve(response.data.user);
				} else {
					that.handleErrors(response.data.errors)
					reject(response.data.errors)
				}
	        })
	        .catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
			})
		})
	}
	
	@action reset = function(old_password, password, password_confirmation) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			if (old_password == "" || password == "" || password_confirmation == "") {
				that.handleErrors(["Please enter all fields"])
				reject(["Please enter all fields"])
				return;
			}
			
			// validate password confirmation
			if (password != password_confirmation) {
				that.handleErrors(["Passwords did not match"])
				reject(["Passwords did not match"])
				return;
			}
			axios.put(API_ROOT + '/users/' + that.id + '/change_password', {old_password: old_password, password: password}, {withCredentials: true})
			.then(response => {
				if (response.data.status === 'updated') {
					that.handleSuccess()
					that.handleLogin(response.data.user)
		        	that.success = "Your password was changed successfully";
					resolve(response.data.user)
				} else {
					that.handleErrors(response.data.errors)
					reject(response.data.errors)
				}
			})
			.catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
			})
		})
	}
	
	@action sendRequest = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.put(API_ROOT + '/users/' + id + '/send_request', {withCredentials: true})
	        .then(response => {
	        	that.handleSuccess();
	        	that.show(that.id);
	            resolve(response.data.user);
	        })
	        .catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
			})
		})
	}
	
	@action undoRequest = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.delete(API_ROOT + '/users/' + id + '/undo_request', {withCredentials: true})
	        .then(response => {
	        	that.handleSuccess();
	        	that.show(that.id);
	            resolve(response.data.user);
	        })
	        .catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
			})
		})
	}
	
	@action acceptRequest = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.put(API_ROOT + '/users/' + id + '/accept_request', {withCredentials: true})
	        .then(response => {
	        	that.handleSuccess();
	        	that.show(that.id);
	            resolve(response.data.user);
	        })
	        .catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
			})
		})
	}
	
	@action setNotificationToken = function(token) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.put(API_ROOT + '/users/' + that.id + '/notification_token', {token}, {withCredentials: true})
	        .then(response => {
	        	that.handleSuccess();
	            resolve(response.data.user);
	        })
	        .catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
			})
		})
	}
	
	@action addPoints = function(points, id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		if (!id) id = that.id;
		
		return new Promise(function(resolve, reject) {
			axios.put(API_ROOT + '/users/' + id + '/points', {points}, {withCredentials: true})
	        .then(response => {
	        	that.handleSuccess();
	            resolve(response.data.points);
	        })
	        .catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
			})
		})
	}
	
	@action submitTicket = function(ticket) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.put(API_ROOT + '/users/' + that.id + '/submit_ticket', {ticket}, {withCredentials: true})
	        .then(response => {
	        	if (response.data.status === 'submitted') {
					that.handleSuccess()
		        	that.success = "Your ticket was submitted successfully. We will respond within 48 hours.";
		            resolve(response.data.ticket);
				} else {
					that.handleErrors(response.data.errors)
					reject(response.data.errors)
				}
	        })
	        .catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
			})
		})
	}
	
	handleSuccess() {
		this.errors = null;
		this.success = null;
		this.busy = false
	}
	
	handleErrors(errors) {
		this.errors = errors
		this.success = null;
		this.busy = false
	}
	
	handleLogin(user) {
		this.user = user;
		this.id = user.id;
		this.isLoggedIn = true;
		this.storeLoginToken(user.id);
	}

	async storeLoginToken(user_id) {
		console.log("storing login token")
		try {
			await AsyncStorage.setItem('@user_id', JSON.stringify(user_id))
		} catch (errors) {
			// saving error
			console.log('async storage errors:', errors)
		}
	}
	
	handleLogout() {
		this.user = null; 
		this.id = null;
		this.isLoggedIn = false;
		this.removeLoginToken();
	}
	
	async removeLoginToken() {
		try {
			await AsyncStorage.removeItem('@user_id')
		} catch(errors) {
			// remove error
			console.log('async storage errors:', errors)
		}
		console.log('Done.')
	}
}

const users = new Users();
export default users;