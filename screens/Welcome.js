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
import TabBarIcon from '../components/TabBarIcon';
//import FBLoginButton from '../components/FBLoginButton';

import allStyles from '../styles/AllScreens';
import styles from '../styles/WelcomeScreen';

@inject('users') @observer
//function Welcome({ navigation }) {
class Welcome extends React.Component {
	render() {
		return (
				<View style={styles.welcomeContainer}>
					<View style={ styles.logoContainer }>
						<Icon name="user" size={100} style={ styles.logo }></Icon>
					</View>
					<View style={ styles.welcomeButtonsContainer }>
						
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.facebookButton, styles.shareButton ]}
			                onPress={() => alert("")}>
							<Icon name="facebook" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Sign in with Facebook</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.whiteButton ]}
			                onPress={() => this.props.navigation.navigate('Login')}>
							<TabBarIcon name="md-mail" style={[ allStyles.buttonIcon ]}/>
							<Text style={ allStyles.fullWidthButtonText }>Sign in with email</Text>
						</TouchableOpacity>
						
						<Text style={{ fontSize: 16, marginTop: 25 }}>Don't have an account yet?</Text> 
						
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.greenButton ]}
			                onPress={() => this.props.navigation.navigate('Register')}>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Sign up</Text>
						</TouchableOpacity>
						<Text style={{ textAlign: 'center', marginTop: 25 }}>
							By continuing, you agree to our 
							<Text style={ allStyles.link } onPress={() => Linking.openURL('http://google.com')}>
								Terms and Privacy Policy</Text>.
						</Text>
					</View>
				</View>
		) 
	}
}

export default Welcome;