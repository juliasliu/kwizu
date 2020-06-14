import React, { PropTypes } from 'react'
import {
	TextInput,
	Button,
	Text,
	View,
	Image,
	ActivityIndicator,
	TouchableOpacity,
	  Dimensions,
} from 'react-native';
import { observer, inject } from 'mobx-react' 
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import * as WebBrowser from 'expo-web-browser';
import TabBarIcon from '../components/TabBarIcon';

import Thumbnails from '../constants/Thumbnails';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @observer
class ProfileThumbnail extends React.Component {
	
	state = {
			isOwnProfile: false,
			sentRequest: false,
			receivedRequest: false,
			isFriends: false,
			busy: false,
	}
	
	componentDidMount() {
		let otherUserId = this.props.user.id;
		this.setState({ 
			isOwnProfile: this.props.users.id == otherUserId,
			isFriends: this.props.users.user.friends.filter(function(e) { return e.id === otherUserId; }).length > 0,
			sentRequest: this.props.users.user.friends_requested.filter(function(e) { return e.id === otherUserId; }).length > 0,
			receivedRequest: this.props.users.user.friends_received.filter(function(e) { return e.id === otherUserId; }).length > 0,
		});
	}
	
	showPickedImage() {
		const { avatar_url } = this.props.user;

		if (avatar_url != null && avatar_url != undefined) {
			return (
					<Image
					source={{ uri: avatar_url }}
					style={[ styles.profilePicture, styles.profileThumbnailPicture ] }
					/>
			);
		} else {
			return (
					<Image
					source={ Thumbnails.avatar }
					style={[ styles.profilePicture, styles.profileThumbnailPicture ] }
					/>
			);
		}
	}
	
	sendRequest() {
		this.setState({busy: true}, () => 
			this.props.users.sendRequest(this.props.user.id)
			.then(res => {
				console.log("sent request!")
				this.setState({ sentRequest: true, busy: false });
			})
			.catch(error => {
				console.log("failed");
				console.log(error);
			})
		)
	}
	
	undoRequest() {
		this.setState({busy: true}, () => 
			this.props.users.undoRequest(this.props.user.id)
			.then(res => {
				console.log("undo request!")
				this.setState({ sentRequest: false, busy: false });
			})
			.catch(error => {
				console.log("failed");
				console.log(error);
			})
		)
	}
	
	acceptRequest() {
		this.setState({busy: true}, () => 
			this.props.users.acceptRequest(this.props.user.id)
			.then(res => {
				console.log("accepted request!")
				this.setState({ isFriends: true, busy: false });
				this.props.users.addPoints(5)
				.then(res => {
					console.log("yay points!" + res)
				})
				.catch(error => {
					console.log("failed");
					console.log(error);
				});
			})
			.catch(error => {
				console.log("failed");
				console.log(error);
			})
		)
	}
		
	render() {
		
		let navigateToProfile = () => {
			if (!this.state.isOwnProfile) this.props.navigation.push("Profile", {user_id: this.props.user.id})
		}
		
		let friendButton = () => {
				if (this.state.isOwnProfile) {
					return (
							<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.whiteButton ]}>
							<TabBarIcon name="md-checkmark" style={[ allStyles.buttonIcon ]}/>
							<Text>Myself</Text>
							</TouchableOpacity>	
					)
				} else if (this.state.isFriends) {
					return (
							<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.whiteButton ]}>
							<TabBarIcon name="md-checkmark" style={[ allStyles.buttonIcon ]}/>
							<Text>Friends</Text>
							</TouchableOpacity>				
					)
				} else if (this.state.sentRequest) {
					return (
							<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.redButton ]}
							onPress={this.undoRequest.bind(this)}>
							<TabBarIcon name="md-close" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={ allStyles.whiteText }>Undo request</Text>
							</TouchableOpacity>				
					)
				} else if (this.state.receivedRequest) {
					return (
							<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.greenButton ]}
							onPress={this.acceptRequest.bind(this)}>
							<TabBarIcon name="md-add" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={ allStyles.whiteText }>Accept request</Text>
							</TouchableOpacity>				
					)
				} else {
					return (
							<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blackButton ]}
							onPress={this.sendRequest.bind(this)}>
							<TabBarIcon name="md-add" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={ allStyles.whiteText }>Add friend</Text>
							</TouchableOpacity>				
					)
				}
		}
		
		return (
			<TouchableOpacity onPress={navigateToProfile}>
				<View style={[ allStyles.card, styles.profileCard, styles.profileThumbnailCard, this.props.style ]}>
					<View style={ styles.profileTopCard }>
						<View style={[ styles.profilePictureContainer, styles.profileThumbnailPictureContainer ] }>
							{this.showPickedImage()}
						</View>
						<View style={[ styles.profileDescriptionContainer, styles.profileThumbnailDescriptionContainer ] }>
							<TouchableOpacity style={[ allStyles.clearButton ]}
		                		onPress={navigateToProfile}>
								<Text style={[ styles.profileName, styles.profileThumbnailName ]}>{ this.props.user.name }</Text>
							</TouchableOpacity>
							{
								this.state.busy ? <ActivityIndicator /> : friendButton()
							}
							
						</View>
					</View>
			</View>
		</TouchableOpacity>
		)
	} 
}

export default ProfileThumbnail;