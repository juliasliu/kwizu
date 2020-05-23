import React, { PropTypes } from 'react'
import {
	ScrollView,
	TextInput,
	Button,
	Text,
	View,
	Image,
	ActivityIndicator,
	StyleSheet,
	Link,
	TouchableOpacity,
} from 'react-native';

import { StackActions } from '@react-navigation/native';
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from 'react-native-check-box'

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

import TabBarIcon from '../components/TabBarIcon';

import NewResultForm from '../components/NewResultForm'
import NewQuestionForm from '../components/NewQuestionForm'

@inject('users') @inject('quizzes') @observer
class New extends React.Component {
	state = {
			title: '',
			image: '',
			questions: [ 
				{
					index: 0,
					question: { title: '' },
					choices: [ 
						{
							index: 0,
							content: '',
							weight: 1
						},
						],
				},
				],
				results: [ 
					{
						index: 0,
						title: '' ,
						description: '',
						weight: 1,
						image: '',
					},
					],
	}
	
	/* destructive method for reassigning indices for an array
	 * input: array: [0, 1, 3, 4], indexDeleted: 2
	 * output: newArray: [0, 1, 2, 3]
	 */
	indexHelper(array, indexDeleted) {
		var i = 0;
		while (i < array.length) {
			if (array[i].index >= indexDeleted) {
				array[i].index--;
				if(array[i].weight) {
					array[i].weight--;
				}
			}
			i++;
		}
	}
	
	onPressCreate = (isPublic) => {
		// check to see if kwiz already exists: if so, then only save/update; do this later
		this.props.quizzes.create(this.state.title, isPublic)
		.then((res) => {
			console.log("created!")
			if (isPublic) {
				this.props.navigation.dispatch(StackActions.pop(1));
				this.props.navigation.navigate("Publish and Share Kwiz");
			} else {
				this.props.quizzes.savingSuccess = "Your Kwiz was saved successfully"; // hard-coding the success message
			}
		})
		.catch((error) => {
			console.log(error);
			this.props.quizzes.creatingError = error // hard-coding the error
		})
	}

	onPressAddResult() {
		const newResult = { 
				index: this.state.results.length, 
				title: '' ,
				description: '',
				weight: this.state.results.length+1,
				image: '', };
		var results = [...this.state.results, newResult]
	    this.setState({results});
	}
	onPressDeleteResult(resultIndex) {
		if (this.state.results.length != 1) {
			var newResultsArray = [...this.state.results]
			newResultsArray.splice(newResultsArray.findIndex(elem => elem.index === resultIndex), 1);
			this.indexHelper(newResultsArray, resultIndex)
			
			this.setState({results : newResultsArray});
		}
	}
	
	setResultTitleValue(resultIndex, value) {
		var results = [...this.state.results]
		results[results.findIndex(elem => elem.index === resultIndex)].title = value;
		this.setState({results})
	}
	setResultDescriptionValue(resultIndex,value) {
		var results = [...this.state.results]
		results[results.findIndex(elem => elem.index === resultIndex)].description = value;
		this.setState({results})
	}
	
	onPressAddQuestion() {
		const newQuestion = {
				index: this.state.questions.length,
				question: { title: '' },
				choices: [ 
					{
						index: 0,
						content: '',
						weight: 1
					},
					], 
				};
		var questions = [...this.state.questions, newQuestion]
	    this.setState({questions});
	}
	onPressDeleteQuestion(questionIndex) {
		if (this.state.questions.length != 1) {
			var newQuestionsArray = [...this.state.questions]
			newQuestionsArray.splice(newQuestionsArray.findIndex(elem => elem.index === questionIndex), 1);
			this.indexHelper(newQuestionsArray, questionIndex)
			
			this.setState({questions : newQuestionsArray});
		}
	}

	onPressAddChoice(questionIndex) {
		var questions = [...this.state.questions]
		var question = questions[questions.findIndex(elem => elem.index === questionIndex)];
		
		const newChoice = { 
				index: question.choices.length, 
				content: '', 
				weight: 1, };
		question.choices = [...question.choices, newChoice]
		
	    this.setState({questions});
	}
	onPressDeleteChoice(questionIndex, choiceIndex) {
		var questions = [...this.state.questions]
		var question = questions[questions.findIndex(elem => elem.index === questionIndex)];
		
		if (question.choices.length != 1) {
			var newChoicesArray = [...question.choices]
			newChoicesArray.splice(newChoicesArray.findIndex(elem => elem.index === choiceIndex), 1);
			this.indexHelper(newChoicesArray, choiceIndex)
			question.choices = [...newChoicesArray]
			
			this.setState({questions});
		}
	}
	
	setQuestionValue(questionIndex, value) {
		var questions = [...this.state.questions]
		questions[questions.findIndex(elem => elem.index === questionIndex)].title = value;
		this.setState({questions})
	}
	setSelectedResultValue(questionIndex, choiceIndex, value) {
		var questions = [...this.state.questions]
		var question = questions[questions.findIndex(elem => elem.index === questionIndex)];
		
		var choices = [...question.choices]
		choices[choices.findIndex(elem => elem.index === choiceIndex)].weight = value;
		question.choices = [...choices]
		
		this.setState({questions})
	}
	setChoiceValue(questionIndex, choiceIndex, value) {
		var questions = [...this.state.questions]
		var question = questions[questions.findIndex(elem => elem.index === questionIndex)];
		
		var choices = [...question.choices]
		choices[choices.findIndex(elem => elem.index === choiceIndex)].content = value;
		question.choices = [...choices]
		
		this.setState({questions})
	}
	
