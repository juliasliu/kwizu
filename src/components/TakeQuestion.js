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
	state= { 
			registerEmail: '', 
			registerPassword: '', 
			registerName: ''
	}
	onPressRegister() { 
		this.props.onPress(this.state.registerEmail, this.state.registerPassword, this.state.registerName);
	}
	render() {
		return (
				<View style={[ styles.quizForm ]}>
					<View style={[ styles.quizFormHeader, styles.questionHeader ]}>
						<Text style={[ styles.quizFormNumber, allStyles.whiteText ]}>Question 1</Text>
					</View>
					<View style={[ allStyles.card ]}>
					{
						this.props.registeringError &&
						<View style={ allStyles.error }>
							<Text>{this.props.registeringError}</Text>
						</View>
					}
					<Text style={styles.question}>How much wood could a wood chuck chuck if a wood chuck could chuck wood?</Text>
					<View style={ styles.choiceContainer }>
						<View style={[ allStyles.card, styles.choice ]}>
							<CheckBox
									onClick={()=>{
										this.setState({
										     isChecked:!this.state.isChecked1
										})
									}}
									checkBoxColor="#a0acba"
									isChecked={this.state.isChecked1}
								/>
							<Text style={ styles.choiceText }>Choice #1 whttevr asfkjas ies her</Text>
						</View>
						<View style={[ allStyles.card, styles.choice ]}>
							<CheckBox
									onClick={()=>{
										this.setState({
										     isChecked:!this.state.isChecked2
										})
									}}
									checkBoxColor="#a0acba"
									isChecked={this.state.isChecked2}
								/>
							<Text style={ styles.choiceText }>Choice #2 whttevr asfkjas ies her</Text>
						</View>
						<View style={[ allStyles.card, styles.choice ]}>
							<CheckBox
									onClick={()=>{
										this.setState({
										     isChecked:!this.state.isChecked3
										})
									}}
									checkBoxColor="#a0acba"
									isChecked={this.state.isChecked3}
								/>
							<Text style={ styles.choiceText }>Choice #3 whttevr asfkjas ies her</Text>
						</View>
						<View style={[ allStyles.card, styles.choice ]}>
							<CheckBox
									onClick={()=>{
										this.setState({
										     isChecked:!this.state.isChecked4
										})
									}}
									checkBoxColor="#a0acba"
									isChecked={this.state.isChecked4}
								/>
							<Text style={ styles.choiceText }>Choice #4 whttevr asfkjas ies her</Text>
						</View>
					</View>
				</View>
			</View>
		)
	}
}

export default TakeQuestion;