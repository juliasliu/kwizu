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
	RefreshControl,
} from 'react-native';

import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from 'react-native-check-box'
import { StackActions } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { InterstitialAd, TestIds, AdEventType} from '@react-native-firebase/admob';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

import Thumbnails from '../constants/Thumbnails';

import TabBarIcon from '../components/TabBarIcon';
import Loading from '../components/Loading';

import TakeQuiz from '../components/TakeQuiz'
import TakeQuestion from '../components/TakeQuestion'
import TakeResult from '../components/TakeResult'

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
				questionId: 0,
				choiceWeight: 0,
				choiceId: 0,
			}*/
		],
		quizzing: null,
		resultOfQuiz : null,	// stores the result object
		isDone: false,			// if quizzing exists or done taking the quiz, isDone = true
		hasTaken: false,		// if quizzing exists, hasTaken = true; if retake the quiz or quiz has been changed, hasTaken = false
		scrollIndices: [100,],	// starting scroll position is 70 given the title heading of the kwiz
		scrollHeights: [],
	    refreshing: true,
	    recommended: [],		// list of recommended quizzes based on this quiz
	    isModalVisible: false,
	}
	
	_onRefresh = () => {
	    this.setState({refreshing: true});
	    this.componentDidMount();
	}
	
	showInterstitialAd = () => {
		let id = "ca-app-pub-8298967838514788/3809240812";
	    // Create a new instance
	    const interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

	    // Add event handlers
	    interstitialAd.onAdEvent((type, error) => {
	        if (type === AdEventType.LOADED) {
	            interstitialAd.show();
	        }
	    });

	    // Load a new advert
	    interstitialAd.load();
	}
	
	componentDidMount() {
		const {quiz_id} = this.props.route.params;
		const {fromPublish} = this.props.route.params;
		this.props.quizzes.show(quiz_id)
		.then((res) => {
			if (this.props.quizzes.quiz.user_id == this.props.users.id) {
				if (!this.props.quizzes.quiz.public) {
					console.log("swittcheroo edit mode")
					this.props.navigation.dispatch(StackActions.pop(1));
					this.props.navigation.push("New Kwiz", {type: "Personality", quiz_id: this.props.quizzes.quiz.id})
				      this.setState({refreshing: false});
				} else if (!fromPublish) {
					console.log("swittcheroo owner")
					this.props.navigation.dispatch(StackActions.pop(1));
					this.props.navigation.push("Publish and Share Kwiz");
				      this.setState({refreshing: false});
				} else {
					console.log("succeedded")
					this.setState({quiz: res.quiz, quizzing: res.quizzing, hasTaken: false}, this.loadQuizzing)
				}
			} else {
				console.log("succeedded")
				this.setState({quiz: res.quiz, quizzing: res.quizzing, hasTaken: false}, this.loadQuizzing)
			}
		})
		.catch((errors) => {
			console.log("o no quiz doesn't exist")
			console.log(errors);
			this.setState({isModalVisible: true});
		})
	}
	
	loadQuizzing() {
		// helper function for loading all the quizzing choice_ids into this.state.answers
		if (this.state.quizzing) {
			
			var answers = [...this.state.answers]
			for (var i = 0; i < this.state.quizzing.choices.length; i++) {
				var choice = this.state.quizzing.choices[i];
				
				// select this choice by adding a new answer to answers
				if (answers.findIndex(elem => elem.questionId === choice.question_id) >= 0)
					answers.splice(answers.findIndex(elem => elem.questionId === choice.question_id), 1);
				
				// select this choice by adding a new answer to answers
				const newAnswer = { 
						questionId: choice.question_id,
						choiceWeight: choice.weight,
						choiceId: choice.id, };
				answers = [...answers, newAnswer]
	
			}
			if (answers.length == this.state.quiz.questions.length) {
				this.setState({hasTaken: true, answers: answers, refreshing: false}, this.updateIsDone)
			} else {
				this.setState({hasTaken: false, answers: answers, refreshing: false}, this.updateIsDone)
			}
		} else {
		    this.setState({refreshing: false});
		}
		
		// load the recommended quizzes right now, but don't show them until results section is shown
		this.recommendQuiz();
	}
	
	scrollIndexHelper() {
		// helper function for setting the position of where to scroll to for each question
		var scrollIndices = [...this.state.scrollIndices]
		for (var i = 1; i < this.state.quiz.questions.length + 1; i++) {
			scrollIndices[i] = scrollIndices[i-1] + this.state.scrollHeights[i];
		}
		this.setState({scrollIndices}, () => { if (this.state.isDone) this.scrollIfDone() })
	}
	
	scrollIfDone() {
		var scrollIndex = this.state.scrollIndices[this.state.quiz.questions.length-1] + this.state.scrollHeights[this.state.quiz.questions.length-1]
		console.log("scroll to result " + scrollIndex)
        this.scrollview_ref.scrollTo({
            x: 0,
            y: scrollIndex,
            animated: true,
        });
		return scrollIndex;
	}
	
	scrollToNext() {
		if (this.state.isDone) {
			var scrollIndex = this.scrollIfDone();
	        if (Number.isNaN(scrollIndex)) {
	        	this.scrollIndexHelper();
				console.log("is it NAN?? " + scrollIndex)
	        }
		} else {
			// scroll to next incomplete question if not done
			var nextIndex = this.state.quiz.questions.findIndex(q => this.state.answers.findIndex(a => a.questionId == q.id) < 0)
			this.scrollview_ref.scrollTo({
				x: 0,
				y: this.state.scrollIndices[nextIndex],
				animated: true,
			});
			console.log("enxt questiono!! " + nextIndex + "scroll to " + this.state.scrollIndices[nextIndex])
		}
	}
	
	updateIsDone() {
		// helper function for checking if all answers are done
		this.setState({ isDone: this.state.answers.length == this.state.quiz.questions.length }, () => this.isDoneAndScroll())
	}
	
	isDoneAndScroll() {
		if (this.state.isDone) {
			this.scrollToNext();
			this.finishedQuiz();
		} else {
			this.scrollToNext()
		}
	}
	
	setSelectedChoiceValue(questionId, choiceWeight, choiceId) {
		if (!this.state.isDone) {
			// remove the choice that is currently selected for this question
			var answers = [...this.state.answers]
			if (answers.findIndex(elem => elem.questionId === questionId) >= 0)
				answers.splice(answers.findIndex(elem => elem.questionId === questionId), 1);
			
			// select this choice by adding a new answer to answers
			const newAnswer = { 
					questionId: questionId,
					choiceWeight: choiceWeight,
					choiceId: choiceId, };
			answers = [...answers, newAnswer]

			this.setState({answers}, () => {
				this.updateIsDone()
			})
		}
	}
	
	retakeQuiz() {
		this.scrollview_ref.scrollTo({
            x: 0,
            y: 0,
            animated: true,
        });
		this.setState({answers: [], hasTaken: false, isDone: false})
	}
	
	finishedQuiz() {
		/* calculate the result of the quiz
		 * collect the frequency of each choice weight picked
		 * pick the result corresponding to the most frequently picked weight
		 */

		// if quizzing exists, get the result id
		if (this.state.hasTaken) {
			console.log("already taken")
			var resultOfQuiz = this.state.quiz.results[this.state.quiz.results.findIndex(elem => elem.id === this.state.quizzing.result_id)];
			this.setState({resultOfQuiz: resultOfQuiz})
		}
		// if not taken, calculate the result
		else {
			let weightDict = new Map()
			for (var i = 0; i < this.state.answers.length; i++) {
				if (!weightDict.has(this.state.answers[i].choiceWeight)) {
					weightDict.set(this.state.answers[i].choiceWeight, 0)
				}
				let prevFreq = weightDict.get(this.state.answers[i].choiceWeight)
				weightDict.set(this.state.answers[i].choiceWeight, prevFreq + 1)
			}
			let weightDictEntries = [...weightDict.entries()]
			let mostFreqEntry = weightDictEntries.reduce((prev, curr) => curr[1] > prev[1] ? curr : prev)
			let mostFreqWeight = mostFreqEntry[0]
//			var sum = this.state.answers.reduce(function(a, b) {
//				return a + b.choiceWeight;
//			}, 0);
//			var roundedWeight = Math.round(sum / this.state.quiz.questions.length);
			var resultOfQuiz = this.state.quiz.results[this.state.quiz.results.findIndex(elem => elem.weight === mostFreqWeight)];
			this.setState({resultOfQuiz: resultOfQuiz})

			console.log("retake or save")
			// save the quiz results
			var quizzing = {
				user_id: this.props.users.user.id, 
				quiz_id: this.state.quiz.id, 
				result_id: resultOfQuiz.id, 
				choice_ids: this.state.answers.map(a => a.choiceId)}
			console.log(quizzing)
			this.props.quizzes.save(quizzing)
			.then((res) => {
				console.log("saved!!!")
				this.setState({quizzing: res.quizzing, hasTaken: true})
				if (res.newQuiz) {
					this.props.users.addPoints(1)
					.then(res => {
						console.log("yay points!" + res)
					})
					.catch(errors => {
						console.log("failed");
						console.log(errors);
					});
					this.props.users.show(this.props.users.id);
				}
				
				this.showInterstitialAd();
			})
			.catch((errors) => {
				console.log("o noes")
				console.log(errors);
			})
		}
	}
	
	recommendQuiz() {
		this.props.quizzes.recommend(this.state.quiz.id)
		.then((res) => {
			console.log("calculatek")
			this.setState({recommended: res})
		})
		.catch((errors) => {
			console.log("o noes")
			console.log(errors);
		})
	}
	
	showPickedImage = () => {
		const { image_url } = this.state.quiz;

		if (image_url != null && image_url != undefined) {
			return (
					<Image source={{ uri: image_url }} 
					style={[styles.quizImage]} />
			);
		} else {
			return (
					<Image source={Thumbnails.quiz} 
					style={[styles.quizImage]} />
			);
		}
	}
	
	render() {
		
		let questionsArray = this.state.quiz.questions.map(( item, key ) =>
		{
			return item != undefined && (
					<View 
					key={key}
					onLayout={event => {
				        const layout = event.nativeEvent.layout;
						var scrollHeights = [...this.state.scrollHeights]
						scrollHeights[key] = layout.height;
				        this.setState({scrollHeights}, this.scrollIndexHelper)
				      }}>
						<TakeQuestion
						question={item}
						key={key}
						index={key}
						answers={this.state.answers}
						setSelectedChoiceValue={this.setSelectedChoiceValue.bind(this)}
						/>	
					</View>
			)
		});
		
		return <View style={allStyles.containerNoPadding}>
				{
					this.state.refreshing ? <Loading /> : (
						<ScrollView
						showsVerticalScrollIndicator={false} 
						ref={ref => {
						    this.scrollview_ref = ref;
						  }}
			      		refreshControl={
					              <RefreshControl
					              refreshing={this.state.refreshing}
					              onRefresh={this._onRefresh}
					            />
					          }>
						<View style={allStyles.container}>
							<View style={[ allStyles.card, styles.quizCard ]}>
								<View style={[styles.quizImageContainer]}
								onLayout={event => {
							        const layout = event.nativeEvent.layout;
							        var scrollIndices = [...this.state.scrollIndices]
							        scrollIndices[0] = layout.height + 25;
							        this.setState({scrollIndices}, this.scrollIndexHelper)
							      }}>
									{
										this.showPickedImage()
									}
									<View style={[styles.quizImageOverlay]} />
								</View>
								<Text style={[ allStyles.title, styles.quizTitle ]}>{ this.state.quiz.title }</Text>
							</View>
							
							{
								questionsArray
							}
							
							{
								this.state.isDone && 
								<TakeQuiz 
								navigation={this.props.navigation}
								resultOfQuiz={this.state.resultOfQuiz}
								quiz={this.state.quiz}
								user={this.props.users.user}
								recommended={this.state.recommended}
								viewMyResult={true}
								scrollIndexHelper={this.scrollIndexHelper.bind(this)}
								scrollToNext={this.scrollToNext.bind(this)}
								retakeQuiz={this.retakeQuiz.bind(this)} />
							}
						</View>
						</ScrollView>
					)
				}
				<Modal isVisible={this.state.isModalVisible} 
			      coverScreen={false} 
			      backdropOpacity={0} 
			      onBackdropPress={() => this.props.navigation.navigate("Home")} 
			      animationIn="slideInDown"
			      animationOut="slideOutUp"
			      style={[ allStyles.modal ]}>
			      <View style={[ allStyles.card, allStyles.modalView, allStyles.modalViewDanger ]}>
			        <Text style={ allStyles.modalTitle }>Oh no, something went wrong.</Text>
			        <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.whiteButton ]}>
			        	<Text>Go to Home</Text>
			        </TouchableOpacity>
			        <TouchableOpacity onPress={() => this.props.navigation.dispatch(StackActions.pop(1))} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.clearButton ]}>
			        	<Text style={ allStyles.whiteText }>Go Back</Text>
			        </TouchableOpacity>
			      </View>
			    </Modal>
			</View>
	}
}

export default Take;