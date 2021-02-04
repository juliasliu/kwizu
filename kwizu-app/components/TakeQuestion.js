import React, { PropTypes } from 'react'
import {
	ScrollView,
	TextInput,
	Button,
	Text,
	View,
	Image,
	ActivityIndicator,
	TouchableOpacity
} from 'react-native';
import CheckBox from 'react-native-check-box'

import TabBarIcon from '../components/TabBarIcon';
import TakeChoice from '../components/TakeChoice';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

export default class TakeQuestion extends React.Component {
	
	headerColors = [
		allStyles.redButton, allStyles.orangeButton, allStyles.yellowButton, allStyles.greenButton, allStyles.blueButton, allStyles.purpleButton,
	]
	
	randomHeaderColor = (index) => {
		return this.headerColors[index % this.headerColors.length];
	}
	randomShadowColor = (index) => {
		return { backgroundColor: this.headerColors[index % this.headerColors.length].shadowColor };
	}
	
	render() {
		let choicesArray = this.props.question.choices.map(( item, key ) =>
		{
			return item != undefined && (
					<TakeChoice
					choice={item}
					question={this.props.question}
					answers={this.props.answers}
					setSelectedChoiceValue={this.props.setSelectedChoiceValue}
					key={key}
					index={key}
					/>
				)
		});
		
		return (
				<View style={[ styles.quizForm ]}>
					<View style={[ styles.quizFormHeader, styles.questionHeader, this.randomHeaderColor(this.props.index) ]}>
						<Text style={[ styles.quizFormNumber, allStyles.whiteText ]}>Question {this.props.index + 1}</Text>
					</View>
					<View style={[ allStyles.card ]}>
						<Text style={[styles.question ]}>{ this.props.question.title }</Text>
					</View>
					<View style={[styles.choicesArray]}>
						{
							choicesArray
						}
					</View>
				</View>
		)
	}
}
