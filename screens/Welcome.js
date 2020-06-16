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
class Welcome extends React.Component {
	render() {
		return (
				<View style={[styles.welcomeContainer]}>
					<View style={styles.welcomeBackgroundContainer}>
						<Image source={require("../assets/images/welcome.png")} style={styles.welcomeBackground} />
					</View>
					<View style={styles.welcomeButtonsContainer}>
						<View style={ styles.welcomeButtons }>
							<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.facebookButton, styles.shareButton ]}
				                onPress={() => alert("")}>
								<Icon name="facebook" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
								<Text style={[ allStyles.whiteText ]}>Sign in with Facebook</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.whiteButton ]}
				                onPress={() => this.props.navigation.navigate('Login')}>
								<TabBarIcon name="md-mail" style={[ allStyles.buttonIcon ]}/>
								<Text>Sign in with email</Text>
							</TouchableOpacity>
							
							<Text style={[allStyles.subheading]}>Don't have an account yet?</Text> 
							
							<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blackButton ]}
				                onPress={() => this.props.navigation.navigate('Register')}>
								<Text style={[ allStyles.whiteText ]}>Sign up</Text>
							</TouchableOpacity>
							<Text style={[allStyles.text, allStyles.center, { marginTop: 25 }]}>
								By continuing, you agree to our
								<Text style={ allStyles.link } onPress={() => Linking.openURL('http://google.com')}> Terms of Service </Text> and 
								<Text style={ allStyles.link } onPress={() => Linking.openURL('http://google.com')}> Privacy Policy</Text>.
							</Text>
						</View>
					</View>
				</View>
		) 
	}
}

export default Welcome;