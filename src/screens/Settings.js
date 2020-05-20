import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react' 
import Icon from 'react-native-vector-icons/FontAwesome'
import notifications from '../notifications'

import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @observer
class Settings extends React.Component {
	static navigationOptions = { 
		tabBarLabel: 'Profile', 
		tabBarIcon: ({ tintColor }) => (
				<Icon name="user" size={30} color={tintColor}/> 
		),
	};
	onPressLogout() {
		this.props.users.logout();
	}
	state= { 
			registerEmail: '', 
			registerName: '',
			registerUsername: '',
			registerCaption: '',
			registerPassword: '',
			registerPasswordConfirmation: ''
	}
	onPressRegister() { 
		this.props.onPress(this.state.registerEmail, this.state.registerName, this.state.registerUsername, this.state.registerPassword, this.state.registerPasswordConfirmation);
	}

	render () {
		return (
				<View style={allStyles.container}>
			      <ScrollView style={allStyles.container}>
					<View>	
						{
							this.props.registeringError &&
							<View style={ allStyles.error }>
								<Text>{this.props.registeringError}</Text>
							</View>
						}
						<TextInput
							autoCapitalize='none' 
							autoCorrect={false} 
							keyboardType='email-address' 
							returnKeyType='next' 
							style={ allStyles.input } 
							onChangeText={(registerEmail) => this.setState({registerEmail})} 
							value={this.state.registerEmail} 
							placeholder='Email' 
							onSubmitEditing={(event) => {
								this.refs.registerName.focus(); 
							}}
						/>
						<TextInput
							ref='registerName' 
							style={ allStyles.input } 
							onChangeText={(registerName) => this.setState({registerName})} 
							returnKeyType='next' 
							value={this.state.registerName} 
							placeholder='Name' 
							onSubmitEditing={(event) => {
								this.refs.registerUsername.focus();
							}}
						/>
						<TextInput
							autoCapitalize='none'
							autoCorrect={false}
							ref='registerUsername' 
							style={ allStyles.input } 
							onChangeText={(registerUsername) => this.setState({registerUsername})} 
							returnKeyType='next' 
							value={this.state.registerUsername} 
							placeholder='Username' 
							onSubmitEditing={(event) => {
								this.refs.registerPassword.focus();
							}}
						/>
						<TextInput
							autoCapitalize='none'
							ref='editCaption' 
							style={[ allStyles.input, allStyles.textarea ]} 
							onChangeText={(editCaption) => this.setState({editCaption})} 
							returnKeyType='next' 
							value={this.state.editCaption} 
							placeholder='Caption' 
								multiline={true}
							onSubmitEditing={(event) => {
								this.refs.registerPassword.focus();
							}}
						/>
						<TextInput
							ref='registerPassword' 
							style={ allStyles.input } 
							onChangeText={(registerPassword) => this.setState({registerPassword})} 
							returnKeyType='next' 
							value={this.state.registerPassword} 
							secureTextEntry={true} 
							placeholder='Password'
							onSubmitEditing={(event) => {
								this.refs.registerPasswordConfirmation.focus();
							}}
						/>
						<TextInput
							ref='registerPasswordConfirmation' 
							style={ allStyles.input } 
							onChangeText={(registerPasswordConfirmation) => this.setState({registerPasswordConfirmation})} 
							value={this.state.registerPasswordConfirmation} 
							secureTextEntry={true} 
							placeholder='Password Confirmation'
						/>
							
							{
								this.props.busy ? 
										<ActivityIndicator/> :
								<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.greenButton ]} onPress={alert("")} title="Save Profile">
									<Text style={ allStyles.whiteText }>Save Profile</Text>
								</TouchableOpacity>
							}
							<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.redButton ]} onPress={this.onPressLogout.bind(this)} title="Log Out">
								<Text style={ allStyles.whiteText }>Log Out</Text>
							</TouchableOpacity>
					</View>
					</ScrollView>
				</View>
		)
	}
}
export default Settings;