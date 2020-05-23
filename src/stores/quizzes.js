import {observable, computed, map, toJS, action} from 'mobx'; 
import axios from 'axios'

class Quizzes {
	@observable quiz = null;
	@observable id = null;
	@observable isCreated = false;
	@observable creating = false; 
	@observable creatingError = null;
	@observable savingSuccess = null;
	
	@action create = function(quiz) {
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			/*
			 * things to check for:
			 * every field exists and is less than assigned chars long
			 * every choice in each question is assigned to a different result weight
			 */
//			if(!title || title == '' || title.length > 150) {
//				this.creating = false; 
//				this.creatingError = 'The Kwiz title was entered incorrectly (≤150 chars)'; 
//				this.savingSuccess = null;
//				reject(creatingError);
//			}
			
			this.isCreated = false;
			this.creating = true;
			
			axios.post('http://localhost:3001/quizzes', {quiz: quiz, questions: quiz.questions, results: quiz.results}, {withCredentials: true})
			.then(response => {
				if (response.data.status === 'created') {
					that.handleSuccess(response.data.quiz)
					if (!quiz.public) {
						that.savingSuccess = "Your Kwiz was saved successfully";
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
		return new Promise(function(resolve, reject) {
			axios.get('http://localhost:3001/quizzes', {withCredentials: true})
	        .then(response => {
	            resolve(response.data.quizzes);
	        })
	        .catch(error => reject(error))
		})
	}
	
	@action show = function(id) {
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get('http://localhost:3001/quizzes/' + id, {withCredentials: true})
	        .then(response => {
				that.handleSuccess(response.data.quiz)
	            resolve(response.data.quiz);
	        })
	        .catch(error => reject(error))
		})
	}
	
	handleSuccess(quiz) {
		this.quiz = quiz;
		this.id = quiz.id;
		this.isCreated = true;
		this.creating = false; 
		this.creatingError = null;
		this.savingSuccess = null;
	}
	
	handleErrors(errors) {
		this.quiz = null; 
		this.id = null;
		this.isCreated = false;
		this.creating = false; 
		this.creatingError = errors
		this.savingSuccess = null;
	}
}

const quizzes = new Quizzes();
export default quizzes;