	render() {
		console.log("--------------------")
		console.log("Results: ")
		console.log(this.state.results)
		console.log("Questions: ")
		console.log(this.state.questions)
		
		let resultsArray = this.state.results.map(( item, key ) =>
		{
			return item != undefined ? (
					<NewResultForm 
					result={item}
					onPressAdd={this.onPressAddResult.bind(this)}
					onPressDelete={this.onPressDeleteResult.bind(this)}
					setTitleValue={this.setResultTitleValue.bind(this)}
					setDescriptionValue={this.setResultDescriptionValue.bind(this)}></NewResultForm>
					) : null
		});
		
		let questionsArray = this.state.questions.map(( item, key ) =>
		{
			return item != undefined ? (
					<NewQuestionForm 
					results={this.state.results}
					question={item}
					onPressAdd={this.onPressAddQuestion.bind(this)}
					onPressDelete={this.onPressDeleteQuestion.bind(this)}
					onPressAddChoice={this.onPressAddChoice.bind(this)}
					onPressDeleteChoice={this.onPressDeleteChoice.bind(this)}
					setQuestionValue={this.setQuestionValue.bind(this)}
					setSelectedResultValue={this.setSelectedResultValue.bind(this)}
					setChoiceValue={this.setChoiceValue.bind(this)}></NewQuestionForm>
					) : null
		});
		
		let resultSection = () => {
			const {type} = this.props.route.params;
			return type == 'Personality' 
					? (
							<View style={[ allStyles.section, allStyles.sectionClear ]}>
								<Text style={allStyles.sectionTitle}>Kwiz Results</Text>
								<Text style={allStyles.sectionSubtitle}>Each result corresponds to one type of response. The result will appear at the end of the kwiz.</Text>
								{
									resultsArray
								}
								
								<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.greenButton ]}
					                onPress={this.onPressAddResult.bind(this)}>
									<TabBarIcon name="md-add" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
									<Text style={ allStyles.whiteText }>New result</Text>
								</TouchableOpacity>
							</View>
							)
					: null
		}
		
		return (
				<KeyboardAwareScrollView style={[allStyles.container, styles.quizFormContainer ]}
				innerRef={ref => {
				    this.scrollview_ref = ref;
				  }}>
					
					<View style={[ allStyles.section, allStyles.sectionClear ]}>
						<Text style={allStyles.sectionTitle}>Kwiz Description</Text>
					
						{
							this.props.quizzes.creatingError &&
							<View style={ allStyles.error }
							onLayout={event => {
						        const layout = event.nativeEvent.layout;
						        this.scrollview_ref.scrollTo({
						            x: 0,
						            y: layout.y,
						            animated: true,
						        });
						      	}}>
								<Text>{this.props.quizzes.creatingError}</Text> 
							</View>
						} 
						{
							this.props.quizzes.savingSuccess &&
							<View style={ allStyles.success }
							onLayout={event => {
						        const layout = event.nativeEvent.layout;
						        this.scrollview_ref.scrollTo({
						            x: 0,
						            y: layout.y,
						            animated: true,
						        });
						      	}}>
								<Text>{this.props.quizzes.savingSuccess}</Text> 
							</View>
						} 
						
						<TextInput
							returnKeyType='next' 
							style={ allStyles.input } 
							onChangeText={(title) => this.setState({title})} 
							value={this.state.title} 
							placeholder='Title (150 chars max)'
						/>
					
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton ]}
			                onPress={() => alert("")}>
							<TabBarIcon name="md-image" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Add Thumbnail</Text>
						</TouchableOpacity>
						
					</View>

					{
						resultSection()
					}
					
					<View style={[ allStyles.section ]}>
						<Text style={allStyles.sectionTitle}>Kwiz Questions</Text>
						<Text style={allStyles.sectionSubtitle}>Make sure the number of choices for each question match the total number of results above.</Text>
						
						{
							questionsArray
						}
						
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.greenButton ]}
			                onPress={this.onPressAddQuestion.bind(this)}>
							<TabBarIcon name="md-add" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={ allStyles.whiteText }>New question</Text>
						</TouchableOpacity>
					</View>
						
					<View style={[ allStyles.section, allStyles.sectionClear ]}>
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.whiteButton ]}
			                onPress={() => this.onPressCreate(false)}>
							<TabBarIcon name="md-eye" style={[ allStyles.buttonIcon ]}/>
							<Text style={[ allStyles.fullWidthButtonText ]}>Save and preview</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blueButton ]}
			                onPress={() => this.onPressCreate(true)}>
							<TabBarIcon name="md-checkmark" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Publish and share</Text>
						</TouchableOpacity>
						<Text style={[ allStyles.sectionSubtitle, styles.quizSaveText ]}>You can save a draft if you are not finished editing your kwiz. You can publish later when you're ready.</Text>
					</View>
				</KeyboardAwareScrollView>
		) 
	}
}

export default New;