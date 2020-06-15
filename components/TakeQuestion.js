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
	
	setSelectedChoiceValue = (weight, id) => {
		this.props.setSelectedChoiceValue(this.props.question.id, weight, id);
	}
	
	headerColors = [
		"#77A0A9", "#566C8A", "#485061",
	]
	
	getSelectedChoiceStyle = (type, isChecked) => {
		if (type == "button")
			return isChecked && allStyles.greenButton
		if (type == "checkbox")
			return isChecked ? '#fff' : "#a0acba"
		if (type == "text")
			return isChecked && allStyles.whiteText
	}
	
	randomHeaderColor = () => {
		let index = Math.floor(Math.random() * this.headerColors.length);
		return { backgroundColor: this.headerColors[index] };
	}
	
	render() {
		let choicesArray = this.props.question.choices.map(( item, key ) =>
		{
			// isChecked is true if there is an answer in this.props.answers with the same questionId and choiceWeight
			let isChecked = this.props.answers.findIndex(elem => elem.questionId === this.props.question.id && elem.choiceWeight === item.weight) != -1;
			return item != undefined && (
					<View style={[ styles.choiceContainer]} key = { key } >
						<TouchableOpacity style={[ allStyles.button, styles.choice, this.getSelectedChoiceStyle("button", isChecked) ]}
							onPress={() => this.setSelectedChoiceValue(item.weight, item.id)}>
							<CheckBox
								onClick={() => this.setSelectedChoiceValue(item.weight, item.id)}
								checkBoxColor= {this.getSelectedChoiceStyle("checkbox", isChecked)}
								isChecked={isChecked}
							/>
							<Text style={[ styles.choiceText, this.getSelectedChoiceStyle("text", isChecked) ]}>{item.content}</Text>
						</TouchableOpacity>
					</View>
					)
		});
		
		return (
				<View style={[ styles.quizForm ]}>
					<View style={[ styles.quizFormHeader, styles.questionHeader, this.randomHeaderColor() ]}>
						<Text style={[ styles.quizFormNumber, allStyles.whiteText ]}>Question {this.props.index + 1}</Text>
					</View>
					<View style={[ allStyles.card ]}>
					
					<Text style={styles.question}>{ this.props.question.title }</Text>
					{
						choicesArray
					}
				</View>
			</View>
		)
	}
}
