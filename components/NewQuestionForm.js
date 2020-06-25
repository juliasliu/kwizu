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

export default function NewQuestionForm(props) {
	
		// convert this.prop.results into { label, value }
		let data = []
		for(var i = 0; i < props.results.length; i++) {
			let weight = props.results[i].weight
			let title = props.results[i].title
			data.push({ label: title, value: weight})
		}
		
		let choicesArray = props.question.choices.map(( item, key ) =>
		{
			let actualArrayIndex = item != undefined ? props.question.choices.findIndex(elem => elem.index === item.index) : null;
			return item != undefined && (
					<View style={ styles.choiceContainer } key = { item.index }>
						<View style={ styles.choiceInput }>
						<Dropdown
					        label='' labelFontSize={0} labelHeight={0}
					        data={data}
							value={props.question.choices[actualArrayIndex].weight}
							fontSize={14}
							onChangeText={(value,index,data) => props.setSelectedResultValue(props.question.index, item.index, value)} 
							containerStyle={[ allStyles.input, allStyles.dropdown, styles.choiceInputSelect ]}
							inputContainerStyle={[allStyles.dropdownInput]}
							pickerStyle={[allStyles.card, allStyles.dropdownPicker]}
							dropdownOffset={{top: 50, left: 20}}
					      />
						<TextInput 
							returnKeyType='next' 
							style={[ allStyles.input, styles.choiceInputField ]} 
							onChangeText={(value) => props.setChoiceValue(props.question.index, item.index, value)}
							value={props.question.choices[actualArrayIndex].content} 
							placeholder='Choice (150 chars max)'
						/>
						<TouchableOpacity style={[ allStyles.button, allStyles.grayButton, styles.choiceInputDelete ]}
			                onPress={() => props.onPressDeleteChoice(props.question.index, item.index)}>
							<TabBarIcon name="md-trash" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						</TouchableOpacity>
					</View>
				</View>
				)
		});
		
		return (
				<View style={[ styles.quizForm ]}>
					<View style={[ styles.quizFormHeader, styles.questionHeader ]}>
						<Text style={[ styles.quizFormNumber, allStyles.whiteText ]}>Question {props.question.index + 1}</Text>
					</View>
					<View style={[ allStyles.card ]}>
					
					<TextInput
						returnKeyType='next' 
						style={[ allStyles.input, allStyles.textarea ]} 
						onChangeText={(value) => props.setQuestionValue(props.question.index, value)} 
						value={props.question.title} 
						multiline={true}
				    	numberOfLines={3}
						placeholder='Question (300 chars max)'
					/>

					{
							choicesArray
					}
					
					<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton ]}
	                	onPress={() => props.onPressAddChoice(props.question.index)}>
						<TabBarIcon name="md-add" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={[ allStyles.whiteText ]}>Add choice</Text>
					</TouchableOpacity>
				</View>
				
				<View style={ styles.quizFormAdd }>
					<TouchableOpacity style={[ allStyles.button, allStyles.redButton, styles.quizFormAddButton ]}
		                onPress={() => props.onPressDelete(props.question.index)}>
						<TabBarIcon name="md-trash" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={[ allStyles.whiteText ]}>Delete question</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
}
