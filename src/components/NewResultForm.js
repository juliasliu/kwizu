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

import TabBarIcon from '../components/TabBarIcon';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

class NewResultForm extends React.Component {
	state = {
		
	};
	
	onPressAddResult() { 
		this.props.onPressAdd();
	}
	onPressDeleteResult() { 
		this.props.onPressDelete(this.state.index);
	}
	
	setTitleValue = (value) => {
		this.props.setTitleValue(this.state.index, value);
	}
	setDescriptionValue = (value) => {
		this.props.setDescriptionValue(this.state.index, value);
	}
	
	render() {
		this.state = this.props.result
		
		return (
				<View style={[ styles.quizForm ]}>
					<View style={[ styles.quizFormHeader, styles.resultHeader ]}>
						<Text style={[ styles.quizFormNumber, allStyles.whiteText ]}>Result {this.state.index + 1}</Text>
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
							style={ allStyles.input } 
							onChangeText={(value) => this.setTitleValue(value)} 
							value={this.state.title} 
							placeholder='Result title (150 chars max)' 
							onSubmitEditing={(event) => {
								this.refs.resultDescription.focus(); 
							}}
						/>
						<TextInput
							ref='resultDescription' 
							returnKeyType='next' 
							style={[ allStyles.input, allStyles.textarea ]} 
							onChangeText={(value) => this.setDescriptionValue(value)} 
							returnKeyType='next' 
							value={this.state.description} 
							multiline={true}
					    	numberOfLines={5}
							placeholder='Result description (1000 chars max)'
						/>
	
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton ]}
				            onPress={() => alert("")}>
							<TabBarIcon name="md-image" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Add image</Text>
						</TouchableOpacity>
					</View>
					
					<View style={ styles.quizFormAdd }>
						<TouchableOpacity style={[ allStyles.button, allStyles.redButton, styles.quizFormAddButton ]}
			                onPress={this.onPressDeleteResult.bind(this)}>
							<TabBarIcon name="md-trash" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={ allStyles.whiteText }>Delete result</Text>
						</TouchableOpacity>
					</View>
			</View>
		)
	}
}

export default NewResultForm;