import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import {
	TextInput,
	Button,
	Text,
	View,
	Image,
	ActivityIndicator,
	TouchableOpacity,
	  Dimensions,
} from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import * as WebBrowser from 'expo-web-browser';
import TabBarIcon from '../components/TabBarIcon';

import Thumbnails from '../constants/Thumbnails';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('quizzes') @observer
class ChatQuiz extends React.Component {
	
	state = {
			quiz: null,
			opened: false,
	}
	
	openThumbnail() {
		this.props.quizzes.show(this.props.quiz_id)
		.then((res) => {
			this.setState({quiz: res.quiz, opened: true})
		})
		.catch((errors) => {
			console.log("o no quiz doesn't exist")
			console.log(errors);
			this.setState({isModalVisible: true});
		})
	}
	
	showPickedImage() {
		const { avatar_url } = this.props.user;

		if (avatar_url != null && avatar_url != undefined) {
			return (
					<Image
					source={{ uri: avatar_url }}
					style={[ styles.profilePicture, styles.chatMessagePicture ] }
					/>
			);
		} else {
			return (
					<Image
					source={ Thumbnails.avatar }
					style={[ styles.profilePicture, styles.chatMessagePicture ] }
					/>
			);
		}
	}
	
	showQuizImage() {
		const { image_url } = this.state.quiz;

		if (image_url != null && image_url != undefined) {
			return (
					<Image source={{ uri: image_url }} 
					style={[allStyles.quizResultImage, styles.chatQuizImage]} />
			);
		} else {
			return (
					<Image source={Thumbnails.quiz} 
					style={[allStyles.quizResultImage, styles.chatQuizImage]} />
			);
		}
	}
		
	render() {
		
		let navigateToProfile = () => {
			console.log("hi")
			this.props.navigation.push("Profile", {user_id: this.props.user.id})
		}
		
		return (
				<View style={{flex: 1}}>
				{
					// if you, float right
					this.props.user.id == this.props.logged_in_user_id ? (
						<View style={[styles.chatMessageContainer, styles.chatMessageContainerRight]}>
							<View style={[styles.profilePictureContainer, styles.chatMessagePictureContainer]}>
								{ this.showPickedImage() }
							</View>
							{
								this.state.opened ? (
									<TouchableOpacity style={[ styles.chatMessageDescriptionContainer, styles.chatMessageDescriptionContainerRight, styles.chatQuizMessageDescriptionContainer ]} 
										onPress={() => this.props.navigation.push("Take Kwiz", {quiz_id: this.state.quiz.id})}>
										<View style={[allStyles.card, allStyles.quizResultImageContainer, styles.chatQuizImageContainer, styles.chatMessageImageContainerRight]}>
											{
												this.showQuizImage()
											}
										</View>
										<Text style={[allStyles.quizResultTitle, styles.chatQuizTitle, styles.chatMessageDescriptionRight]} numberOfLines={3}>{ this.state.quiz.title }</Text>
									</TouchableOpacity>	
								) : (
									<TouchableOpacity style={[ styles.chatMessageDescriptionContainer, styles.chatQuizMessageContainer ]} 
										onPress={this.openThumbnail.bind(this)}>
										<Text style={[allStyles.whiteText, allStyles.boldText]}>Sent a kwiz</Text>
									</TouchableOpacity>
								)
							}
						</View>
					) : (
						// if other user, float left
						<View style={[styles.chatMessageContainer]}>
							<TouchableOpacity style={[styles.profilePictureContainer, styles.chatMessagePictureContainer]}
							onPress={navigateToProfile}>
								{ this.showPickedImage() }
							</TouchableOpacity>
							{
								this.state.opened ? (
									<TouchableOpacity style={[ styles.chatMessageDescriptionContainer, styles.chatQuizMessageDescriptionContainer ]} 
										onPress={() => this.props.navigation.push("Take Kwiz", {quiz_id: this.state.quiz.id})}>
										<View style={[allStyles.card, allStyles.quizResultImageContainer, styles.chatQuizImageContainer]}>
											{
												this.showQuizImage()
											}
										</View>
										<Text style={[allStyles.quizResultTitle, styles.chatQuizTitle]} numberOfLines={3}>{ this.state.quiz.title }</Text>
									</TouchableOpacity>	
								) : (
									<TouchableOpacity style={[ styles.chatMessageDescriptionContainer, styles.chatQuizMessageContainer ]} 
										onPress={this.openThumbnail.bind(this)}>
										<Text style={[allStyles.whiteText, allStyles.boldText]}>Sent a kwiz</Text>
									</TouchableOpacity>
								)
							}
						</View>	
					)
				}
				</View>
		)
	}
}

export default ChatQuiz;