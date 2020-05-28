import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react' 
import Icon from 'react-native-vector-icons/FontAwesome'
import notifications from '../notifications'

import { Image, Platform, StyleSheet, Text,
	ActivityIndicator, TouchableOpacity, View, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @observer
class Settings extends React.Component {
	state= { 
			user: {},
			refreshing: true,
	}
	
	componentDidMount() {
		if (this.props.users.user) this.setState({user: this.props.users.user, refreshing: false});
	}
	
	onPressLogout() {
		this.props.users.logout()
		.then((res) => {
			console.log("logged out")
		});
	}
	onPressEdit() {
		console.log(this.state.user)
		this.props.users.update(this.state.user)
		.then(res => {
			console.log(res)
			console.log("saved!")
			this.setState({user: this.props.users.user});
		})
		.catch(error => {
			console.log("failed");
			console.log(error);
		})
	}
	
	setProfileName(name) {
		var user = this.state.user;
		user.name = name;
		this.setState({user})
	}
	setProfileUsername(username) {
		var user = this.state.user;
		user.username = username;
		this.setState({user})
	}
	setProfileCaption(caption) {
		var user = this.state.user;
		user.caption = caption;
		this.setState({user})
	}

	render () {
		
		return (!this.state.refreshing) ? (
				<View style={allStyles.container}>
			      <ScrollView style={allStyles.container}
					ref={ref => {
					    this.scrollview_ref = ref;
					  }}>
					<View>	
						{
							this.props.users.error &&
							<View style={ allStyles.error }
							onLayout={event => {
						        const layout = event.nativeEvent.layout;
						        this.scrollview_ref.scrollTo({
						            x: 0,
						            y: layout.y,
						            animated: true,
						        });
						      	}}>
								<Text>{this.props.users.error}</Text> 
							</View>
						} 
						{
							this.props.users.success &&
							<View style={ allStyles.success }
							onLayout={event => {
						        const layout = event.nativeEvent.layout;
						        this.scrollview_ref.scrollTo({
						            x: 0,
						            y: layout.y,
						            animated: true,
						        });
						      	}}>
								<Text>{this.props.users.success}</Text> 
							</View>
						}
						<TextInput
							ref='name' 
							style={ allStyles.input } 
							onChangeText={(name) => this.setProfileName(name)} 
							returnKeyType='next' 
							value={this.state.user.name} 
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
							onChangeText={(username) => this.setProfileUsername(username)} 
							returnKeyType='next' 
							value={this.state.user.username} 
							placeholder='Username' 
							onSubmitEditing={(event) => {
								this.refs.caption.focus();
							}}
						/>
						<TextInput
							autoCapitalize='none'
							ref='caption' 
							style={[ allStyles.input, allStyles.textarea ]} 
							onChangeText={(caption) => this.setProfileCaption(caption)} 
							returnKeyType='next' 
							value={this.state.user.caption} 
							placeholder='Caption (150 chars max)' 
								multiline={true}
						/>
							
							{
								this.props.users.busy ? 
										<ActivityIndicator/> :
								<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.greenButton ]} onPress={this.onPressEdit.bind(this)} title="Save Profile">
									<Text style={ allStyles.whiteText }>Save Profile</Text>
								</TouchableOpacity>
							}
							{
								this.props.users.busy ? 
								<ActivityIndicator/> :
									<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.redButton ]} onPress={this.onPressLogout.bind(this)} title="Log Out">
									<Text style={ allStyles.whiteText }>Log Out</Text>
								</TouchableOpacity>
							}
					</View>
					</ScrollView>
				</View>
		) : null
	}
}
export default Settings;