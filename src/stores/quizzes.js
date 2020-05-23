import {observable, computed, map, toJS, action} from 'mobx'; 
import axios from 'axios'

class Quizzes {
	@observable quiz = null;
	@observable id = null;
	@observable isCreated = false;
	@observable creating = false; 
	@observable creatingError = null;
	
	@action create = function(title, isPublic) {
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			if(!title || title == '' || title.length > 15) {
				this.creating = false; 
				this.creatingError = 'The Kwiz title was not entered or entered incorrectly (≤150 chars)'; 
				reject(creatingError);
			}
			if(isPublic == undefined) {
				this.creating = false; 
				this.creatingError = 'Something went wrong with saving or publishing your Kwiz'; 
				reject(creatingError);
			}
			let quiz = {
					title: title,
					public: isPublic,
			}
			this.creating = true;
			this.creatingError = null;
		
			axios.post('http://localhost:3001/quizzes', {quiz}, {withCredentials: true})
			.then((response) => {
				if (response.data.status === 'created') {
					that.handleSuccess(response.data.quiz)
					resolve(response.data.quiz);
				} else {
					that.handleErrors(response.data.errors)
					console.log('creating errors:', response.data.errors)
					reject(response.data.errors);
				}
			})
			.catch((error) => {
				console.log('api errors:', error)
				reject(error);
			})
		})
	}
	
	handleSuccess(quiz) {
		this.quiz = quiz;
		this.id = quiz.id;
		this.isCreated = true;
		this.creating = false; 
	}
	
	handleErrors(errors) {
		this.creatingError = errors
		this.quiz = null; 
		this.id = null;
		this.isCreated = false;
		this.creating = false; 
	}
}

const quizzes = new Quizzes();
export default quizzes;