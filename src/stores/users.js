import {observable, computed, map, toJS, action} from 'mobx'; 
import axios from 'axios'

class Users {
	@observable user = null;
	@observable isLoggedIn = false;
	@observable loggingIn = false; 
	@observable loggingError = null;
	@observable registering = false; 
	@observable registeringError = null;
	
	@action login = function(email, password) { 
		let user = {
				email: email,
				password: password
		}
		this.loggingIn = true;
		this.loggingError = null;
		
		axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
		.then(response => {
			if (response.data.logged_in) {
				this.handleLogin(response.data)
				console.log()
			} else {
				this.handleLogout()
				this.loggingError = response.data.errors
			}
		})
		.catch(error => console.log('api errors:', error))
	}
	@action logout = function() {
		axios.delete('http://localhost:3001/logout', {withCredentials: true})
	    .then(response => {
	    	this.handleLogout()
	    })
	    .catch(error => console.log(error))
	}
	@action register = function(email, name, username, password, password_confirmation) {
		if(!email || email == '') {
			this.registering = false; 
			this.registeringError = 'Email was not entered'; 
			return;
		}
		if(!name || name == '') {
			this.registering = false; 
			this.registeringError = 'Name was not entered'; 
			return;
		}
		if(!username || username == '') {
			this.registering = false; 
			this.registeringError = 'Username was not entered'; 
			return;
		}
		if(!password || password == '') {
			this.registering = false; 
			this.registeringError = 'Password was not entered';
			return;
		}
		if(!password_confirmation || password_confirmation != password) {
			this.registering = false; 
			this.registeringError = 'Password did not match'; 
			return;
		}
		let user = {
				email: email,
				name: name,
				username: username,
				password: password,
				password_confirmation: password_confirmation
		}
		this.registering = true;
		this.registeringError = null;
		
		axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
		.then(response => {
			if (response.data.status === 'created') {
				this.handleLogin(response.data)
			} else {
				this.handleLogout()
				this.registeringError = response.data.errors
			}
		})
		.catch(error => console.log('api errors:', error))
	}
	
	@action async loginStatus() {
		this.isLoggedIn = false; 
		
		axios.get('http://localhost:3001/logged_in', 
				{withCredentials: true})
				.then(response => {
					if (response.data.logged_in) {
						this.handleLogin(response)
					} else {
						this.handleLogout()
					}
				})
				.catch(error => console.log('api errors:', error))
	}
	
	handleLogin(data) {
		this.user = data.user;
		this.isLoggedIn = true;
		this.loggingIn = false;
		this.registering = false;
	}
	
	handleLogout() {
		this.user = null; 
		this.isLoggedIn = false;
		this.loggingIn = false;
		this.registering = false;
	}
}

const users = new Users();
export default users;