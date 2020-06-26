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

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

export default class TakeQuestion extends React.Component {
	
	headerColors = [
		"#E94E4E", "#f5a836", "#e6be4c", "#2ED673", "#25afd9", "#9877a9",
	]
	
	getSelectedChoiceStyle = (type, isChecked) => {
		if (type == "button")
			return isChecked && allStyles.grayButton
//		if (type == "checkbox")
//			return isChecked ? '#fff' : "#77A0A9"
		if (type == "text")
			return isChecked && allStyles.whiteText
	}
	
	randomHeaderColor = (index) => {
		return { backgroundColor: this.headerColors[index % this.headerColors.length] };
	}
	
	render() {
		let choicesArray = this.props.question.choices.map(( item, key ) =>
		{
			// isChecked is true if there is an answer in this.props.answers with the same questionId and choiceWeight
			let isChecked = this.props.answers.findIndex(elem => elem.questionId === this.props.question.id && elem.choiceWeight === item.weight) != -1;
			return item != undefined && (
					<View style={[ styles.choiceContainer, styles.selectChoiceContainer ]} key = { key } >
						<TouchableOpacity style={[ allStyles.button, styles.choice, this.getSelectedChoiceStyle("button", isChecked) ]}
							onPress={() => this.props.setSelectedChoiceValue(this.props.question.id, item.weight, item.id)}>
							<Text style={[ styles.choiceText, this.getSelectedChoiceStyle("text", isChecked) ]}>{item.content}</Text>
						</TouchableOpacity>
					</View>
					)
		});
		
		return (
				<View style={[ styles.quizForm ]}>
					<View style={[ styles.quizFormHeader, styles.questionHeader, this.randomHeaderColor(this.props.index) ]}>
						<Text style={[ styles.quizFormNumber, allStyles.whiteText ]}>Question {this.props.index + 1}</Text>
					</View>
					<View style={[ allStyles.card ]}>
					
					<Text style={styles.question}>{ this.props.question.title }</Text>
					<View style={[styles.choicesArray]}>
						{
							choicesArray
						}
					</View>
				</View>
			</View>
		)
	}
}
