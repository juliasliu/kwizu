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
	Dimensions,
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

@inject('users') @inject('quizzes') @observer
class Take extends React.Component {
	state = {
		quiz: {
			title: '',
			questions: [
				{
					title: '',
					choices: [],
				},
			],
			results: [],
		},
		answers: [
			/*{
				questionIndex: 0,
				choiceWeight: 0,
			}*/
		],
		isDone: false,
		scrollIndices: [70,],	// starting scroll position is 50 given the title heading of the kwiz
		scrollHeights: [],
	}
	
	componentDidMount() {
		const {quiz_id} = this.props.route.params;
		console.log(quiz_id)
		this.props.quizzes.show(quiz_id)
		.then((res) => {
			console.log("succeedded")
			this.setState({quiz: res})
		})
		.catch((error) => {
			console.log("o no")
			console.log(error);
		})
	}
	
	scrollIndexHelper() {
		for (var i = 1; i < this.state.quiz.questions.length + 1; i++) {
			this.state.scrollIndices[i] = this.state.scrollIndices[i-1] + this.state.scrollHeights[i];
		}
	}
	
	setSelectedChoiceValue(questionIndex, choiceWeight) {
		if (!this.state.isDone) {
			// remove the choice that is currently selected for this question
			var answers = [...this.state.answers]
			answers.splice(answers.findIndex(elem => elem.questionIndex === questionIndex), 1);
			
			// select this choice by adding a new answer to answers
			const newAnswer = { 
					questionIndex: questionIndex,
					choiceWeight: choiceWeight, };
			answers = [...this.state.answers, newAnswer]
			
			this.setState({answers})
			
			// scroll to next incomplete question if not done
			var nextIndex = this.state.quiz.questions.length;
			for (var i = questionIndex; i < this.state.quiz.questions.length; i++) {
				if (answers.findIndex(elem => elem.questionIndex === i) < 0) {
					nextIndex = i;
					break;
				}
			}
			if (nextIndex < this.state.quiz.questions.length) {
				this.scrollIndexHelper();

				console.log("nextIndex: " + nextIndex + ", scroll to: " + this.state.scrollIndices[nextIndex])
				
		        this.scrollview_ref.scrollTo({
		            x: 0,
		            y: this.state.scrollIndices[nextIndex],
		            animated: true,
		        });
			}
		}
	}
	
	render() {

		let questionsArray = this.state.quiz.questions.map(( item, key ) =>
		{
			item.index = key;
			return item != undefined ? (
					<View 
					onLayout={event => {
				        const layout = event.nativeEvent.layout;
				        this.state.scrollHeights[item.index] = layout.height;
						console.log("question " + item.index + ": " + this.state.scrollHeights[item.index])
				      }}>
						<TakeQuestion
						question={item}
						key={item.index}
						answers={this.state.answers}
						setSelectedChoiceValue={this.setSelectedChoiceValue.bind(this)}
						/>	
					</View>
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
				var sum = this.state.answers.reduce(function(a, b) {
					return a + b.choiceWeight;
				}, 0);
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
							        var scrollIndex = this.state.scrollIndices[this.state.quiz.questions.length-1] + this.state.scrollHeights[this.state.quiz.questions.length-1]
							        this.scrollview_ref.scrollTo({
							            x: 0,
							            y: scrollIndex,
							            animated: true,
							        });
								    console.log('scroll to result:', scrollIndex);
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
							    	<ScrollView contentContainerStyle={allStyles.quizThumbnailContainer} horizontal= {true} decelerationRate={0} snapToInterval={150} snapToAlignment={"center"}>
							  			
							  		</ScrollView>
							      </View>
								
								<View style={[allStyles.section]}>
									<Text style={allStyles.sectionTitle}>Share your results!</Text>
									<Text style={allStyles.sectionSubtitle}>Share the fun by sending your results to your friends or posting on social media.</Text>
									<ShareForm quiz={ this.props.quizzes.quiz } />
								</View>
							</View>
							)
					: null
		}
		
		return (
				<ScrollView style={[allStyles.container, styles.quizFormContainer ]}
				ref={ref => {
				    this.scrollview_ref = ref;
				  }}>
					
					<Text style={ allStyles.heading }>{ this.state.quiz.title }</Text>
					
					{
						questionsArray
					}
					
					{
						resultSection()
					}

				</ScrollView>
		) 
	}
}

export default Take;