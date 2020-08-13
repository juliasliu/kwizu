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
	}
	
	componentDidMount() {
		let otherUserId = this.props.user.id;
		this.setState({ 
			isOwnProfile: this.props.users.id == otherUserId,
		});
	}
	
	showPickedImage() {
		const { avatar_url } = this.props.user;

		if (avatar_url != null && avatar_url != undefined) {
			return (
					<Image
					source={{ uri: avatar_url }}
					style={[ styles.profilePicture, styles.profileResultPicture ] }
					/>
			);
		} else {
			return (
					<Image
					source={ Thumbnails.avatar }
					style={[ styles.profilePicture, styles.profileResultPicture ] }
					/>
			);
		}
	}
		
	render() {
		
		let navigateToProfile = () => {
			if (!this.state.isOwnProfile) this.props.navigation.push("Kwiz Result", {quiz_id: this.props.quiz.id, user_id: this.props.user.id})
		}
		
		return (
			<TouchableOpacity onPress={navigateToProfile}>
				<View style={[ allStyles.card, styles.profileCard, styles.profileThumbnailCard, this.props.style ]}>
					<View style={ styles.profileTopCard }>
						<View style={[ styles.profilePictureContainer, styles.profileThumbnailPictureContainer ] }>
							{this.showPickedImage()}
						</View>
						<View style={[ styles.profileDescriptionContainer, styles.profileThumbnailDescriptionContainer, styles.profileResultDescriptionContainer ] }>
							<TouchableOpacity style={[ allStyles.clearButton ]}
		                		onPress={navigateToProfile}>
								<Text style={[ styles.profileName, styles.profileThumbnailName ]}>{ this.props.user.name }</Text>
							</TouchableOpacity>
						</View>
					</View>
			</View>
		</TouchableOpacity>
		)
	} 
}

export default ProfileThumbnail;