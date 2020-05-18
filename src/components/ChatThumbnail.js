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
	
	imgPlaceholder = 'https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG?w=970&h=546&fit=crop&crop=faces&auto=format%2Ccompress&cs=srgb&q=70'	
	
	render() {
		return (
			<View style={[ allStyles.card, styles.profileCard, styles.chatThumbnailCard, this.props.style ]}>
				<View style={ styles.profileTopCard }>
					<View style={[ styles.profilePictureContainer, styles.chatThumbnailPictureContainer ] }>
						<Image
						source={{uri: this.imgPlaceholder}}
							style={[ styles.profilePicture, styles.chatThumbnailPicture ] }
						/>
					</View>
					<View style={[ styles.profileDescriptionContainer, styles.chatThumbnailDescriptionContainer ] }>
						<TouchableOpacity style={[ allStyles.clearButton ]}
	                		onPress={() => alert('add friend!')}>
							<Text style={[ styles.profileName, styles.chatThumbnailName ]}>First Last Name</Text>
						</TouchableOpacity>
						<View style={[ styles.profileCaption, styles.chatThumbnailCaption ]}>
							<Text style={ styles.chatThumbnailText } numberOfLines={1}>user caption lorem ipsum we love waffles hehehe 3 </Text>
							<Text style={ styles.chatThumbnailTime }>4:38 pm </Text>
						</View>
					</View>
				</View>
		</View>
		)
	} 
}

export default ChatThumbnail;