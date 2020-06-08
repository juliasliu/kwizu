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
				<ScrollView>
					<KeyboardAwareScrollView contentContainerStyle={styles.welcomeContainer}>
						<Text style={[ allStyles.title, { textAlign: 'center', marginVertical: 50 } ]}>Sign Up</Text>
						
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.facebookButton, styles.shareButton ]}
			                onPress={() => alert("")}>
							<Icon name="facebook" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Sign up with Facebook</Text>
						</TouchableOpacity>
	
						<Text style={{ textAlign: 'center', fontSize: 16, marginTop: 50, marginBottom: 25 }}>Or, if you have an email:</Text>
						{
							this.props.users.error &&
							<View style={ allStyles.error }>
								<Text>{this.props.users.error}</Text> 
							</View>
						}
						
						<RegistrationForm onPress={this.onPressRegister.bind(this)} 
						busy={this.props.users.busy} 
						navigation={this.props.navigation}></RegistrationForm>
					</KeyboardAwareScrollView>
				</ScrollView>
		) 
	}
}

export default Register;