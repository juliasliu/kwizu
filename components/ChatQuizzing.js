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
			quizzing: null,
			result: null,
			opened: false,
	}
	
	openThumbnail() {
		this.props.quizzes.quizzing(this.props.quiz_id, this.props.user_id)
		.then((res) => {
			var resultOfQuiz = res.quiz.results[res.quiz.results.findIndex(elem => elem.id === res.quizzing.result_id)];
			this.setState({quiz: res.quiz, quizzing: res.quizzing, result: resultOfQuiz, opened: true})
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
		const { image_url } = this.state.result;

		if (image_url != null && image_url != undefined) {
			return (
					<Image source={{ uri: image_url }} 
					style={[allStyles.quizResultImage, styles.chatQuizImage]} />
			);
		} else {
			image_url = this.state.quiz.image_url;

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
	}
		
	render() {
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
										onPress={() => this.props.navigation.push('Kwiz Result', { quiz_id: this.state.quiz.id, user_id: this.props.user_id })}>
										<View style={[allStyles.card, allStyles.quizResultImageContainer, styles.chatQuizImageContainer, styles.chatMessageImageContainerRight]}>
											{
												this.showQuizImage()
											}
										</View>
										<Text style={[allStyles.quizResultTitle, styles.chatQuizTitle, styles.chatMessageDescriptionRight]} numberOfLines={3}>{ this.state.quiz.title }</Text>
										<Text style={[allStyles.quizResultDescription, styles.chatQuizTitle, styles.chatMessageDescriptionRight]} numberOfLines={3}>{ this.state.result.title }</Text>
									</TouchableOpacity>	
								) : (
									<TouchableOpacity style={[ styles.chatMessageDescriptionContainer, styles.chatQuizMessageContainer ]} 
										onPress={this.openThumbnail.bind(this)}>
										<Text style={[allStyles.whiteText, allStyles.boldText]}>Sent a kwiz result</Text>
									</TouchableOpacity>
								)
							}
						</View>
					) : (
						// if other user, float left
						<View style={[styles.chatMessageContainer]}>
							<View style={[styles.profilePictureContainer, styles.chatMessagePictureContainer]}>
								{ this.showPickedImage() }
							</View>
							{
								this.state.opened ? (
									<TouchableOpacity style={[ styles.chatMessageDescriptionContainer, styles.chatQuizMessageDescriptionContainer ]} 
										onPress={() => this.props.navigation.push('Kwiz Result', { quiz_id: this.state.quiz.id, user_id: this.props.user_id })}>
										<View style={[allStyles.card, allStyles.quizResultImageContainer, styles.chatQuizImageContainer]}>
											{
												this.showQuizImage()
											}
										</View>
										<Text style={[allStyles.quizResultTitle, styles.chatQuizTitle]} numberOfLines={3}>{ this.state.quiz.title }</Text>
										<Text style={[allStyles.quizResultDescription, styles.chatQuizTitle]} numberOfLines={3}>{ this.state.result.title }</Text>
									</TouchableOpacity>	
								) : (
									<TouchableOpacity style={[ styles.chatMessageDescriptionContainer, styles.chatQuizMessageContainer ]} 
										onPress={this.openThumbnail.bind(this)}>
										<Text style={[allStyles.whiteText, allStyles.boldText]}>Sent a kwiz result</Text>
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