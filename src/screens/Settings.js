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
			editEmail: '', 
			editName: '',
			editUsername: '',
			editCaption: '',
			editPassword: '',
			editPasswordConfirmation: ''
	}
	onPressEdit() { 
		this.props.onPress(this.state.editEmail, this.state.editName, this.state.editUsername, this.state.editPassword, this.state.editPasswordConfirmation);
	}

	render () {
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
							autoCapitalize='none' 
							autoCorrect={false} 
							keyboardType='email-address' 
							returnKeyType='next' 
							style={ allStyles.input } 
							onChangeText={(editEmail) => this.setState({editEmail})} 
							value={this.state.editEmail} 
							placeholder='Email' 
							onSubmitEditing={(event) => {
								this.refs.editName.focus(); 
							}}
						/>
						<TextInput
							ref='editName' 
							style={ allStyles.input } 
							onChangeText={(editName) => this.setState({editName})} 
							returnKeyType='next' 
							value={this.state.editName} 
							placeholder='Name' 
							onSubmitEditing={(event) => {
								this.refs.editUsername.focus();
							}}
						/>
						<TextInput
							autoCapitalize='none'
							autoCorrect={false}
							ref='editUsername' 
							style={ allStyles.input } 
							onChangeText={(editUsername) => this.setState({editUsername})} 
							returnKeyType='next' 
							value={this.state.editUsername} 
							placeholder='Username' 
							onSubmitEditing={(event) => {
								this.refs.editPassword.focus();
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
								this.refs.editPassword.focus();
							}}
						/>
						<TextInput
							ref='editPassword' 
							style={ allStyles.input } 
							onChangeText={(editPassword) => this.setState({editPassword})} 
							returnKeyType='next' 
							value={this.state.editPassword} 
							secureTextEntry={true} 
							placeholder='Password'
							onSubmitEditing={(event) => {
								this.refs.editPasswordConfirmation.focus();
							}}
						/>
						<TextInput
							ref='editPasswordConfirmation' 
							style={ allStyles.input } 
							onChangeText={(editPasswordConfirmation) => this.setState({editPasswordConfirmation})} 
							value={this.state.editPasswordConfirmation} 
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