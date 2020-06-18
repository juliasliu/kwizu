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

import Thumbnails from '../constants/Thumbnails';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

class ChatThumbnail extends React.Component {
	
	state = {
			lastMessage: {text: "", user: {}},
			lastMessageTime: "",
	}
	
	componentDidMount() {
		if (this.props.chat.messages && this.props.chat.messages.length > 0) {
			let sortedMessages = this.props.chat.messages.sort(function (a, b) {
			    return ('' + a.attr).localeCompare(b.attr);
			})
			console.log(sortedMessages[this.props.chat.messages.length - 1])
			// determine what the last message from this chat is; fix later
			this.setState({lastMessage: sortedMessages[this.props.chat.messages.length - 1]}, this.showLastMessageTime);
		}
	}
	
	showLastMessageTime() {
		// 2020-06-16T19:38:27.257-07:00
		const regex = /(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)\.(\d+)(.*)/
		let matches = this.state.lastMessage.updated_at.match(regex);
		let [date, year, month, day, hours, minutes, seconds, milliseconds, timezone] = matches;
		let timestamp = new Date(year, month-1, day, hours, minutes, seconds, milliseconds);
		let today = new Date();
		console.log(year + ", " + month + ", " + day + ", " + milliseconds)
		console.log(timestamp)
		console.log(today)
		
		let lastMessageTime;
		// if in the same day, get the time
		let numDaysSince = Math.round((today.getTime() - timestamp.getTime()) / (1000 * 3600 * 24));
		matches = this.state.lastMessage.updated_at_localtime.match(regex);
		[date, year, month, day, hours, minutes, seconds, milliseconds, timezone] = matches
		if (numDaysSince < 1) {
			if (hours % 12 == 0) lastMessageTime = 12 + ":" + minutes;
			else lastMessageTime = hours % 12 + ":" + minutes;
			if (hours / 12.0 > 1) {
				lastMessageTime += " pm"
			} else {
				lastMessageTime += " am"
			}
		}
		// if not same day, get the date
		else {
			lastMessageTime = month + "/" + day + "/" + (year % 1000);
		}
		this.setState({lastMessageTime})
	}
	
	showPickedImage() {
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
			return (
					<Image
					source={ Thumbnails.avatar }
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
							<Text style={[ styles.profileName, styles.chatThumbnailName ]}>{this.props.title}</Text>
							<View style={[ styles.profileCaption, styles.chatThumbnailCaption ]}>
								<Text style={ styles.chatThumbnailText } numberOfLines={1}>
									{
										this.state.lastMessage.user.id == this.props.logged_in_user_id &&
												(
													<Text>You: </Text>
												)
									}
									{this.state.lastMessage.text}
								</Text>
								<Text style={ styles.chatThumbnailTime }>{this.state.lastMessageTime}</Text>
							</View>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	} 
}

export default ChatThumbnail;