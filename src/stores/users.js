import {observable, computed, map, toJS, action} from 'mobx'; 
import axios from 'axios'

class Users {
	@observable user = null;
	@observable id = null;
	@observable isLoggedIn = false;
	@observable busy = false; 
	@observable error = null;
	@observable success = null;
	
	@action login = function(email, password) { 
		this.busy = true;
		
		let user = {
				email: email,
				password: password
		}
		
		axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
		.then(response => {
			if (response.data.logged_in) {
				this.handleSuccess()
				this.handleLogin(response.data.user)
				console.log()
			} else {
				this.handleErrors(response.data.errors)
				this.handleLogout()
			}
		})
		.catch(error => console.log('api errors:', error))
	}
	@action logout = function() {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {

			axios.delete('http://localhost:3001/logout', {withCredentials: true})
			.then(response => {
				that.handleSuccess()
				that.handleLogout()
				resolve(response)
			})
			.catch(error => {
					that.handleErrors(error)
					console.log('api errors:', error)
					reject(error);
				})
		})
	}
	@action register = function(email, name, username, password, password_confirmation) {
		this.busy = true;
		
		if(!email || email == '') {
			this.busy = false; 
			this.error = 'Email was not entered'; 
			return;
		}
		if(!name || name == '') {
			this.busy = false; 
			this.error = 'Name was not entered'; 
			return;
		}
		if(!username || username == '') {
			this.busy = false; 
			this.error = 'Username was not entered'; 
			return;
		}
		if(!password || password == '') {
			this.busy = false; 
			this.error = 'Password was not entered';
			return;
		}
		if(!password_confirmation || password_confirmation != password) {
			this.busy = false; 
			this.error = 'Password did not match'; 
			return;
		}
		let user = {
				email: email,
				name: name,
				username: username,
				password: password,
				password_confirmation: password_confirmation
		}
		
		axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
		.then(response => {
			if (response.data.status === 'created') {
				this.handleSuccess()
				this.handleLogin(response.data.user)
			} else {
				this.handleErrors(response.data.errors)
				this.handleLogout()
			}
		})
		.catch(error => {
					this.handleErrors(error)
					console.log('api errors:', error)
					reject(error);
				})
	}
	
	@action async loginStatus() {
		this.isLoggedIn = false; 
		
		axios.get('http://localhost:3001/logged_in', 
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
				.catch(error => {
					this.handleErrors(error)
					console.log('api errors:', error)
					reject(error);
				})
	}
	
	@action show = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get('http://localhost:3001/users/' + id, {withCredentials: true})
	        .then(response => {
	        	that.handleSuccess();
	        	// if same as logged in user
	        	if (response.data.user == that.id) {
					this.handleLogin(response.data.user)
	        	}
	            resolve(response.data.user);
	        })
	        .catch(error => {
				that.handleErrors(error)
				console.log('api errors:', error)
				reject(error);
			})
		})
	}
	
	@action update = function(user) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		if(user.caption.length > 150) {
			this.busy = false; 
			this.error = 'Caption is too long, must be ≤150 chars long'; 
			return;
		}
		
		return new Promise(function(resolve, reject) {
			axios.put('http://localhost:3001/users/' + user.id, {user}, {withCredentials: true})
	        .then(response => {
	        	that.handleSuccess();
	        	that.success = "Your profile was saved successfully";
	            resolve(response.data.user);
	        })
	        .catch(error => {
				that.handleErrors(error)
				console.log('api errors:', error)
				reject(error);
			})
		})
	}
	
	@action sendRequest = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.put('http://localhost:3001/users/' + id + '/send_request', {withCredentials: true})
	        .then(response => {
	        	that.handleSuccess();
	            resolve(response.data.user);
	        })
	        .catch(error => {
				that.handleErrors(error)
				console.log('api errors:', error)
				reject(error);
			})
		})
	}
	
	@action undoRequest = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.delete('http://localhost:3001/users/' + id + '/undo_request', {withCredentials: true})
	        .then(response => {
	        	that.handleSuccess();
	            resolve(response.data.user);
	        })
	        .catch(error => {
				that.handleErrors(error)
				console.log('api errors:', error)
				reject(error);
			})
		})
	}
	
	@action acceptRequest = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.put('http://localhost:3001/users/' + id + '/accept_request', {withCredentials: true})
	        .then(response => {
	        	that.handleSuccess();
	            resolve(response.data.user);
	        })
	        .catch(error => {
				that.handleErrors(error)
				console.log('api errors:', error)
				reject(error);
			})
		})
	}
	
	handleSuccess() {
		this.error = null;
		this.success = null;
		this.busy = false
	}
	
	handleErrors(errors) {
		this.error = errors
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