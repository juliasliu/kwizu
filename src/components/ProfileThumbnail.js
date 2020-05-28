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

class ProfileThumbnail extends React.Component {
	
	imgPlaceholder = 'https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG?w=970&h=546&fit=crop&crop=faces&auto=format%2Ccompress&cs=srgb&q=70'	
	
	render() {
		
		let navigateToProfile = () => {
			if (!this.props.isOwnProfile) this.props.navigation.navigate("Profile", {user_id: this.props.user.id})
		}
		
		return (
			<TouchableOpacity onPress={navigateToProfile}>
				<View style={[ allStyles.card, styles.profileCard, styles.profileThumbnailCard, this.props.style ]}>
					<View style={ styles.profileTopCard }>
						<View style={[ styles.profilePictureContainer, styles.profileThumbnailPictureContainer ] }>
							<Image
							source={{uri: this.imgPlaceholder}}
								style={[ styles.profilePicture, styles.profileThumbnailPicture ] }
							/>
						</View>
						<View style={[ styles.profileDescriptionContainer, styles.profileThumbnailDescriptionContainer ] }>
							<TouchableOpacity style={[ allStyles.clearButton ]}
		                		onPress={navigateToProfile}>
								<Text style={[ styles.profileName, styles.profileThumbnailName ]}>{ this.props.user.name }</Text>
							</TouchableOpacity>
							{
								this.props.isOwnProfile ? 
										(
											<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.whiteButton ]}>
												<TabBarIcon name="md-checkmark" style={[ allStyles.buttonIcon ]}/>
												<Text>Myself</Text>
											</TouchableOpacity>	
												)
												: (
													<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blackButton ]}
									                	onPress={() => alert('add friend!')}>
														<TabBarIcon name="md-add" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
														<Text style={ allStyles.whiteText }>Add friend</Text>
													</TouchableOpacity>				
												)
							}
							
						</View>
					</View>
			</View>
		</TouchableOpacity>
		)
	} 
}

export default ProfileThumbnail;