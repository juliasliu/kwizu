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
import { Dropdown } from 'react-native-material-dropdown';

import TabBarIcon from '../components/TabBarIcon';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

class NewQuestionForm extends React.Component {
	state= {
			index: 0,
			question: { title: '' },
			choices: [ 
				{
					index: 0,
					content: '',
					weight: 1
				},
				],
			choiceIndex: 0,
	};
	
	onPressAddQuestion() { 
		this.props.onPressAdd();
	}
	onPressDeleteQuestion() { 
		this.props.onPressDelete();
	}

	onPressAddChoice() {
		const newChoice = { index: this.state.choiceIndex+1, content: '', weight: 1, };
		 
	    this.setState({
	      choices: [...this.state.choices, newChoice],
	      choiceIndex: this.state.choiceIndex+1
	    });
	}
	onPressDeleteChoice = (index) => {
		if (this.state.choices.length != 1) {
			const newChoicesArray = [...this.state.choices]
			newChoicesArray.splice(newChoicesArray.findIndex(elem => elem.index === index), 1);
			
			this.setState({
				choices: newChoicesArray
			});
		}
	}
	
	setQuestionValue = (value) => {
		var question = this.state.question
		question.title = value;
		this.setState({question})
	}
	setSelectedResultValue = (index, value) => {
		var choices = [...this.state.choices]
		choices[choices.findIndex(elem => elem.index === index)].weight = value;
		this.setState({choices})
	}
	setChoiceValue = (index, value) => {
		var choices = [...this.state.choices]
		choices[choices.findIndex(elem => elem.index === index)].content = value;
		this.setState({choices})
	}
	
	render() {
		
		// convert this.prop.results into { label, value }
		let data = []
		for(var i = 0; i < this.props.results.length; i++) {
			let weight = this.props.results[i].weight
			data.push({ label: "Result " + weight, value: weight})
		}
		
		let choicesArray = this.state.choices.map(( item, key ) =>
		{
			let actualArrayIndex = item != undefined ? this.state.choices.findIndex(elem => elem.index === item.index) : null;
			return item != undefined ? (<View style={ styles.choiceContainer } key = { item.index }>
				<View style={ styles.choiceInput }>
					<Dropdown
				        label='' labelFontSize={0} labelHeight={0}
				        data={data}
						value={this.state.choices[actualArrayIndex].weight}
						fontSize={14}
						onChangeText={(value,index,data) => this.setSelectedResultValue(item.index, value)} 
						containerStyle={[ allStyles.input, allStyles.dropdown, styles.choiceInputSelect ]}
						inputContainerStyle={[allStyles.dropdownInput]}
						pickerStyle={[allStyles.card, allStyles.dropdownPicker]}
						dropdownOffset={{top: 50, left: 20}}
				      />
					<TextInput
						ref='choice' 
						returnKeyType='next' 
						style={[ allStyles.input, styles.choiceInputField ]} 
						onChangeText={(value) => this.setChoiceValue(item.index, value)}
						value={this.state.choices[actualArrayIndex].content} 
						placeholder='Choice (25 words max)'
					/>
					<TouchableOpacity style={[ allStyles.button, allStyles.grayButton, styles.choiceInputDelete ]}
		                onPress={() => this.onPressDeleteChoice(item.index)}>
						<TabBarIcon name="md-trash" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
					</TouchableOpacity>
				</View>
			</View>) : null
		});
		
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
						onChangeText={(value) => this.setQuestionValue(value)} 
						value={this.state.question.title} 
						multiline={true}
				    	numberOfLines={3}
						placeholder='Question title (50 words max)'
					/>

					{
							choicesArray
					}
					
					<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton ]}
	                	onPress={this.onPressAddChoice.bind(this)}>
						<TabBarIcon name="md-add" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={ allStyles.whiteText }>Add choice</Text>
					</TouchableOpacity>
				</View>
				
				<View style={ styles.quizFormAdd }>
					<TouchableOpacity style={[ allStyles.button, allStyles.redButton, styles.quizFormAddButton ]}
		                onPress={this.onPressDeleteQuestion.bind(this)}>
						<TabBarIcon name="md-trash" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={ allStyles.whiteText }>Delete question</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

export default NewQuestionForm;