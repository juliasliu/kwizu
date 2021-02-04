import React, { PropTypes } from 'react'
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
import styles from '../styles/HomeScreen';

export default function QuizThumbnail(props) {
	
	getCardStyle = (type) => {
		if (type == "preview")
			return styles.quizPreview
		if (type == "thumbnail")
			return styles.quizThumbnail
	}
	
	getCardDraftStyle = () => {
		if (props.quiz.public == false)
			return styles.quizDraftOverlay
	}
	
	showPickedImage = () => {
		const { image_url } = props.quiz;

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
	
	return (
			<TouchableOpacity style={[ allStyles.card, styles.quizCard, this.getCardStyle(props.type) ]} 
				onPress={() => {
					console.log("WHO IS HERE" + props.userId)
					if (!props.isOwnProfile && props.userId) props.navigation.push("Kwiz Result", {quiz_id: props.quiz.id, user_id: props.userId})
					else props.navigation.push("Take Kwiz", {quiz_id: props.quiz.id})
					}
				}>
				<View style={[styles.quizImageContainer]}>
					{
						this.showPickedImage()
					}
					<View style={[styles.quizImageOverlay, this.getCardDraftStyle()]} />
				</View>
				<Text style={styles.quizThumbnailTitle} numberOfLines={3}>{ props.quiz.title }</Text>
			</TouchableOpacity>
	)
}