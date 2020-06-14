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

@inject('users') @observer

export default class Register extends React.Component {
	
	state = {
			errors: null,
			email: '', 
			name: '',
			username: '',
			password: '',
			passwordConfirmation: ''
	}
	
	onPressRegister() {
		this.props.users.register(this.state.email, this.state.name, this.state.username, this.state.password, this.state.password_confirmation)
		.then(res => {
			this.props.users.addPoints(10)
			.then(res => {
				console.log("yay points!" + res)
			})
		})
		.catch((errors) => {
			this.setState({errors: this.props.users.errors})
		})
	}
	
	render() {
		return (
				<ScrollView contentContainerStyle={[styles.welcomeContainer]}
				ref={ref => {
				    this.scrollview_ref = ref;
				  }}>
					<View style={styles.welcomeBackgroundContainer}>
						<Image source={require("../assets/images/register.png")} style={styles.welcomeBackground} />
					</View>
					<KeyboardAwareScrollView contentContainerStyle={[styles.welcomeFormContainer]}>
						<View style={styles.welcomeForm}>
							<Text style={[ allStyles.title, allStyles.center, allStyles.whiteText ]}>Sign Up</Text>
							{
								this.state.errors &&
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
										this.state.errors.map(( item, key ) =>
										{
											return <Text key={key} style={ allStyles.errorText }>• {item}</Text> 
										})
									}
								</View>
							}
							<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.facebookButton, styles.shareButton ]}
				                onPress={() => alert("")}>
								<Icon name="facebook" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
								<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Sign up with Facebook</Text>
							</TouchableOpacity>
							<Text style={[allStyles.subheading, allStyles.center, { marginTop: 25 }, allStyles.whiteText]}>Or, if you have an email:</Text>
							<TextInput
								ref='name' 
								style={ allStyles.input } 
								onChangeText={(name) => this.setState({name})} 
								returnKeyType='next' 
								value={this.state.name} 
								placeholder='Name' 
								onSubmitEditing={(event) => {
									this.refs.email.focus();
								}}
							/>
							<TextInput
							ref='email' 
								autoCapitalize='none' 
								autoCorrect={false} 
								keyboardType='email-address' 
								returnKeyType='next' 
								style={ allStyles.input } 
								onChangeText={(email) => this.setState({email})} 
								value={this.state.email} 
								placeholder='Email' 
								onSubmitEditing={(event) => {
									this.refs.username.focus(); 
								}}
							/>
							<TextInput
							ref='username'
								autoCapitalize='none'
								autoCorrect={false} 
								style={ allStyles.input } 
								onChangeText={(username) => this.setState({username})} 
								returnKeyType='next' 
								value={this.state.username} 
								placeholder='Username (4 chars min)' 
								onSubmitEditing={(event) => {
									this.refs.password.focus();
								}}
							/>
							<TextInput
								ref='password' 
								style={ allStyles.input } 
								onChangeText={(password) => this.setState({password})} 
								returnKeyType='next' 
								value={this.state.password} 
								secureTextEntry={true} 
								placeholder='Password'
								onSubmitEditing={(event) => {
									this.refs.passwordConfirmation.focus();
								}}
							/>
							<TextInput
								ref='passwordConfirmation' 
								style={ allStyles.input } 
								onChangeText={(passwordConfirmation) => this.setState({passwordConfirmation})} 
								value={this.state.passwordConfirmation} 
								secureTextEntry={true} 
								placeholder='Password Confirmation'
							/>
							<View style={ allStyles.flexContainer }>
								<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.redButton ]}
				                	onPress={() => this.props.navigation.navigate('Welcome')}>
									<Text style={[ styles.fullWidthButtonText, allStyles.whiteText ]}>Cancel</Text>
								</TouchableOpacity>
								{
									this.props.users.busy ? 
									<ActivityIndicator/> :
									<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.whiteButton ]}
										onPress={this.onPressRegister.bind(this)}>
										<Text style={[ allStyles.fullWidthButtonText ]}>Sign me up!</Text>
									</TouchableOpacity>
								}
							</View>
						</View>
					</KeyboardAwareScrollView>
				</ScrollView>
		) 
	}
}
