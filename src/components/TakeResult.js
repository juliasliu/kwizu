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
import TabBarIcon from '../components/TabBarIcon';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

class TakeResult extends React.Component {
		
	render() {
		return (
			<View style={{ marginTop: 20, }}>
				<View style={[ allStyles.card, allStyles.quizResult, styles.takeResult ]}>
						<View style={[ allStyles.quizResultContainer, styles.takeResultContainer ]}>
							<View style={[ allStyles.card, allStyles.quizResultImageContainer ]}><Image style={[allStyles.quizResultImage]} source={{uri: 'https://img1.looper.com/img/gallery/things-that-make-no-sense-about-harry-potter/intro-1550086067.jpg' }}/></View>
							<Text style={ allStyles.quizResultTitle }>Youo are swagidilocious beep beep boop harry pot.</Text>
							<Text style={ allStyles.quizResultDescription }>More description about how swagidilocious you are weeee alsdfjha aiik l :))) lorem ipsum goodeness we love latin amirite</Text>
						</View>
				</View>
			</View>
		)
	} 
}

export default TakeResult;