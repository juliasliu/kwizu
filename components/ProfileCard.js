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
import { observer, inject } from 'mobx-react';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import TabBarIcon from '../components/TabBarIcon';
import Icon from 'react-native-vector-icons/FontAwesome'

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @observer
class ProfileCard extends React.Component {

	  state = {
			    progress: 60,
			    progressWithOnComplete: 0,
			    progressCustomized: 0,
			    isOwnProfile: false,
				sentRequest: false,
				receivedRequest: false,
				isFriends: false,
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
	  
	sendRequest() {
		this.props.users.sendRequest(this.props.user.id)
		.then(res => {
			console.log("sent request!")
			this.setState({ sentRequest: true });
		})
		.catch(error => {
			console.log("failed");
			console.log(error);
		})
	}
	
	undoRequest() {
		this.props.users.undoRequest(this.props.user.id)
		.then(res => {
			console.log("undo request!")
			this.setState({ sentRequest: false });
		})
		.catch(error => {
			console.log("failed");
			console.log(error);
		})
	}
	
	acceptRequest() {
		this.props.users.acceptRequest(this.props.user.id)
		.then(res => {
			console.log("accepted request!")
			this.setState({ isFriends: true });
		})
		.catch(error => {
			console.log("failed");
			console.log(error);
		})
	}
	
	showPickedImage() {
		const { avatar_url } = this.props.user;

		if (avatar_url != null && avatar_url != undefined) {
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
		
	render() {

		  const barWidth = Dimensions.get('screen').width/2 - 30;
		  const progressCustomStyles = {
				  backgroundColor: '#4d70bd', 
				  borderRadius: 50,
				  borderColor: '#fff',
		  };
		  
		  let friendButton = () => {
				if (this.state.OwnProfile) {
					return (
							<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.whiteButton ]}>
							<TabBarIcon name="md-checkmark" style={[ allStyles.buttonIcon ]}/>
							<Text>Myself</Text>
							</TouchableOpacity>	
					)
				} else if (this.state.isFriends) {
					return (
							<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.whiteButton ]}>
							<TabBarIcon name="md-checkmark" style={[ allStyles.buttonIcon ]}/>
							<Text>Friends</Text>
							</TouchableOpacity>				
					)
				} else if (this.state.sentRequest) {
					return (
							<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.redButton ]}
							onPress={this.undoRequest.bind(this)}>
							<TabBarIcon name="md-close" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={ allStyles.whiteText }>Undo request</Text>
							</TouchableOpacity>				
					)
				} else if (this.state.receivedRequest) {
					return (
							<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.greenButton ]}
							onPress={this.acceptRequest.bind(this)}>
							<TabBarIcon name="md-add" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={ allStyles.whiteText }>Accept request</Text>
							</TouchableOpacity>				
					)
				} else {
					return (
							<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.blackButton ]}
							onPress={this.sendRequest.bind(this)}>
							<TabBarIcon name="md-add" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={ allStyles.whiteText }>Add friend</Text>
							</TouchableOpacity>				
					)
				}
		}

		  let profileSocialBar = () => {
				if (this.state.isOwnProfile) {
					return (
						<View style={ styles.profileSocialBar }>
							<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.grayButton ]}
							 	onPress={() => this.props.navigation.push('Friends', {user_id: this.props.user.id})}>
								<Icon name="user" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
								<Text style={ allStyles.whiteText }>{this.props.user.friends.length} friends</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.blackButton ]}
			                	onPress={() => this.props.navigation.push('Requests', {user_id: this.props.user.id})}>
								<Icon name="user-plus" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
								<Text style={ allStyles.whiteText }>View requests</Text>
							</TouchableOpacity>
						</View>
					)
				} else {
					return (
						<View style={ styles.profileSocialBar }>
							<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.grayButton ]}
							 	onPress={() => this.props.navigation.push('Friends', {user_id: this.props.user.id})}>
								<Icon name="user" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
								<Text style={ allStyles.whiteText }>{this.props.user.friends.length} friends</Text>
							</TouchableOpacity>
							{
								friendButton()
							}
						</View>
					)
				}
			}
		    
		return (this.props.user) ? (
				<View style={[ allStyles.card, styles.profileCard ]}>
					<View style={ styles.profileTopCard }>
						<View style={ styles.profilePictureContainer }>
							{this.showPickedImage()}
						</View>
						<View style={ styles.profileDescriptionContainer }>
							<Text style={ styles.profileName }>{this.props.user.name}</Text>
							<Text style={ styles.profileUsername }>@{this.props.user.username}</Text>
							<Text style={ styles.profileCaption }>{this.props.user.caption}</Text>
							<Text style={ styles.profileLevel }>Level 12</Text>
							<View style={ styles.profileLevelBar }>
								<ProgressBarAnimated
					            	{...progressCustomStyles}
						            width={barWidth}
						            value={this.state.progress}
						          />
							</View>
						</View>
						{ this.state.isOwnProfile ? 
							<TouchableOpacity onPress={() => this.props.navigation.push('Settings')}>
								<TabBarIcon name="md-settings" style={styles.settingsButton}/>
							</TouchableOpacity> : null }
					</View>
					{
						profileSocialBar()
					}
			</View>
		) : null
	} 
}

export default ProfileCard;