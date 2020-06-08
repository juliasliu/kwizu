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

class ChatMessage extends React.Component {
	
	showPickedImage() {
		const { avatar_url } = this.props.user;

		if (avatar_url != null && avatar_url != undefined) {
			return (
					<Image
					source={{ uri: avatar_url }}
					style={[ styles.profilePicture, styles.chatMessagePicture ] }
					/>
			);
		} else {
			let imgPlaceholder = 'https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG?w=970&h=546&fit=crop&crop=faces&auto=format%2Ccompress&cs=srgb&q=70';
			return (
					<Image
					source={{uri: imgPlaceholder}}
					style={[ styles.profilePicture, styles.chatMessagePicture ] }
					/>
			);
		}
	}
		
	render() {
		return (
				<View style={{flex: 1}}>
				{
					// if you, float right
					this.props.message.user_id == this.props.logged_in_user_id ? (
						<View style={[styles.chatMessageContainer, styles.chatMessageContainerRight]}>
							<View style={[styles.profilePictureContainer, styles.chatMessagePictureContainer]}>
								{ this.showPickedImage() }
							</View>
							<View style={[styles.chatMessageDescriptionContainer, styles.chatMessageDescriptionContainerRight]}>
								<Text style={[styles.chatMessageDescription, styles.chatMessageDescriptionRight]}>
									{ this.props.message.text }
								</Text>
							</View>
						</View>
					) : (
						// if other user, float left
						<View style={[styles.chatMessageContainer]}>
							<View style={[styles.profilePictureContainer, styles.chatMessagePictureContainer]}>
								{ this.showPickedImage() }
							</View>
							<View style={[styles.chatMessageDescriptionContainer]}>
								<Text style={[styles.chatMessageDescription]}>
									{ this.props.message.text }
								</Text>
							</View>
						</View>	
					)
				}
				</View>
		)
	}
}

export default ChatMessage;