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

class QuizPreview extends React.Component {

	
	
	render() {
		this.state = this.props.quiz;
		
		return (
				<TouchableOpacity style={[ allStyles.card, styles.quizCard, styles.quizPreview ]}
					onPress={() => this.props.navigation.navigate("Take Kwiz")}>
						<View style={[styles.quizImageContainer]}>
							<Image style={[styles.quizImage]} source={{uri: this.state.image }}/>
					        <View style={[styles.quizImageOverlay]} />
						</View>
						<Text style={styles.quizThumbnailTitle} numberOfLines={3}>{ this.state.title }</Text>
			      </TouchableOpacity>
		)
	} 
}

export default QuizPreview;