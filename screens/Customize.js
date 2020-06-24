import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text,
	ActivityIndicator, TouchableOpacity, View, Button, TextInput, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import { StackActions } from '@react-navigation/native';

import TabBarIcon from '../components/TabBarIcon';
import Thumbnails from '../constants/Thumbnails';
import Loading from '../components/Loading';

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
			isModalVisible: false,
	}
	
	_onRefresh = () => {
		this.setState({refreshing: true});
		this.componentDidMount();
	}

	componentDidMount() {
		this.props.users.show(this.props.users.id)
		.then((res) => {
			this.setState({user: res, refreshing: false});
		})
		.catch((errors) => {
			this.setState({errors: this.props.users.errors})
			this.setState({isModalVisible: true});
		})
	}

	onPressEdit() {
		console.log(this.state.user)
		this.props.users.update(this.state.user)
		.then(res => {
			console.log(res)
			console.log("saved!")
			this.setState({user: this.props.users.user});
			this.setState({success: this.props.users.success, errors: null})
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
			return (
					<Image
					source={ Thumbnails.avatar }
					style={ styles.profilePicture }
					/>
			);
		}
	}


	render () {

		return <View style={allStyles.containerNoPadding}>
				{
					this.state.refreshing ? <Loading /> : (
						<ScrollView
						showsVerticalScrollIndicator={false}
							ref={ref => {
							    this.scrollview_ref = ref;
							  }}>
						      <RefreshControl
					              refreshing={this.state.refreshing}
					              onRefresh={this._onRefresh}
					            />
						      <View style={allStyles.container}>
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
					</View>
				</ScrollView>
				)
				}
				<Modal isVisible={this.state.isModalVisible} 
			      coverScreen={false} 
			      backdropOpacity={0} 
			      onBackdropPress={() => this.props.navigation.navigate("Profile")} 
			      animationIn="slideInDown"
			      animationOut="slideOutUp"
			      style={[ allStyles.modal ]}>
			      <View style={[ allStyles.card, allStyles.modalView, allStyles.modalViewDanger ]}>
			        <Text style={ allStyles.modalTitle }>Oh no, something went wrong.</Text>
			        <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.whiteButton ]}>
			        	<Text>Go to Profile</Text>
			        </TouchableOpacity>
			        <TouchableOpacity onPress={() => this.props.navigation.dispatch(StackActions.pop(1))} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.clearButton ]}>
			        	<Text style={ allStyles.whiteText }>Go Back</Text>
			        </TouchableOpacity>
			      </View>
			    </Modal>
		</View>
	}
}
export default Customize;
