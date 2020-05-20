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

import LoginForm from '../components/LoginForm'

@inject('users') @observer
class Login extends React.Component {
	onLogin(email, password) { 
		this.props.users.login(email, password);
	}
	render() {
		return (
				<KeyboardAwareScrollView style={{padding: 50, marginTop: 50}}>
					<Text style={[ allStyles.title, { textAlign: 'center', marginTop: 50, marginBottom: 50 } ]}>Sign In</Text>
					<LoginForm onPress={this.onLogin.bind(this)} 
					busy={this.props.users.loggingIn} 
					loggingError={this.props.users.loggingError} 
					navigation={this.props.navigation}></LoginForm>
				</KeyboardAwareScrollView>
		) 
	}
}

export default Login;