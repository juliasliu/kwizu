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
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import * as WebBrowser from 'expo-web-browser';
import TabBarIcon from '../components/TabBarIcon';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

class ChatThumbnail extends React.Component {
	
	state = {
			title: "",
			lastMessage: {text: "Start a conversation!", user: {}},
	}
	
	componentDidMount() {
		if (this.props.chat.messages && this.props.chat.messages.length > 0) {
			// determine what the last message from this chat is; fix later
			this.setState({lastMessage: this.props.chat.messages[this.props.chat.messages.length - 1]});
			
			let lastMessageTime;
			// convert updated_at to a readable time format; todo later
			let timestamp = this.state.lastMessage.updated_at_localtime;
			
			// if in the same day, get the time
			if (true) {
				lastMessageTime = timestamp;
			}
			// if not same day, count number of days since
			else {
				lastMessageTime = this.state.lastMessage.updated_at_localtime;
			}
		}
		// if no chat title exists, make title of chat default string of users names besides yourself
		if (!this.props.chat.title) {
			let title = "";
			console.log(this.props.logged_in_user_id)
			for (var i = 0; i < this.props.chat.users.length; i++) {
				if (this.props.chat.users[i].id != this.props.logged_in_user_id) {
					title += this.props.chat.users[i].name + ", ";
				}
			}
			title = title.slice(0, title.length - 2);
			this.setState({title})
		} else {
			this.setState({title: this.props.chat.title})
		}
	}
	
	showPickedImage(message) {
		// get avatar of the other user
		var indexOfUser = this.props.chat.users.findIndex(elem => elem.id !== this.props.logged_in_user_id);
		const { avatar_url } = this.props.chat.users[indexOfUser];

		if (avatar_url != null && avatar_url != undefined) {
			return (
					<Image
					source={{ uri: avatar_url }}
					style={[ styles.profilePicture, styles.chatThumbnailPicture ] }
					/>
			);
		} else {
			let imgPlaceholder = 'https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG?w=970&h=546&fit=crop&crop=faces&auto=format%2Ccompress&cs=srgb&q=70';
			return (
					<Image
					source={{uri: imgPlaceholder}}
					style={[ styles.profilePicture, styles.chatThumbnailPicture ] }
					/>
			);
		}
	}
		
	render() {

		let navigateToChat = () => {
			if (this.props.chat.id) this.props.navigation.push("Chat", {chat_id: this.props.chat.id})
			else this.props.navigation.push("Chat", {users: this.props.chat.users})
		}
		
		return (
			<TouchableOpacity onPress={navigateToChat}>
				<View style={[ allStyles.card, styles.profileCard, styles.chatThumbnailCard, this.props.style ]}>
					<View style={ styles.profileTopCard }>
						<View style={[ styles.profilePictureContainer, styles.chatThumbnailPictureContainer ] }>
							{this.showPickedImage()}
						</View>
						<View style={[ styles.profileDescriptionContainer, styles.chatThumbnailDescriptionContainer ] }>
							<TouchableOpacity style={[ allStyles.clearButton ]}
		                		onPress={navigateToChat}>
								<Text style={[ styles.profileName, styles.chatThumbnailName ]}>{this.state.title}</Text>
							</TouchableOpacity>
							<View style={[ styles.profileCaption, styles.chatThumbnailCaption ]}>
								<Text style={ styles.chatThumbnailText } numberOfLines={1}>
									{
										this.state.lastMessage.user.id == this.props.logged_in_user_id ?
												(
													<Text>You: </Text>
												) : null
									}
									{this.state.lastMessage.text}
								</Text>
								<Text style={ styles.chatThumbnailTime }>{this.state.lastMessage.updated_at_localtime}</Text>
							</View>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	} 
}

export default ChatThumbnail;