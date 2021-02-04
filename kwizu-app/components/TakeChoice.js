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

export default function TakeChoice(props) {
		
	getSelectedChoiceStyle = (type, isChecked) => {
		if (type == "button")
			return isChecked && styles.selectedChoiceButton
		if (type == "image")
			return isChecked && styles.selectedChoiceImageContainer
		if (type == "text")
			return isChecked && allStyles.whiteText
	}
	
	showPickedImage = () => {
		const { image_url } = props.choice;

		if (image_url != null && image_url != undefined) {
			return (
					<Image source={{ uri: image_url }} style={[allStyles.quizResultImage]} />
			);
		} else {
			return null;
		}
	}
	
	showPickedImageStyle = () => {
		if (showPickedImage()) {
			return { marginBottom: 10, }
		} else return null;
	}

	// isChecked is true if there is an answer in props.answers with the same questionId and choiceWeight
	let isChecked = props.answers.findIndex(elem => elem.questionId === props.question.id && elem.choiceWeight === props.choice.weight) != -1;
	
		return (
			<View style={[ styles.choiceContainer, styles.selectChoiceContainer ]}>
				<TouchableOpacity style={[ allStyles.button, styles.choice, this.getSelectedChoiceStyle("button", isChecked), styles.selectChoiceButton ]}
					onPress={() => props.setSelectedChoiceValue(props.question.id, props.choice.weight, props.choice.id)}>
					<View style={[ allStyles.card, allStyles.quizResultImageContainer, styles.selectChoiceImageContainer, this.getSelectedChoiceStyle("image", isChecked), this.showPickedImageStyle() ]}>
						{
							this.showPickedImage()
						}
					</View>
					<Text style={[ styles.choiceText, this.getSelectedChoiceStyle("text", isChecked) ]}>{props.choice.content}</Text>
				</TouchableOpacity>
			</View>
		)
}
