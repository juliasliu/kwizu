import React, { PropTypes } from 'react'
import {
	ScrollView,
	TextInput,
	Button,
	Text,
	View,
	Image,
	ActivityIndicator,
	StyleSheet,
	Link,
	TouchableOpacity,
} from 'react-native';

import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from 'react-native-check-box'

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

import TabBarIcon from '../components/TabBarIcon';

import NewResultForm from '../components/NewResultForm'
import NewQuestionForm from '../components/NewQuestionForm'

@inject('users') @observer
class New extends React.Component {
	onPressRegister(email, password, name) { 
		this.props.users.register(email, password, name);
	}
	
	state = {
			isChecked: true,
	}
	
	render() {
		return (
				<KeyboardAwareScrollView style={[allStyles.container, styles.quizFormContainer ]}>
					
					<View style={[ allStyles.section, allStyles.sectionClear ]}>
						<Text style={allStyles.sectionTitle}>Kwiz Description</Text>
					
						<TextInput
						ref='registerName' 
						style={ allStyles.input } 
	//					onChangeText={(registerName) => this.setState({registerName})} 
						returnKeyType='next' 
	//					value={this.state.registerName} 
						placeholder='Title (25 words max)' 
						onSubmitEditing={(event) => {
	//						this.refs.registerPassword.focus();
						}}
						/>
					
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton ]}
			                onPress={() => alert("")}>
							<TabBarIcon name="md-image" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Add Thumbnail</Text>
						</TouchableOpacity>
						
					</View>

					<View style={[ allStyles.section, allStyles.sectionClear ]}>
						<Text style={allStyles.sectionTitle}>Kwiz Results</Text>
						<Text style={allStyles.sectionSubtitle}>Each result is a "bucket" for a type of response. The result will appear at the end of the kwiz.</Text>
						<NewResultForm onPress={this.onPressRegister.bind(this)} busy={this.props.users.registering} registeringError={this.props.users.registeringError} navigation={this.props.navigation}></NewResultForm>
					</View>
					
					<View style={[ allStyles.section, allStyles.sectionClear ]}>
						<Text style={allStyles.sectionTitle}>Kwiz Questions</Text>
						<Text style={allStyles.sectionSubtitle}>Make sure the number of choices for each question match the number of results.</Text>
						<NewQuestionForm onPress={this.onPressRegister.bind(this)} busy={this.props.users.registering} registeringError={this.props.users.registeringError} navigation={this.props.navigation}></NewQuestionForm>
					</View>
						
					<View style={[ allStyles.section, allStyles.sectionClear ]}>
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blueButton ]}
			                onPress={() => this.props.navigation.navigate("Save and Share Kwiz")}>
							<TabBarIcon name="md-checkmark" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Save and share</Text>
						</TouchableOpacity>
						<Text style={[ allStyles.sectionSubtitle, styles.quizSaveText ]}>You can save a draft if you are not finished editing your kwiz. You can publish later when you're ready.</Text>
					</View>
				</KeyboardAwareScrollView>
		) 
	}
}

export default New;