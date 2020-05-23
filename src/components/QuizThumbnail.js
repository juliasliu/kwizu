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
	
	render() {
		this.state = this.props.quiz;
		
		return (
			      <TouchableOpacity style={[ allStyles.card, styles.quizCard, this.getCardStyle(this.props.type) ]} 
			      	onPress={() => this.props.navigation.navigate("Take Kwiz")}>
				      <View style={[styles.quizImageContainer]}>
						<Image style={[styles.quizImage]} source={{uri: 'https://img1.looper.com/img/gallery/things-that-make-no-sense-about-harry-potter/intro-1550086067.jpg' }}/>
				        <View style={[styles.quizImageOverlay]} />
					</View>
			      	<Text style={styles.quizThumbnailTitle} numberOfLines={3}>{ this.state.title }</Text>
			      </TouchableOpacity>
		)
	} 
}

export default QuizThumbnail;