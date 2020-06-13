import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text,
	ActivityIndicator, TouchableOpacity, View, Button, TextInput, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import ImagePicker from 'react-native-image-picker';

import TabBarIcon from '../components/TabBarIcon';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @observer
class Customize extends React.Component {
	state= {
			user: {},
			refreshing: true,
			busy: false,
			errors: null,
			success: null,
	}
	
	_onRefresh = () => {
	    this.setState({refreshing: true});
	    this.componentDidMount();
	  }

	componentDidMount() {
		this.props.users.show(this.props.users.id)
		.then((res) => {
			console.log("found user!!")
			console.log(res)
			this.setState({user: res, refreshing: false});
		})
		.catch((errors) => {
			this.setState({errors: this.props.users.errors})
		})
	}

	onPressEdit() {
		console.log(this.state.user)
		this.props.users.update(this.state.user)
		.then(res => {
			console.log(res)
			console.log("saved!")
			this.setState({user: this.props.users.user});
			this.setState({success: this.props.users.success})
		})
		.catch((errors) => {
			this.setState({errors: this.props.users.errors})
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
	setProfileEmail(email) {
		var user = this.state.user;
		user.email = email;
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
			else if (response.errors) {
				console.log('ImagePicker Error: ', response.errors);
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

		return (!this.state.refreshing) && (
				<View style={allStyles.container}>
			      <ScrollView style={allStyles.container}
					ref={ref => {
					    this.scrollview_ref = ref;
					  }}>
				      <RefreshControl
			              refreshing={this.state.refreshing}
			              onRefresh={this._onRefresh}
			            />
			      	
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
						{
							this.state.success &&
							<View style={ allStyles.success }
							onLayout={event => {
						        const layout = event.nativeEvent.layout;
						        this.scrollview_ref.scrollTo({
						            x: 0,
						            y: layout.y,
						            animated: true,
						        });
						      	}}>
								<Text>{this.state.success}</Text>
							</View>
						}
						<View>
							<View style={[styles.profilePictureEditContainer]}>
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
									this.refs.email.focus();
								}}
							/>
							<TextInput
								autoCapitalize='none'
								autoCorrect={false}
								ref='email'
								style={ allStyles.input }
								onChangeText={(email) => this.setProfileEmail(email)}
								returnKeyType='next'
								value={this.state.user.email}
								placeholder='Email'
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
								placeholder='Caption (100 chars max)'
									multiline={true}
							/>

							{
								this.props.users.busy ?
										<ActivityIndicator/> :
								<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.blackButton ]} onPress={this.onPressEdit.bind(this)} title="Save Profile">
									<Text style={ allStyles.whiteText }>Save Profile</Text>
								</TouchableOpacity>
							}
					</View>
					</ScrollView>
				</View>
		)
	}
}
export default Customize;
