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
import allStyles from '../styles/AllScreens';
import styles from '../styles/WelcomeScreen';

import RegistrationForm from '../components/RegistrationForm'

@inject('users') @observer
//function Welcome({ navigation }) {
class Register extends React.Component {
	onPressRegister(email, name, username, password, password_confirmation) { 
		this.props.users.register(email, name, username, password, password_confirmation);
	}
	render() {
		return (
				<KeyboardAwareScrollView style={{padding: 50, marginTop: 50}}>
					<Text style={[ allStyles.title, { textAlign: 'center', marginTop: 50, marginBottom: 50 } ]}>Sign Up</Text>
					<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.facebookButton, styles.shareButton ]}
		                onPress={() => alert("")}>
						<Icon name="facebook" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Sign up with Facebook</Text>
					</TouchableOpacity>

					<Text style={{ textAlign: 'center', fontSize: 16, marginTop: 50, marginBottom: 25 }}>Or, if you have an email:</Text>
					
					<RegistrationForm onPress={this.onPressRegister.bind(this)} 
					busy={this.props.users.registering} 
					registeringError={this.props.users.registeringError} 
					navigation={this.props.navigation}></RegistrationForm>
				</KeyboardAwareScrollView>
		) 
	}
}

export default Register;