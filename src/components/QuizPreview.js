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

	handleLearnMorePress() {
	  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
	}

	handleHelpPress() {
	  WebBrowser.openBrowserAsync(
	    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
	  );
	}
	
	render() {
		
		return (
				<TouchableOpacity style={[ allStyles.card, styles.quizCard, styles.quizPreview ]}
					onPress={() => this.props.navigation.navigate("Take Kwiz")}>
				        <Text style={styles.quizThumbnailTitle}>Find your personality this should be 50 words max</Text>
			      </TouchableOpacity>
		)
	} 
}

export default QuizPreview;