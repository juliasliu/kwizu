import {observable, computed, map, toJS, action} from 'mobx'; 
import axios from 'axios'
import { API_ROOT } from '../constants';

class Users {
	@observable user = null;
	@observable id = null;
	@observable isLoggedIn = false;
	@observable busy = false; 
	@observable errors = null;
	@observable success = null;
	
	@action login = function(email, password) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		let user = {
				email: email,
				password: password
		}
		
		return new Promise(function(resolve, reject) {
			axios.post(API_ROOT + '/login', {user}, {withCredentials: true})
			.then(response => {
				if (response.data.logged_in) {
					that.handleSuccess()
					that.handleLogin(response.data.user)
					resolve(response.data.user)
				} else {
					that.handleErrors(response.data.errors)
					that.handleLogout()
					reject(response.data.errors);
				}
			})
			.catch(errors => console.log('api errors:', errors))
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
	@action register = function(email, name, username, password, password_confirmation) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then

		let user = {
				email: email,
				name: name,
				username: username,
				password: password,
				password_confirmation: password_confirmation
		}
		
		return new Promise(function(resolve, reject) {
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
		
		axios.get(API_ROOT + '/logged_in', 
				{withCredentials: true})
				.then(response => {
					if (response.data.logged_in) {
						this.handleSuccess()
						this.handleLogin(response.data.user)
					} else {
						this.handleErrors(response.data.errors)
						this.handleLogout()
					}
				})
				.catch(errors => {
					this.handleErrors(errors)
					console.log('api errors:', errors)
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
	}
	
	handleLogout() {
		this.user = null; 
		this.id = null;
		this.isLoggedIn = false;
	}
}

const users = new Users();
export default users;