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

@inject('users') @inject('chats') @observer
class ProfileCard extends React.Component {

	state = {
			progress: 10,
			level: 1,
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

		// calculate progress bar and level
		// formula for max points MP given level L: MP = L*10 + 2^L
		let points = this.props.user.points;
		let level = 1;
		let maxPoints = level * 10 + Math.pow(2, level);
		while(points/parseFloat(maxPoints) > 1) {
			points -= maxPoints;
			level++;
			maxPoints = level * 10 + Math.pow(2, level);
		}
		this.setState({level: level, progress: points/parseFloat(maxPoints) * 100})
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

		  const barWidth = Dimensions.get('screen').width/2 - 40;
		  const progressCustomStyles = {
				  backgroundColor: '#77a0a9', 
				  borderRadius: 50,
				  borderColor: '#fff',
		  };
		  
		  let friendButton = () => {
				if (this.state.isOwnProfile) {
					return (
							<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.grayButton ]}
							 	onPress={() => this.props.navigation.push('Friends', {user_id: this.props.user.id})}>
								<Icon name="user" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
								<Text style={ allStyles.whiteText }>{this.props.user.friends.length} friends</Text>
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
							{
								this.state.busy ? <ActivityIndicator /> : friendButton()
							}
							<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.blackButton ]}
			                	onPress={() => this.props.navigation.push('Chats')}>
								<Icon name="comments" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
								<Text style={ allStyles.whiteText }>View chats</Text>
							</TouchableOpacity>
						</View>
					)
				} else {
					let navigateToChat = () => {
						this.props.chats.find(this.props.user.id)
						.then((res) => {
							console.log("got this chatty " + res.id)
							if (res.id) this.props.navigation.push("Chat", {chat_id: res.id})
							else this.props.navigation.push("Chat", {users: [this.props.user]})
						})
						.catch((error) => {
							console.log("and i oop")
							console.log(error);
						})
					}
					
					return (
						<View style={ styles.profileSocialBar }>
							{
								this.state.busy ? <ActivityIndicator /> : friendButton()
							}
							<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.blackButton ]}
			                	onPress={navigateToChat}>
								<Icon name="commenting" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
								<Text style={ allStyles.whiteText }>Chat</Text>
							</TouchableOpacity>
						</View>
					)
				}
			}
		    
		return this.props.user && (
				<View style={[ allStyles.card, styles.profileCard ]}>
					<View style={ styles.profileTopCard }>
						<View style={ styles.profilePictureContainer }>
							{this.showPickedImage()}
						</View>
						<View style={ styles.profileDescriptionContainer }>
							<Text style={ styles.profileName }>{this.props.user.name}</Text>
							<Text style={ styles.profileUsername }>@{this.props.user.username}</Text>
							<Text style={ styles.profileCaption }>{this.props.user.caption}</Text>
							<Text style={ styles.profileLevel }>Level {this.state.level}</Text>
							<View style={ styles.profileLevelBar }>
								<ProgressBarAnimated
					            	{...progressCustomStyles}
						            width={barWidth}
						            value={this.state.progress}
						          />
							</View>
						</View>
						{ 
							this.state.isOwnProfile && (
									<TouchableOpacity onPress={() => this.props.navigation.push('Customize')}>
										<TabBarIcon name="md-create" style={styles.customizeButton}/>
									</TouchableOpacity>
							)
						}
					</View>
					{
						profileSocialBar()
					}
			</View>
		)
	} 
}

export default ProfileCard;