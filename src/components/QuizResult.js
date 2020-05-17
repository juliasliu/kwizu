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
import styles from '../styles/ProfileScreen';

class QuizResult extends React.Component {
		
	render() {
		return (
				<View style={[ allStyles.card, allStyles.quizResult ]}>
					<View style={allStyles.quizResultContainer}>
						<Text style={ allStyles.quizResultTitle }>Which Harry Potter villain are you?</Text>
						<Text style={ allStyles.quizResultDescription }>Result title here. You can only see this if you also took the kwiz.</Text>
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.greenButton ]}
							onPress={() => this.props.navigation.navigate("Take Kwiz")}>
							<Text style={ allStyles.whiteText }>Take Kwiz</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity onPress={() => alert('')}>
						<TabBarIcon name="md-arrow-dropdown" style={[ styles.settingsButton, allStyles.quizResultDropdownButton ]}/>
					</TouchableOpacity>
			</View>
		)
	} 
}

export default QuizResult;