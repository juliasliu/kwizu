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

import TakeQuestion from '../components/TakeQuestion'
import TakeResult from '../components/TakeResult'
import ShareForm from '../components/ShareForm'
import QuizThumbnail from '../components/QuizThumbnail'

@inject('users') @observer
class Take extends React.Component {
	state = {
		quiz: {
			title: 'Kwiz Title here',
			image: '',
			user: this.props.user,
			questions: [ 
				{
					index: 0,
					question: { title: 'How much wood could a wood chuck chuck if a wood chuck could chuck wood?' },
					choices: [ 
						{
							index: 0,
							content: 'Choice #1 whttevr asfkjas ies her',
							weight: 1
						},
						{
							index: 1,
							content: 'Choice #2 whttevr asfkjas ies her',
							weight: 2
						},
						{
							index: 2,
							content: 'Choice #3 whttevr asfkjas ies her',
							weight: 3
						},
						],
				},
				],
				results: [ 
					{
						index: 0,
						title: 'First result! nice' ,
						description: 'More description about how swagidilocious you are weeee alsdfjha aiik l :))) lorem ipsum goodeness we love latin amirite',
						weight: 1,
						image: '',
					}, 
					{
						index: 1,
						title: 'Youo are swagidilocious beep beep boop harry pot.' ,
						description: 'good job u r a hooman but maybe not ???',
						weight: 2,
						image: '',
					}, 
					{
						index: 2,
						title: 'Last result! nice' ,
						description: 'good job u r a hooman but actually just a doggo',
						weight: 3,
						image: '',
					},
					],
		},
		answers: [
			/*{
				questionIndex: 0,
				choiceWeight: 0,
			}*/
		],
		isDone: false,
	}
	
	setSelectedChoiceValue(questionIndex, choiceWeight) {
		if (!this.state.isDone) {
			// remove the choice that is currently selected for this question
			var answers = [...this.state.answers]
			answers.splice(answers.findIndex(elem => elem.questionIndex === questionIndex && elem.choiceWeight === choiceWeight), 1);
			
			// select this choice by adding a new answer to answers
			const newAnswer = { 
					questionIndex: questionIndex,
					choiceWeight: choiceWeight, };
			answers = [...answers, newAnswer]
			
			this.setState({answers})
		}
	}
	
	render() {

		console.log(this.state.answers)
		let questionsArray = this.state.quiz.questions.map(( item, key ) =>
		{
			return item != undefined ? (
					<TakeQuestion
					question={item}
					answers={this.state.answers}
					setSelectedChoiceValue={this.setSelectedChoiceValue.bind(this)}/>
					) : null
		});
		
		let resultSection = () => {
			this.state.isDone = this.state.answers.length == this.state.quiz.questions.length;
			/* calculate the result of the quiz
			 * sum all the weights from each of the answer choices selected
			 * average across total number of questions
			 * round the average to the nearest integer weight
			 * that weight is the weight of the corresponding result
			 */
			if (this.state.isDone) {
				var sum = this.state.answers.reduce(function(previousValue, currentValue) {
							return previousValue.choiceWeight + currentValue.choiceWeight
						}).choiceWeight;
				var roundedWeight = Math.round(sum / this.state.quiz.questions.length);
				var resultOfQuiz = this.state.quiz.results[this.state.quiz.results.findIndex(elem => elem.weight === roundedWeight)];

				// initate new quizzing: todo later
			}
				
			return this.state.isDone 
					? (
							<View>
								<TakeResult 
								result={resultOfQuiz} />
								
								<View style={[allStyles.section]}
							      onLayout={event => {
							        const layout = event.nativeEvent.layout;
									this.scroll.props.scrollToPosition(
										    0,
										    layout.y + layout.height,
										    true,
										);
							        console.log('height:', layout.height);
							        console.log('width:', layout.width);
							        console.log('x:', layout.x);
							        console.log('y:', layout.y);
								    console.log('scroll to:', layout.y + layout.height);
							      }}>
									<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blackButton, { height: 60, } ]}
								        onPress={() => this.props.navigation.navigate("Kwiz Results")}>
										<TabBarIcon name="md-trophy" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
										<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>See how your friends did!</Text>
									</TouchableOpacity>
								</View>
		
							      <View style={allStyles.section}>
							    	<Text style={allStyles.sectionTitle}>Recommended</Text>
							      	<Text style={allStyles.sectionSubtitle}>Take another one! We promise it's not an addiction. ;)</Text>
							    	<ScrollView contentContainerStyle={styles.quizThumbnailContainer} horizontal= {true} decelerationRate={0} snapToInterval={150} snapToAlignment={"center"}>
							  			<QuizThumbnail navigation={this.props.navigation} />
							  			<QuizThumbnail navigation={this.props.navigation} />
							  			<QuizThumbnail navigation={this.props.navigation} />
							  		</ScrollView>
							      </View>
								
								<View style={[allStyles.section]}>
									<Text style={allStyles.sectionTitle}>Share your results!</Text>
									<Text style={allStyles.sectionSubtitle}>Share the fun by sending your results to your friends or posting on social media.</Text>
									<ShareForm />
								</View>
							</View>
							)
					: null
		}
		
		return (
				<KeyboardAwareScrollView style={[allStyles.container, styles.quizFormContainer ]}
					innerRef={ref => {
					    this.scroll = ref
					  }}>
					
					<Text style={ allStyles.heading }>{ this.state.quiz.title }</Text>
					
					{
						questionsArray
					}
					
					{
						resultSection()
					}

				</KeyboardAwareScrollView>
		) 
	}
}

export default Take;