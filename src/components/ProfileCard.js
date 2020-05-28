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
import TabBarIcon from '../components/TabBarIcon';
import Icon from 'react-native-vector-icons/FontAwesome'

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

class ProfileCard extends React.Component {

	  state = {
	    progress: 60,
	    progressWithOnComplete: 0,
	    progressCustomized: 0,
	  }
	  
	imgPlaceholder = 'https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG?w=970&h=546&fit=crop&crop=faces&auto=format%2Ccompress&cs=srgb&q=70'
		
	render() {

		  const barWidth = Dimensions.get('screen').width/2 - 30;
		  const progressCustomStyles = {
				  backgroundColor: '#4d70bd', 
				  borderRadius: 50,
				  borderColor: '#fff',
		  };

		  let profileSocialBar = (isOwnProfile) => {
				return isOwnProfile ? (
						<View style={ styles.profileSocialBar }>
							<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.grayButton ]}
							 	onPress={() => this.props.navigation.navigate('Friends', {user_id: this.props.user.id})}>
								<Icon name="user" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
								<Text style={ allStyles.whiteText }>31 friends</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.blackButton ]}
			                	onPress={() => alert('view requests!')}>
								<Icon name="user-plus" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
								<Text style={ allStyles.whiteText }>View requests</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View style={ styles.profileSocialBar }>
							<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.grayButton ]}
							 	onPress={() => this.props.navigation.navigate('Friends', {user_id: this.props.user.id})}>
								<Icon name="user" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
								<Text style={ allStyles.whiteText }>31 mutuals</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.blackButton ]}
			                	onPress={() => alert('add friend!')}>
								<TabBarIcon name="md-add" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
								<Text style={ allStyles.whiteText }>Add friend</Text>
							</TouchableOpacity>
						</View>
							)
			}
		    
		return (this.props.user) ? (
				<View style={[ allStyles.card, styles.profileCard ]}>
					<View style={ styles.profileTopCard }>
						<View style={ styles.profilePictureContainer }>
							<Image
							source={{uri: this.imgPlaceholder}}
								style={ styles.profilePicture }
							/>
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
						{ this.props.isOwnProfile ? 
							<TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
								<TabBarIcon name="md-settings" style={styles.settingsButton}/>
							</TouchableOpacity> : null }
					</View>
					{
						profileSocialBar(this.props.isOwnProfile)
					}
			</View>
		) : null
	} 
}

export default ProfileCard;