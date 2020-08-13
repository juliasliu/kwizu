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
	Platform,
} from 'react-native';

import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TabBarIcon from '../components/TabBarIcon';
import FBLoginButton from '../components/FBLoginButton';
import appleAuth, {
	  AppleButton,
	  AppleAuthError,
	  AppleAuthRequestScope,
	  AppleAuthRequestOperation,
	  AppleAuthCredentialState,
	} from '@invertase/react-native-apple-authentication';

import { APP_ROOT } from '../constants';

import allStyles from '../styles/AllScreens';
import styles from '../styles/WelcomeScreen';

@inject('users') @observer
class Welcome extends React.Component {
	
	state = {
			email: "",
			name: "",
			username: "",
			password: "",
			password_confirmation: "",
			facebook_id: "",
			apple_id: "",
	}
	
	initUserFacebook(token) {
		fetch('https://graph.facebook.com/v7.0/me?fields=email,name&access_token=' + token)
		  .then((response) => response.json())
		  .then((json) => {
		    this.setState({email: json.email, 
		    	name: json.name, 
		    	username: json.email.split("@")[0].toLowerCase(), 
		    	password: json.id, 
		    	password_confirmation: json.id, 
		    	facebook_id: json.id}, this.loginUserFacebook)
		  })
		  .catch(() => {
		    reject('ERROR GETTING DATA FROM FACEBOOK')
		  })
	}
	
	loginUserFacebook() {
		console.log("we logging")
		this.props.users.login(null, null, null, this.state.facebook_id)
		.then(res => {
			console.log("login!")
		})
		.catch((errors) => {
            // register if no user exists yet, otherwise login
			this.registerUserFacebook();
		})
	}
	
	registerUserFacebook() {
		console.log("gotta register")
		this.props.users.register(this.state.email, this.state.name, this.state.username, this.state.password, this.state.password_confirmation, this.state.facebook_id)
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
				this.setState({username: this.state.username + randomDigits}, this.registerUserFacebook)
			} else {
				this.setState({errors: this.props.users.errors})
			}
		})
	}
	
	initUserApple = async () => {
		// performs login request
		const appleAuthRequestResponse = await appleAuth.performRequest({
			requestedOperation: AppleAuthRequestOperation.LOGIN,
			requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
		});

		// get current authentication state for user
		// /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
		const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

		console.log("INIT USER APPLE?!?!??!??!")
		
		// use credentialState response to ensure the user is authenticated
		if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
			// user is authenticated
			// retrieve identityToken from sign in request
			const {
				identityToken,
				fullName,
				email,
				user
			} = appleAuthRequestResponse;
			console.log('IDENTITY TOKEN')
			console.log(identityToken);
			console.log('USER /?????')
			console.log(user);

			this.verifyAppleToken(identityToken, user, fullName, email)
		}
	}
	
	verifyAppleToken(identityToken, userIdentity, fullName, email) {
		console.log("time to veRIFY and print out dientty token and user agian")
		console.log(identityToken)
		console.log(userIdentity)
		this.props.users.verifyAppleToken(identityToken, userIdentity)
		.then(res => {
			console.log(res)
			if (fullName && email) {
				this.setState({email: email, 
					name: fullName["givenName"] + " " + fullName["familyName"], 
					username: email.split("@")[0].toLowerCase(), 
					password: userIdentity, 
					password_confirmation: userIdentity,
					apple_id: userIdentity}, this.loginUserApple)
			} else {
				this.setState({apple_id: userIdentity}, this.loginUserApple)
			}
		})
		.catch((errors) => {
            // register if no user exists yet, otherwise login
			console.log(errors);
		})
	}
	
	loginUserApple() {
		console.log("we logging to apple")
		console.log("apple_id: " + this.state.apple_id)
		this.props.users.login(null, null, null, null, this.state.apple_id)
		.then(res => {
			console.log("login!")
		})
		.catch((errors) => {
            // register if no user exists yet, otherwise login
			this.registerUserApple();
		})
	}
	
	registerUserApple() {
		console.log("gotta register apple id")
		this.props.users.register(this.state.email, this.state.name, this.state.username, this.state.password, this.state.password_confirmation, null, this.state.apple_id)
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
				this.setState({username: this.state.username + randomDigits}, this.registerUserApple)
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
									(
										appleAuth.isSupported && 
										<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.whiteButton ]}
											onPress={this.initUserApple.bind(this)}>
											<Icon name="apple" style={[ allStyles.buttonIcon, {color: '#000'} ]}/>
											<Text style={{color: '#000'}}>Sign in with Apple</Text>
										</TouchableOpacity>
									)
								}
								{
									this.props.users.busy ? 
									<ActivityIndicator/> :
										<FBLoginButton 
										initUser={this.initUserFacebook.bind(this)} />
								}
								<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton ]}
					                onPress={() => this.props.navigation.navigate('Login')}>
									<TabBarIcon name="md-mail" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
									<Text style={[ allStyles.whiteText ]}>Sign in with email</Text>
								</TouchableOpacity>
								
								<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blackButton ]}
					                onPress={() => this.props.navigation.navigate('Register')}>
									<TabBarIcon name="md-person" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>	
									<Text style={[ allStyles.whiteText ]}>Sign up with email</Text>
								</TouchableOpacity>
							<Text style={[allStyles.text, allStyles.center, { marginTop: 25 }]}>
								By continuing, you agree to our
								<Text style={ allStyles.link } onPress={() => Linking.openURL(APP_ROOT + '/#/terms-of-service')}> Terms of Service</Text> and 
								<Text style={ allStyles.link } onPress={() => Linking.openURL(APP_ROOT + '/#/privacy-policy')}> Privacy Policy</Text>.
							</Text>
						</View>
					</View>
				</View>
		) 
	}
}

export default Welcome;