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

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

class QuizThumbnail extends React.Component {
	
	getCardStyle(type) {
		if (type == "preview")
			return styles.quizPreview
		if (type == "thumbnail")
			return styles.quizThumbnail
	}
	
	getCardDraftStyle() {
		if (this.props.quiz.public == false)
			return styles.quizDraftOverlay
	}
	
	showPickedImage() {
		const { image_url } = this.props.quiz;

		if (image_url != null && image_url != undefined) {
			return (
					<Image source={{ uri: image_url }} style={[styles.quizImage]} />
			);
		} else {
			let imgPlaceholder = 'https://img1.looper.com/img/gallery/things-that-make-no-sense-about-harry-potter/intro-1550086067.jpg';
			return (
					<Image source={{ uri: imgPlaceholder }} style={[styles.quizImage]} />
			);
		}
	}
	
	render() {
		this.state = this.props.quiz;
		
		return (
			      <TouchableOpacity style={[ allStyles.card, styles.quizCard, this.getCardStyle(this.props.type) ]} 
			      	onPress={() => this.props.navigation.push("Take Kwiz", {quiz_id: this.state.id})}>
				      <View style={[styles.quizImageContainer]}>
						{
							this.showPickedImage()
						}
				        <View style={[styles.quizImageOverlay, this.getCardDraftStyle()]} />
					</View>
			      	<Text style={styles.quizThumbnailTitle} numberOfLines={3}>{ this.state.title }</Text>
			      </TouchableOpacity>
		)
	} 
}

export default QuizThumbnail;