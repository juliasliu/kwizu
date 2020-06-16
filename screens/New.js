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
	RefreshControl,
} from 'react-native';

import { StackActions } from '@react-navigation/native';
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from 'react-native-check-box'
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

import TabBarIcon from '../components/TabBarIcon';

import NewResultForm from '../components/NewResultForm'
import NewQuestionForm from '../components/NewQuestionForm'
import Loading from '../components/Loading'

@inject('users') @inject('quizzes') @observer
class New extends React.Component {
	state = {
			title: '',
			public: false,
			image: null,
			image_url: null,
			questions: [ 
				{
					index: 0,
					title: '',
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
						image: null,
						image_url: null,
					},
					],
			isEditing: false,
			type: '',					// Personality, Trivia
		    refreshing: true,
			busy: false,
			errors: null,
			success: null,
			isModalVisible: false,
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
				if(array[i].title && array[i].weight) {
					array[i].weight--;
				}
			}
			i++;
		}
	}
	
	_onRefresh = () => {
	    this.setState({refreshing: true});
	    this.componentDidMount();
	  }
	
	componentDidMount() {
		const {type} = this.props.route.params;
		this.setState({type})
		// check if quiz already exists and is being edited, if so then update state, otherwise do nothing
		const {quiz_id} = this.props.route.params;
		if (quiz_id) {
			this.getQuiz(quiz_id)
		} else {
			this.setState({refreshing: false});
		}
	}
	
	getQuiz(quiz_id) {
		this.props.quizzes.show(quiz_id)
		.then((res) => {
			console.log("got the quiz")
			this.setState({id: res.quiz.id, title: res.quiz.title, public: res.quiz.public, image_url: res.quiz.image_url, isEditing: true}, this.loadQuiz)
		})
		.catch((errors) => {
			this.setState({errors: this.props.quizzes.errors})
			this.setState({isModalVisible: true});
		})
	}
	
	loadQuiz() {
		// helper function for loading quiz into this.state.questions and this.state.results
		var questions = [];
		for (var i = 0; i < this.props.quizzes.quiz.questions.length; i++) {
			var question = this.props.quizzes.quiz.questions[i];
			question.index = i;
			for (var j = 0; j < question.choices.length; j++) {
				question.choices[j].index = j;
			}
			questions.push(question)
		}
		this.setState({questions: questions})
		
		var results = [];
		for (var i = 0; i < this.props.quizzes.quiz.results.length; i++) {
			var result = this.props.quizzes.quiz.results[i];
			result.index = i;
			results.push(result)
		}
		this.setState({results: results})
		this.setState({refreshing: false});
	}
	
	onPressCreate = (isPublic) => {
		let oldPublic = this.state.public;
		this.setState({public : isPublic}, () => this.createQuiz(oldPublic));
	}
	
	createQuiz(oldPublic) {
		if (this.state.isEditing) {
			this.props.quizzes.update(this.state)
			.then(res => {
				console.log("updated!")
				this.setState({success: this.props.quizzes.success, errors: null})
				if (this.state.public) {
					if (!oldPublic) {
						this.addPoints();
					}
					this.props.navigation.dispatch(StackActions.pop(1));
					this.props.navigation.push("Publish and Share Kwiz");
				}
			})
			.catch((errors) => {
				this.setState({errors: this.props.quizzes.errors})
			})
		} else {
			this.props.quizzes.create(this.state)
			.then(res => {
				console.log("created!")
				this.setState({success: this.props.quizzes.success, errors: null})
				if (this.state.public) {
					this.addPoints();
					this.props.navigation.dispatch(StackActions.pop(1));
					this.props.navigation.push("Publish and Share Kwiz");
				} else {
					this.setState({refreshing: true})
					this.setState({id: res.id, title: res.title, public: res.public, image_url: res.image_url, isEditing: true}, this.loadQuiz)
				}
			})
			.catch((errors) => {
				this.setState({errors: this.props.quizzes.errors})
			})
		}
	}
	
	addPoints() {
		this.props.users.addPoints(10)
		.then(res => {
			console.log("yay points!" + res)
		})
		.catch(errors => {
			console.log("failed");
			console.log(errors);
		});
	}

	onPressAddResult() {
		const newResult = { 
				index: this.state.results.length, 
				title: '' ,
				description: '',
				weight: this.state.results.length+1,
				image: null,
				image_url: null,};
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
				title: '',
				choices: [
					{
						index: 0,
						content: '',
						weight: 1
					},
					], 
				};
		var questions = [...this.state.questions, newQuestion]
	    this.setState({questions}, () => this.onPressAddQuestionChoices(newQuestion.index));
	}
	
	onPressAddQuestionChoices(questionIndex) {
		console.log("hi! question " + questionIndex)
		// for however many results there are, add however many choices
		for (var i = 1; i < this.state.results.length; i++) {
			this.onPressAddChoice(questionIndex);
		}
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
	
	getPhotoFromGallery = (type, resultIndex) => {
		this.setState({ busy: true })
		
		// More info on all the options is below in the API Reference... just some common use cases shown here
		const options = {
				title: 'Select Profile Picture',
//				customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
				storageOptions: {
					skipBackup: true,
					path: 'images',
				},
		};
		
		ImagePicker.launchImageLibrary(options, (response)  => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
				this.setState({ busy: false });
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
				this.setState({ busy: false });
			}
			else {
				if (type == "quiz") {
					var image = response;
					if (!response.fileName) {
						image.fileName = "quiz_image";
					}
					this.setState({image: image, busy: false});
				} else if (type == "result") {
					var results = [...this.state.results];
					var result = results[results.findIndex(elem => elem.index === resultIndex)];
					result.image = response;
					if (!response.fileName) {
						result.image.fileName = "result_image_" + resultIndex;
					}
					this.setState({results: results, busy: false});
				}
				
			}
		});
	};
	
	showPickedImage(type, resultIndex) {
		let image = null;
		let image_url = null;
		if (type == "quiz") {
			image = this.state.image;
			image_url = this.state.image_url;
		} else if (type == "result") {
			image = this.state.results[this.state.results.findIndex(elem => elem.index === resultIndex)].image;
			image_url = this.state.results[this.state.results.findIndex(elem => elem.index === resultIndex)].image_url;
		}
		if(image && image.uri != null && image.uri != undefined) {
			return (
					<Image
					source={{ uri: image.uri }}
					style={ styles.imagePreview }
					/>
			);
		} else if (image_url != null && image_url != undefined) {
			return (
					<Image
					source={{ uri: image_url }}
					style={ styles.imagePreview }
					/>
			);
		} else {
			return null;
		}
	}
	
	getPickedImage(type, resultIndex) {
		if (type == "quiz") {
			return this.state.image || this.state.image_url;
		} else if (type == "result") {
			return this.state.results[this.state.results.findIndex(elem => elem.index === resultIndex)].image
			|| this.state.results[this.state.results.findIndex(elem => elem.index === resultIndex)].image_url;
		}
	}
	
	deletePhoto(type, resultIndex) {
		if (type == "quiz") {
			this.setState({image: null, image_url: null, busy: false});
		} else if (type == "result") {
			var results = [...this.state.results];
			var result = results[results.findIndex(elem => elem.index === resultIndex)];
			result.image = null;
			result.image_url = null;
			this.setState({results: results, busy: false});
		}
	}
	
	render() {
//		console.log("--------------------")
//		console.log("Quiz " + this.state.id)
//		console.log("Results: ")
//		console.log(this.state.results)
//		console.log("Questions: ")
//		console.log(this.state.questions)
		
		
		let resultsArray = this.state.results.map(( item, key ) =>
		{
			return item != undefined && (
					<NewResultForm 
					result={item}
					key={item.index}
					onPressAdd={this.onPressAddResult.bind(this)}
					onPressDelete={this.onPressDeleteResult.bind(this)}
					getPhotoFromGallery={this.getPhotoFromGallery.bind(this)}
					showPickedImage={this.showPickedImage.bind(this)}
					getPickedImage={this.getPickedImage.bind(this)}
					deletePhoto={this.deletePhoto.bind(this)}
					busy={this.state.busy}
					setTitleValue={this.setResultTitleValue.bind(this)}
					setDescriptionValue={this.setResultDescriptionValue.bind(this)}></NewResultForm>
					)
		});
		
		let questionsArray = this.state.questions.map(( item, key ) =>
		{
			return item != undefined && (
					<NewQuestionForm 
					results={this.state.results}
					question={item}
					key={item.index}
					type={this.state.type}
					onPressAdd={this.onPressAddQuestion.bind(this)}
					onPressDelete={this.onPressDeleteQuestion.bind(this)}
					onPressAddChoice={this.onPressAddChoice.bind(this)}
					onPressDeleteChoice={this.onPressDeleteChoice.bind(this)}
					setQuestionValue={this.setQuestionValue.bind(this)}
					setSelectedResultValue={this.setSelectedResultValue.bind(this)}
					setChoiceValue={this.setChoiceValue.bind(this)}></NewQuestionForm>
					)
		});
		
		let resultSection = () => {
			return this.state.type == 'Personality' 
					&& (
							<View style={[ allStyles.section, allStyles.sectionClear ]}>
								<Text style={allStyles.sectionTitle}>Kwiz Results</Text>
								<Text style={allStyles.sectionSubtitle}>Each result corresponds to one type of response. The result will appear at the end of the kwiz.</Text>
								{
									resultsArray
								}
								
								<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.greenButton ]}
					                onPress={this.onPressAddResult.bind(this)}>
									<TabBarIcon name="md-add" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
									<Text style={[ allStyles.whiteText ]}>New result</Text>
								</TouchableOpacity>
							</View>
							)
		}
		
		return <View style={allStyles.container}>
				{
					this.state.refreshing ? <Loading /> : (
					<KeyboardAwareScrollView style={[allStyles.contentContainer, styles.quizFormContainer ]}
					innerRef={ref => {
					    this.scrollview_ref = ref;
					  }}
		      		refreshControl={
			              <RefreshControl
			              refreshing={this.state.refreshing}
			              onRefresh={this._onRefresh}
			            />
			          }>
					
					<View style={[ allStyles.section, allStyles.sectionClear ]}>
						{
							(this.state.isEditing) ? (
									<Text style={allStyles.sectionTitle}>Edit {this.state.type} Kwiz</Text>	
							) : (
									<Text style={allStyles.sectionTitle}>New {this.state.type} Kwiz</Text>		
							)
						}	
					
						{
							this.state.errors &&
							<View style={ allStyles.errors }
							onLayout={event => {
						        const layout = event.nativeEvent.layout;
						        this.scrollview_ref.scrollTo({
						            x: 0,
						            y: layout.y,
						            animated: true,
						        });
						      	}}>
								{
									this.state.errors.map(( item, key ) =>
									{
										return <Text key={key} style={ allStyles.errorText }>• {item}</Text> 
									})
								}
							</View>
						} 
						{
							this.state.success &&
							<View style={ allStyles.success }
							onLayout={event => {
						        const layout = event.nativeEvent.layout;
						        this.scrollview_ref.scrollTo({
						            x: 0,
						            y: layout.y,
						            animated: true,
						        });
						      	}}>
								<Text>{this.state.success}</Text> 
							</View>
						} 
						
						<TextInput
							returnKeyType='next' 
							style={ allStyles.input } 
							onChangeText={(title) => this.setState({title})} 
							value={this.state.title} 
							placeholder='Title (150 chars max)'
						/>
					
							{this.showPickedImage("quiz")}

				          	{
				          		this.state.busy ? 
									<ActivityIndicator/> :
										(
											this.getPickedImage("quiz") ? (
												<View style={[ styles.imageButtonContainer ]}>
													<TouchableOpacity style={[ styles.imageButtonEdit, allStyles.button, allStyles.grayButton ]}
										                onPress={() => this.getPhotoFromGallery("quiz")}>
														<TabBarIcon name="md-image" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
														<Text style={[ allStyles.whiteText ]}>Edit Thumbnail</Text>
													</TouchableOpacity>
													<TouchableOpacity style={[ styles.imageButtonDelete, allStyles.button, allStyles.redButton ]}
										                onPress={() => this.deletePhoto("quiz")}>
														<TabBarIcon name="md-trash" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
														<Text style={[ allStyles.whiteText ]}>Delete</Text>
													</TouchableOpacity>
												</View>
											) : (
												<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton ]}
									                onPress={() => this.getPhotoFromGallery("quiz")}>
													<TabBarIcon name="md-image" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
													<Text style={[ allStyles.whiteText ]}>Add Thumbnail</Text>
												</TouchableOpacity>
											)
										)
				          	}
						
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
							<Text style={[ allStyles.whiteText ]}>New question</Text>
						</TouchableOpacity>
					</View>
						
					{
						(this.state.isEditing) ? (
								<View style={[ allStyles.section, allStyles.sectionClear ]}>
								{
									this.state.public ? 
											(
													<View>
													{
														this.props.quizzes.busy ? 
														<ActivityIndicator/> :
														<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blueButton ]}
											                onPress={() => this.onPressCreate(true)}>
															<TabBarIcon name="md-checkmark" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
															<Text style={[ allStyles.whiteText ]}>Update your kwiz</Text>
														</TouchableOpacity>
													}
													<Text style={[ allStyles.sectionSubtitle, styles.quizSaveText ]}>The changes to your kwiz will automatically be public once you update it. Removing results, choices, or questions will result in users who took the kwiz to lose their saved responses.</Text>
													</View>
											) : (
													<View>
													{
														this.props.quizzes.busy ? 
														<ActivityIndicator/> :
															<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.whiteButton ]}
											                onPress={() => this.onPressCreate(false)}>
															<TabBarIcon name="md-create" style={[ allStyles.buttonIcon ]}/>
															<Text>Save your kwiz</Text>
														</TouchableOpacity>
													}
													{
														this.props.quizzes.busy ? 
														<ActivityIndicator/> :
														<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blueButton ]}
											                onPress={() => this.onPressCreate(true)}>
															<TabBarIcon name="md-checkmark" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
															<Text style={[ allStyles.whiteText ]}>Publish and share</Text>
														</TouchableOpacity>
													}
													<Text style={[ allStyles.sectionSubtitle, styles.quizSaveText ]}>You can save a draft if you are not finished editing your kwiz. You can publish later when you're ready.</Text>
													</View>
											)
								}
								</View>
								) : (
										<View style={[ allStyles.section, allStyles.sectionClear ]}>
										{
											this.props.quizzes.busy ? 
											<ActivityIndicator/> :
												<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.whiteButton ]}
								                onPress={() => this.onPressCreate(false)}>
												<TabBarIcon name="md-create" style={[ allStyles.buttonIcon ]}/>
												<Text>Save a draft</Text>
											</TouchableOpacity>
										}
										{
											this.props.quizzes.busy ? 
											<ActivityIndicator/> :
											<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blueButton ]}
								                onPress={() => this.onPressCreate(true)}>
												<TabBarIcon name="md-checkmark" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
												<Text style={[ allStyles.whiteText ]}>Publish and share</Text>
											</TouchableOpacity>
										}
											<Text style={[ allStyles.sectionSubtitle, styles.quizSaveText ]}>You can save a draft if you are not finished editing your kwiz. You can publish later when you're ready.</Text>
										</View>
								)
					}
				</KeyboardAwareScrollView>
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
			        <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.clearButton ]}>
			        	<Text style={ allStyles.whiteText }>Go Back</Text>
			        </TouchableOpacity>
			      </View>
			    </Modal>
		</View>
	}
}

export default New;