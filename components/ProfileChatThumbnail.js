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
import CheckBox from 'react-native-check-box'
import TabBarIcon from '../components/TabBarIcon';

import Thumbnails from '../constants/Thumbnails';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

class ProfileChatThumbnail extends React.Component {
	
	showPickedImage() {
		// get avatar of the other user
		const { avatar_url } = this.props.user;

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
	
	getSelectedChoiceStyle = (isChecked) => {
		return isChecked ? '#77A0A9' : "#fff"
	}
		
	render() {

		let selectUser = () => {
			this.props.selectUser(this.props.user);
		}
		
		// isChecked is true if there is a user in this.props.selectUsers with the same id
		let isChecked = this.props.selectedUsers.findIndex(elem => elem.id === this.props.user.id) != -1;
		
		return (
			<TouchableOpacity onPress={selectUser}>
				<View style={[ allStyles.card, styles.profileCard, styles.chatThumbnailCard, this.props.style ]}>
					<View style={ styles.profileTopCard }>
						<View style={[ styles.profilePictureContainer, styles.chatThumbnailPictureContainer ] }>
							{this.showPickedImage()}
						</View>
						<View style={[ styles.profileDescriptionContainer, styles.chatThumbnailDescriptionContainer, styles.profileChatThumbnailDescriptionContainer ] }>
							<Text style={[ styles.profileName, styles.chatThumbnailName ]} numberOfLines={1}>{this.props.user.name}</Text>
							<View style={[ styles.profileCaption, styles.chatThumbnailCaption, styles.profileChatThumbnailCheckbox ]}>
								<CheckBox
									onClick={() => this.setSelectedChoiceValue(item.weight, item.id)}
									checkBoxColor= {this.getSelectedChoiceStyle(isChecked)}
									isChecked={isChecked}
								/>
							</View>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	} 
}

export default ProfileChatThumbnail;