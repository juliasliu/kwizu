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
	Linking,
	TouchableOpacity,
} from 'react-native';

import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TabBarIcon from '../components/TabBarIcon';
import FBLoginButton from '../components/FBLoginButton';

import allStyles from '../styles/AllScreens';
import styles from '../styles/WelcomeScreen';

@inject('users') @observer
class Welcome extends React.Component {
	
	initUser(token) {
		fetch('https://graph.facebook.com/v7.0/me?fields=email,name,friends&access_token=' + token)
		  .then((response) => response.json())
		  .then((json) => {
		    this.setState({email: json.email, 
		    	name: json.name, 
		    	username: json.email.split("@")[0].toLowerCase(), 
		    	password: json.id, 
		    	password_confirmation: json.id})
		    this.loginUser();
		  })
		  .catch(() => {
		    reject('ERROR GETTING DATA FROM FACEBOOK')
		  })
	}
	
	loginUser() {
		console.log("we logging")
		this.props.users.login(this.state.email, this.state.password)
		.then(res => {
			console.log("login!")
		})
		.catch((errors) => {
            // register if no user exists yet, otherwise login
			this.registerUser();
		})
	}
	
	registerUser() {
		console.log("gotta register")
		this.props.users.register(this.state.email, this.state.name, this.state.username, this.state.password, this.state.password_confirmation)
		.then(res => {
			this.props.users.addPoints(10)
			.then(res => {
				console.log("yay points!" + res)
			})
		})
		.catch((errors) => {
			// check if username is taken
			if (errors.includes("Username has already been taken")) {
				// generate random username with digits appended to the name
				let randomDigits = Math.round(Math.random() * 100000);
				this.setState({username: this.state.username + randomDigits})
				this.registerUser();
			} else {
				this.setState({errors: this.props.users.errors})
			}
		})
	}
	
	render() {
		return (
				<View style={[styles.welcomeContainer]}>
					<View style={styles.welcomeBackgroundContainer}>
						<Image source={require("../assets/images/welcome.png")} style={styles.welcomeBackground} />
					</View>
					<View style={styles.welcomeButtonsContainer}>
						<View style={ styles.welcomeButtons }>
							{
								this.props.users.busy ? 
								<ActivityIndicator/> :
									<FBLoginButton 
									initUser={this.initUser.bind(this)} />
							}
							<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.whiteButton ]}
				                onPress={() => this.props.navigation.navigate('Login')}>
								<TabBarIcon name="md-mail" style={[ allStyles.buttonIcon ]}/>
								<Text>Sign in with email</Text>
							</TouchableOpacity>
							
							<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blackButton ]}
				                onPress={() => this.props.navigation.navigate('Register')}>
								<Text style={[ allStyles.whiteText ]}>Sign up with email</Text>
							</TouchableOpacity>
							<Text style={[allStyles.text, allStyles.center, { marginTop: 25 }]}>
								By continuing, you agree to our
								<Text style={ allStyles.link } onPress={() => Linking.openURL('http://google.com')}> Terms of Service</Text> and 
								<Text style={ allStyles.link } onPress={() => Linking.openURL('http://google.com')}> Privacy Policy</Text>.
							</Text>
						</View>
					</View>
				</View>
		) 
	}
}

export default Welcome;