import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react' 
import Icon from 'react-native-vector-icons/FontAwesome'
import notifications from '../notifications'

import { Image, Platform, StyleSheet, Text,
	ActivityIndicator, TouchableOpacity, View, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import ImagePicker from 'react-native-image-picker';

import { MonoText } from '../components/StyledText';
import TabBarIcon from '../components/TabBarIcon';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @observer
class Settings extends React.Component {
	state= { 
			user: {},
			refreshing: true,
			busy: false,
	}
	
	componentDidMount() {
		this.setState({user: this.props.users.user, refreshing: false});
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
	
	getPhotoFromGallery = () => {
		this.setState({ busy: true })
		
		// More info on all the options is below in the API Reference... just some common use cases shown here
		const options = {
				title: 'Select Profile Picture',
//				customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
				storageOptions: {
					skipBackup: true,
					path: 'images',
				},
		};
		
		ImagePicker.launchImageLibrary(options, (response)  => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
				this.setState({ busy: false });
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
				this.setState({ busy: false });
			}
			else {
				var user = this.state.user;
				user.avatar = response;
				if (!response.fileName) {
					user.avatar.fileName = "user_avatar";
				}
				this.setState({user: user, busy: false});
			}
		});
	};
	
	showPickedImage() {
		const { avatar } = this.state.user;
		const { avatar_url } = this.state.user;

		if (avatar && avatar.uri != null && avatar.uri != undefined) {
			return (
					<Image
					source={{ uri: avatar.uri }}
					style={ styles.profilePicture }
					/>
			);
		} else if (avatar_url != null && avatar_url != undefined) {
			return (
					<Image
					source={{ uri: avatar_url }}
					style={ styles.profilePicture }
					/>
			);
		} else {
			let imgPlaceholder = 'https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG?w=970&h=546&fit=crop&crop=faces&auto=format%2Ccompress&cs=srgb&q=70';
			return (
					<Image
					source={{uri: imgPlaceholder}}
					style={ styles.profilePicture }
					/>
			);
		}
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
						<View>
				          	{this.showPickedImage()}

				          	{
				          		this.state.busy ? 
									<ActivityIndicator/> :
										(
											<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.grayButton ]}
									      		onPress={this.getPhotoFromGallery}>
												<TabBarIcon name="md-image" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
												<Text style={[ allStyles.halfWidthButtonText, allStyles.whiteText ]}>Edit profile picture</Text>
											</TouchableOpacity>	
										)
				          	}
				        </View>
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