import {observable, computed, map, toJS, action} from 'mobx'; 
import axios from 'axios'
import { API_ROOT } from '../constants';

class Quizzes {
	@observable quiz = null;
	@observable id = null;
	@observable busy = false; 
	@observable error = null;
	@observable success = null;
	
	@action create = function(quiz) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			/*
			 * things to check for:
			 * every field exists and is less than assigned chars long
			 * every choice in each question is assigned to a different result weight
			 */
//			if(!title || title == '' || title.length > 150) {
//				this.busy = false; 
//				this.error = 'The Kwiz title was entered incorrectly (≤150 chars)'; 
//				this.success = null;
//				reject(error);
//			}
			
			axios.post(API_ROOT + '/quizzes', {quiz: quiz, questions: quiz.questions, results: quiz.results}, {withCredentials: true})
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
			.catch(error => {
				that.handleErrors(error)
				console.log('api errors:', error)
				reject(error);
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
	        	resolve(response.data.quizzes);
	        })
	        .catch(error => reject(error))
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
	        .catch(error => reject(error))
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
	        .catch(error => reject(error))
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
	        .catch(error => reject(error))
		})
	}
	
	@action recommend = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/quizzes/' + id + '/recommend', {withCredentials: true})
	        .then(response => {
	            that.handleSuccess();
	            /* use this quiz and current user to find 5 total recommended quizzes
				 * 1. popularity (highest number of taken_users): pick 5
				 * 2. predictive (based on current quiz topic, TBD): pick 5
				 * 3. collaborative (quizzes taken by friends): pick 5
				 * merge by deleting overlaps among the 3 categories
				 */
	            let quizzes = [];
	            quizzes = quizzes.concat(response.data.popularity);
	            quizzes = quizzes.concat(response.data.predictive);
	            quizzes = quizzes.concat(response.data.collaborative);
	            
	            // delete duplicates
	            quizzes = quizzes.filter(function(item, pos) {
	                return quizzes.findIndex(elem => elem.id === item.id) == pos;
	            })
	            
	            quizzes = quizzes.slice(0, 5);

				resolve(quizzes);
	        })
	        .catch(error => reject(error))
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
	        .catch(error => reject(error))
		})
	}
	
	@action update = function(quiz) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.put(API_ROOT + '/quizzes/' + quiz.id, {quiz: quiz, questions: quiz.questions, results: quiz.results}, {withCredentials: true})
	        .then(response => {
	        	that.handleSuccess(response.data.quiz);
	        	that.success = "Your kwiz was saved successfully";
	            resolve(response.data.quiz);
	        })
	        .catch(error => {
	        	that.handleErrors(error)
				console.log('api errors:', error)
	        	reject(error)
	        })
		})
	}
	
	@action delete = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.delete(API_ROOT + '/quizzes/' + id, {withCredentials: true})
	        .then(response => {
	        	that.handleSuccess(null);
	            resolve(response.data.status);
	        })
	        .catch(error => reject(error))
		})
	}
	
	handleSuccess(quiz) {
		this.quiz = quiz;
		if (quiz) this.id = quiz.id;
		this.busy = false; 
		this.error = null;
		this.success = null;
	}
	
	handleErrors(errors) {
		this.quiz = null;
		this.id = null;
		this.busy = false; 
		this.error = errors
		this.success = null;
	}
}

const quizzes = new Quizzes();
export default quizzes;