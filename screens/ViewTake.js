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
class ViewTake extends React.Component {
	state = {
		quiz: null,
		quizzing: null,
		resultOfQuiz : null,	// stores the result object
		user: null,
	    recommended: [],		// list of recommended quizzes based on this quiz
	    refreshing: true,
	    isModalVisible: false,
	}
	
	_onRefresh = () => {
	    this.setState({refreshing: true});
	    this.componentDidMount();
	}
	
	showInterstitialAd = () => {
		let id = "ca-app-pub-8298967838514788/3809240812";
	    // Create a new instance
	    const interstitialAd = InterstitialAd.createForAdRequest(id);

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
		const {user_id} = this.props.route.params;
		const {quiz_id} = this.props.route.params;
		this.props.quizzes.quizzing(quiz_id, user_id)
		.then((res) => {
			// if logged in user has not taken this quiz or viewing own result, redirect to "Take"
			// and logged in user did not create this quiz
			if ((this.props.users.user.taken_quizzes.findIndex(elem => elem.id === res.quiz.id) < 0
					|| this.props.users.id == user_id) && this.props.users.id != res.quiz.user.id) {
				this.props.navigation.dispatch(StackActions.pop(1));
				this.props.navigation.push("Take Kwiz", {quiz_id: res.quiz.id})
				this.setState({refreshing: false});
			} else {
				console.log("succeedded")
				var resultOfQuiz = res.quiz.results[res.quiz.results.findIndex(elem => elem.id === res.quizzing.result_id)];
				this.setState({quiz: res.quiz, quizzing: res.quizzing, resultOfQuiz: resultOfQuiz}, () => this.recommendQuiz(user_id))
				this.showInterstitialAd();
			}
		})
		.catch((errors) => {
			console.log("o no quiz doesn't exist")
			console.log(errors);
			this.setState({isModalVisible: true});
		})
	}

	recommendQuiz(user_id) {
		this.props.users.show(user_id)
		.then((res) => {
			this.setState({user: res, recommended: res.taken_quizzes.slice(0, 5)})
			this.setState({refreshing: false});
		})
		.catch((errors) => {
			console.log("o noes")
			console.log(errors);
			this.setState({isModalVisible: true});
		})
	}
	
	takeQuiz() {
		this.props.navigation.push("Take Kwiz", {quiz_id: this.state.quiz.id, fromPublish: true})
	}
	
	showPickedAvatar() {
		const { avatar_url } = this.state.user;

		if (avatar_url != null && avatar_url != undefined) {
			return (
					<Image
					source={{ uri: avatar_url }}
					style={{borderRadius: 50, width: 25, height: 25}}
					/>
			);
		} else {
			return (
					<Image
					source={ Thumbnails.avatar }
					style={{borderRadius: 50, width: 25, height: 25}}
					/>
			);
		}
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
									<View style={[styles.quizImageContainer]}>
										{
											this.showPickedImage()
										}
										<View style={[styles.quizImageOverlay]} />
									</View>
									<Text style={[ allStyles.title, styles.quizTitle ]}>{ this.state.quiz.title }</Text>
								</View>
								<TouchableOpacity style={{display: 'flex', flexDirection: 'row', alignItems: 'center',}} 
								onPress={() => this.props.navigation.push("Profile", {user_id: this.state.user.id})}>
									{this.showPickedAvatar()}
									<Text style={[ allStyles.heading, {marginLeft: 10,} ]}>{ this.state.user.name } got the result:</Text>
								</TouchableOpacity>
								{
									<TakeQuiz 
									navigation={this.props.navigation}
									resultOfQuiz={this.state.resultOfQuiz}
									quiz={this.state.quiz}
									user={this.state.user}
									recommended={this.state.recommended}
									viewMyResult={false}
									takeQuiz={this.takeQuiz.bind(this)} />
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

export default ViewTake;