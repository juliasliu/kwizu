import {observable, computed, map, toJS, action} from 'mobx'; 
import axios from 'axios'
import { API_ROOT } from '../constants';

class Quizzes {
	@observable quiz = null;
	@observable id = null;
	@observable busy = false; 
	@observable errors = null;
	@observable success = null;
	
	@action create = function(quiz) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.post(API_ROOT + '/quizzes', {quiz: quiz}, {withCredentials: true})
			.then(response => {
				if (response.data.status === 'created') {
					that.handleSuccess(response.data.quiz)
					if (!quiz.public) {
						that.success = "Your Kwiz was saved successfully";
					}
					resolve(response.data.quiz);
				} else {
					that.handleErrors(response.data.errors)
					console.log('creating errors:', response.data.errors)
					reject(response.data.errors);
				}
			})
			.catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
			})
		})
	}
	
	@action index = function() {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/quizzes', {withCredentials: true})
	        .then(response => {
	            that.handleSuccess()
	        	resolve(response.data);
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	@action search = function(keyword) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/quizzes/search/' + keyword, {withCredentials: true})
	        .then(response => {
	            that.handleSuccess()
				resolve(response.data.quizzes);
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	@action show = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/quizzes/' + id, {withCredentials: true})
	        .then(response => {
				that.handleSuccess(response.data.quiz)
	            resolve({quiz: response.data.quiz, quizzing: response.data.quizzing});
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	@action quizzing = function(quiz_id, user_id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/quizzings/' + quiz_id + '/' + user_id, {withCredentials: true})
	        .then(response => {
				that.handleSuccess(response.data.quiz)
	            resolve({quiz: response.data.quiz, quizzing: response.data.quizzing});
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	@action leader = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/quizzes/' + id + '/leader', {withCredentials: true})
	        .then(response => {
	            that.handleSuccess(response.data.quiz)
				resolve({quiz: response.data.quiz, users: response.data.users, quizzings: response.data.quizzings });
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	@action recommend = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/quizzes/' + id + '/recommend', {withCredentials: true})
	        .then(response => {
	            that.handleSuccess();
	            resolve(response.data.quizzes);
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	@action save = function(quizzing) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.post(API_ROOT + '/quizzes/save', {quizzing: quizzing, result_id: quizzing.result_id, choice_ids: quizzing.choice_ids}, {withCredentials: true})
	        .then(response => {
	            that.handleSuccess()
	            resolve(response.data);
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	@action update = function(quiz) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.put(API_ROOT + '/quizzes/' + quiz.id, {quiz: quiz}, {withCredentials: true})
	        .then(response => {
	        	if (response.data.status === 'updated') {
		        	that.handleSuccess(response.data.quiz);
		        	if (!quiz.public) {
						that.success = "Your Kwiz was saved successfully";
					}
		            resolve(response.data.quiz);
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
	
	@action delete = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.delete(API_ROOT + '/quizzes/' + id, {withCredentials: true})
	        .then(response => {
	        	if (response.data.status === 'deleted') {
		        	that.handleSuccess(null);
		            resolve(response.data.status);
	        	} else {
	        		that.handleErrors(errors)
	        		that.errors = ["Something went wrong with deleting your kwiz."]
	        		reject(errors)
	        	}
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	handleSuccess(quiz) {
		if (quiz) this.quiz = quiz;
		if (quiz) this.id = quiz.id;
		this.busy = false; 
		this.errors = null;
		this.success = null;
	}
	
	handleErrors(errors) {
		this.quiz = null;
		this.id = null;
		this.busy = false; 
		this.errors = errors
		this.success = null;
	}
}

const quizzes = new Quizzes();
export default quizzes;