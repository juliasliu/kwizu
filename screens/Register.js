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

export default class Register extends React.Component {
	
	onPressRegister(email, name, username, password, password_confirmation) {
		this.props.users.register(email, name, username, password, password_confirmation)
		.then(res => {
			this.props.users.addPoints(10)
			.then(res => {
				console.log("yay points!" + res)
			})
		})
	}
	
	render() {
		return (
				<ScrollView style={allStyles.container}
				ref={ref => {
				    this.scrollview_ref = ref;
				  }}>
					<KeyboardAwareScrollView contentContainerStyle={styles.welcomeContainer}>
						<Text style={[ allStyles.title, { textAlign: 'center', marginVertical: 50 } ]}>Sign Up</Text>
						
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.facebookButton, styles.shareButton ]}
			                onPress={() => alert("")}>
							<Icon name="facebook" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Sign up with Facebook</Text>
						</TouchableOpacity>
	
						<Text style={[allStyles.sectionMessage, { marginTop: 25 }]}>Or, if you have an email:</Text>
						{
							this.props.users.errors &&
							<View style={ allStyles.errors }
							onLayout={event => {
						        const layout = event.nativeEvent.layout;
						        this.scrollview_ref.scrollTo({
						            x: 0,
						            y: layout.y,
						            animated: true,
						        });
						      	}}>
								{
									this.props.users.errors.map(( item, key ) =>
									{
										return <Text key={key} style={ allStyles.errorText }>• {item}</Text> 
									})
								}
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
