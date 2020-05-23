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
	state= { 
			email: '', 
			name: '',
			username: '',
			caption: '',
			password: '',
			passwordConfirmation: ''
	}
	
	onPressLogout() {
		this.props.users.logout();
	}
	onPressEdit() { 
		this.props.onPress(this.state.email, this.state.name, this.state.username, this.state.password, this.state.passwordConfirmation);
	}

	render () {
		this.state = this.props.users.user;
		
		return (
				<View style={allStyles.container}>
			      <ScrollView style={allStyles.container}>
					<View>	
						{
							this.props.editingError &&
							<View style={ allStyles.error }>
								<Text>{this.props.editingError}</Text>
							</View>
						}
						<TextInput
							ref='name' 
							style={ allStyles.input } 
							onChangeText={(name) => this.setState({name})} 
							returnKeyType='next' 
							value={this.state.name} 
							placeholder='Name' 
							onSubmitEditing={(event) => {
								this.refs.username.focus();
							}}
						/>
						<TextInput
							autoCapitalize='none'
							autoCorrect={false}
							ref='username' 
							style={ allStyles.input } 
							onChangeText={(username) => this.setState({username})} 
							returnKeyType='next' 
							value={this.state.username} 
							placeholder='Username' 
							onSubmitEditing={(event) => {
								this.refs.caption.focus();
							}}
						/>
						<TextInput
							autoCapitalize='none'
							ref='caption' 
							style={[ allStyles.input, allStyles.textarea ]} 
							onChangeText={(caption) => this.setState({caption})} 
							returnKeyType='next' 
							value={this.state.caption} 
							placeholder='Caption (150 chars max)' 
								multiline={true}
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
							placeholder='New Password (4 chars min)'
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
							placeholder='New Password Confirmation (4 chars min)'
						/>
							
							{
								this.props.busy ? 
										<ActivityIndicator/> :
								<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.greenButton ]} onPress={() => alert("")} title="Save Profile">
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