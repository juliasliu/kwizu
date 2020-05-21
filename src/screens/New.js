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

import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from 'react-native-check-box'

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

import TabBarIcon from '../components/TabBarIcon';

import NewResultForm from '../components/NewResultForm'
import NewQuestionForm from '../components/NewQuestionForm'

@inject('users') @observer
class New extends React.Component {
	state = {
			title: '',
			image: '',
			user: this.props.user,
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
	
	onPressCreate(email, password, name) { 
		this.props.users.register(email, password, name);
	}

	onPressAddResult() {
		
	}
	onPressDeleteResult() {
		
	}
	onPressAddQuestion() {
		
	}
	onPressDeleteQuestion() {
		
	}

	onPressAddChoice() {
		const newChoice = { index: this.state.choiceIndex+1, content: '', weight: 1, };
		 
	    this.setState({
	      choices: [...this.state.choices, newChoice],
	      choiceIndex: this.state.choiceIndex+1
	    });
	}
	onPressDeleteChoice = (index) => {
		if (this.state.choices.length != 1) {
			const newChoicesArray = [...this.state.choices]
			newChoicesArray.splice(newChoicesArray.findIndex(elem => elem.index === index), 1);
			
			this.setState({
				choices: newChoicesArray
			});
		}
	}
	
	setQuestionValue = (value) => {
		var question = this.state.question
		question.title = value;
		this.setState({question})
	}
	setSelectedResultValue = (index, value) => {
		var choices = [...this.state.choices]
		choices[choices.findIndex(elem => elem.index === index)].weight = value;
		this.setState({choices})
	}
	setChoiceValue = (index, value) => {
		var choices = [...this.state.choices]
		choices[choices.findIndex(elem => elem.index === index)].content = value;
		this.setState({choices})
	}
	
	render() {
		
		let resultsArray = this.state.results.map(( item, key ) =>
		{
			let actualArrayIndex = item != undefined ? this.state.results.findIndex(elem => elem.index === item.index) : null;
			return item != undefined ? (
					<NewResultForm 
					onPressDelete={this.onPressDeleteResult.bind(this)}
					registeringError={this.props.users.registeringError}></NewResultForm>
					) : null
		});
		
		let questionsArray = this.state.questions.map(( item, key ) =>
		{
			let actualArrayIndex = item != undefined ? this.state.questions.findIndex(elem => elem.index === item.index) : null;
			return item != undefined ? (
					<NewQuestionForm 
					results={this.state.results}
					onPressDelete={this.onPressDeleteQuestion.bind(this)}
					registeringError={this.props.users.registeringError}></NewQuestionForm>
					) : null
		});
		
		let resultSection = () => {
			const {type} = this.props.route.params;
			return JSON.stringify(type) == 'Personality' 
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
				<KeyboardAwareScrollView style={[allStyles.container, styles.quizFormContainer ]}>
					
					<View style={[ allStyles.section, allStyles.sectionClear ]}>
						<Text style={allStyles.sectionTitle}>Kwiz Description</Text>
					
						<TextInput
							returnKeyType='next' 
							style={ allStyles.input } 
							onChangeText={(title) => this.setState({title})} 
							value={this.state.title} 
							placeholder='Title (25 words max)'
						/>
					
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton ]}
			                onPress={() => alert("")}>
							<TabBarIcon name="md-image" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Add Thumbnail</Text>
						</TouchableOpacity>
						
					</View>

					{
						resultSection
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
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blueButton ]}
			                onPress={() => this.props.navigation.navigate("Save and Share Kwiz")}>
							<TabBarIcon name="md-checkmark" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Save and share</Text>
						</TouchableOpacity>
						<Text style={[ allStyles.sectionSubtitle, styles.quizSaveText ]}>You can save a draft if you are not finished editing your kwiz. You can publish later when you're ready.</Text>
					</View>
				</KeyboardAwareScrollView>
		) 
	}
}

export default New;