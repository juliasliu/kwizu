import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import {
	TextInput,
	Button,
	Text,
	View,
	Image,
	ActivityIndicator,
	TouchableOpacity,
	  Dimensions,
	  Clipboard,
	  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import TabBarIcon from '../components/TabBarIcon';

import { APP_ROOT } from '../constants';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

@inject('chats') @observer
class ShareForm extends React.Component {
		
	state = {
			copyMessage: "Copy",
	}
	
	sendChat() {
		let url = "kwizu://";
		if (this.props.user) {
			url += "quizzings/" + this.props.quiz.id + "/" + this.props.user.id;
		} else {
			url += "kwizu://quizzes/" + this.props.quiz.id;
		}
		this.props.navigation.push("Chat Result", {message: url});
	}
	
	render() {
		// determine url based on whether you are sharing the quiz or the result
		let message = "Hey! Check out this app: ";
		let url = APP_ROOT;
//		if (this.props.user) {
//			message = 'Hey! Check out this kwiz I took: ';
//			url += "/quizzings/" + this.props.quiz.id + "/" + this.props.user.id;
//		} else {
//			message = 'Hey! Check out this kwiz: ';
//			url += "/quizzes/" + this.props.quiz.id;
//		}
		
		writeToClipboard = async () => {
			await Clipboard.setString(url);
			this.setState({copyMessage: "Copied"});
		};

		let shareToMedia = async () => {
			const result = await Share.share({
				title: "Kwizu",
				message: message,
				url: url,
			}, {
				// Android only:
				dialogTitle: 'Kwizu',
				// iOS only:
				excludedActivityTypes: [
//					'com.apple.UIKit.activity.PostToTwitter'
					]
			})

			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
					console.log(result.activityType)
				} else {
					// shared
					console.log("wot")
				}
				// boost profile level points
			} else if (result.action === Share.dismissedAction) {
				// dismissed
				console.log("nvm")
			}
		}

		return (
				<View style={[ allStyles.section, allStyles.sectionClear ]}>
					<View style={[ styles.quizFormHeader, styles.shareFormHeader ]}>
						<Text style={[ styles.quizFormNumber, allStyles.whiteText ]}>Share the link</Text>
					</View>
					<View style={[ allStyles.card, styles.shareLinkCard, styles.shareButton, styles.topShareButton, { height: 'auto' } ]}>
						<Text style={styles.shareLink} numberOfLines={1}>{APP_ROOT}</Text>
						<TouchableOpacity style={[ allStyles.button, allStyles.whiteButton ]}
			                onPress={writeToClipboard}>
							<TabBarIcon name="md-copy" style={[ allStyles.buttonIcon ]}/>
							<Text>{this.state.copyMessage}</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton, styles.shareButton ]}
		                onPress={this.sendChat.bind(this)}>
						<TabBarIcon name="md-chatbubbles" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={[ allStyles.whiteText ]}>Send to friends in chat</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blackButton, styles.shareButton, styles.bottomShareButton ]}
		                onPress={shareToMedia}>
						<TabBarIcon name="md-share" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={[ allStyles.whiteText ]}>Share the app on social media</Text>
					</TouchableOpacity>
				</View>
		)
	} 
}

export default ShareForm;