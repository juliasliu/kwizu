import {observable, computed, map, toJS, action} from 'mobx'; 
import axios from 'axios'

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
			
			axios.post('http://localhost:3001/quizzes', {quiz: quiz, questions: quiz.questions, results: quiz.results}, {withCredentials: true})
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
		return new Promise(function(resolve, reject) {
			axios.get('http://localhost:3001/quizzes', {withCredentials: true})
	        .then(response => {
	            resolve(response.data.quizzes);
	        })
	        .catch(error => reject(error))
		})
	}
	
	@action show = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get('http://localhost:3001/quizzes/' + id, {withCredentials: true})
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
			axios.get('http://localhost:3001/quizzes/' + id + '/leader', {withCredentials: true})
	        .then(response => {
				resolve({results: response.data.quiz.results, users: response.data.users, quizzings: response.data.quizzings });
	        })
	        .catch(error => reject(error))
		})
	}
	
	@action save = function(quizzing) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.post('http://localhost:3001/quizzes/save', {quizzing: quizzing, result_id: quizzing.result_id, choice_ids: quizzing.choice_ids}, {withCredentials: true})
	        .then(response => {
	            resolve(response.data.quizzing);
	        })
	        .catch(error => reject(error))
		})
	}
	
	@action update = function(quiz) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.put('http://localhost:3001/quizzes/' + quiz.id, {quiz: quiz, questions: quiz.questions, results: quiz.results}, {withCredentials: true})
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
			axios.delete('http://localhost:3001/quizzes/' + id, {withCredentials: true})
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