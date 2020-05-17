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

class NewQuestionForm extends React.Component {
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
					<TextInput
						returnKeyType='next' 
						style={[ allStyles.input, allStyles.textarea ]} 
						onChangeText={(registerEmail) => this.setState({registerEmail})} 
						value={this.state.registerEmail} 
						multiline={true}
				    	numberOfLines={3}
						placeholder='Question title (50 words max)' 
						onSubmitEditing={(event) => {
							this.refs.registerName.focus(); 
						}}
					/>
					<View style={ styles.choiceContainer }>
						<View style={ styles.choiceInput }>
							<View style={[ allStyles.checkbox, allStyles.button, allStyles.whiteButton, styles.choiceInputSelect ]}>
								<CheckBox
								    onClick={()=>{
								      this.setState({
								          isChecked:!this.state.isChecked
								      })
								    }}
									checkBoxColor="#a0acba"
								    isChecked={this.state.isChecked}
									style={{ height: 10 }}
								/>
							</View>
							<TextInput
								ref='choice' 
								returnKeyType='next' 
								style={[ allStyles.input, styles.choiceInputField ]} 
								onChangeText={(registerName) => this.setState({registerName})} 
								returnKeyType='next' 
								value={this.state.registerName} 
								placeholder='Choice 1 (25 words max)' 
								onSubmitEditing={(event) => {
									this.refs.registerPassword.focus();
								}}
							/>
							<TouchableOpacity style={[ allStyles.button, allStyles.redButton, styles.choiceInputDelete ]}
				                onPress={() => alert("")}>
								<TabBarIcon name="md-close" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							</TouchableOpacity>
						</View>
						
						
					</View>
					
					<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton ]}
	                	onPress={() => alert('nice friends!')}>
						<TabBarIcon name="md-add" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={ allStyles.whiteText }>Add choice</Text>
					</TouchableOpacity>
				</View>
				
				<View style={ styles.quizFormAdd }>
					<TouchableOpacity style={[ allStyles.button, allStyles.redButton, styles.quizFormAddButton ]}
		                onPress={() => alert("")}>
						<TabBarIcon name="md-trash" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={ allStyles.whiteText }>Delete question</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[ allStyles.button, allStyles.greenButton, styles.quizFormAddButton ]}
		                onPress={() => alert("")}>
						<TabBarIcon name="md-add" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={ allStyles.whiteText }>New question</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

export default NewQuestionForm;