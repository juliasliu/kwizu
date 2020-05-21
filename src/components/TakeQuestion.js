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

class TakeQuestion extends React.Component {
	state = { 
			
	}
	setSelectedChoiceValue(weight) {
		this.props.setSelectedChoiceValue(this.state.index, weight);
	}
	
	getSelectedChoiceStyle(type, isChecked) {
		if (type == "button")
			return isChecked ? allStyles.greenButton : null
		if (type == "checkbox")
			return isChecked ? '#fff' : "#a0acba"
		if (type == "text")
			return isChecked ? allStyles.whiteText : null
	}
	
	render() {
		this.state = this.props.question;

		let choicesArray = this.state.choices.map(( item, key ) =>
		{
			// isChecked is true if there is an answer in this.props.answers with the same questionIndex and choiceWeight
			let isChecked = this.props.answers.findIndex(elem => elem.questionIndex === this.state.index && elem.choiceWeight === item.weight) != -1;
			return item != undefined ? (
					<View style={[ styles.choiceContainer]} key = { item.index } >
						<TouchableOpacity style={[ allStyles.button, styles.choice, this.getSelectedChoiceStyle("button", isChecked) ]}
							onPress={() => this.setSelectedChoiceValue(item.weight)}>
							<CheckBox
								onClick={() => this.setSelectedChoiceValue(item.weight)}
								checkBoxColor= {this.getSelectedChoiceStyle("checkbox", isChecked)}
								isChecked={isChecked}
							/>
							<Text style={[ styles.choiceText, this.getSelectedChoiceStyle("text", isChecked) ]}>{item.content}</Text>
						</TouchableOpacity>
					</View>
					) : null
		});
		
		return (
				<View style={[ styles.quizForm ]}>
					<View style={[ styles.quizFormHeader, styles.questionHeader ]}>
						<Text style={[ styles.quizFormNumber, allStyles.whiteText ]}>Question {this.state.index + 1}</Text>
					</View>
					<View style={[ allStyles.card ]}>
					{
						this.props.registeringError &&
						<View style={ allStyles.error }>
							<Text>{this.props.registeringError}</Text>
						</View>
					}
					<Text style={styles.question}>{ this.state.question.title }</Text>
					{
						choicesArray
					}
				</View>
			</View>
		)
	}
}

export default TakeQuestion;