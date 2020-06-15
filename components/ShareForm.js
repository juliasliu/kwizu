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
	  Clipboard,
	  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import TabBarIcon from '../components/TabBarIcon';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

class ShareForm extends React.Component {
		
	state = {
			copyMessage: "Copy",
	}
	
	render() {
		let url = "kwizu://quizzes/";

		writeToClipboard = async () => {
			await Clipboard.setString(url + this.props.quiz.id);
			this.setState({copyMessage: "Copied"});
		};

		let shareToMedia = async () => {
			const result = await Share.share({
				message: 'Hey! Check out this kwiz:',
				url: url + this.props.quiz.id,
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
			<View>
				<View style={[ allStyles.section, allStyles.sectionClear ]}>
					<View style={[ styles.quizFormHeader, styles.shareFormHeader ]}>
						<Text style={[ styles.quizFormNumber, allStyles.whiteText ]}>Share the link</Text>
					</View>
					<View style={[ allStyles.card, styles.shareLinkCard, styles.shareButton, styles.topShareButton, { height: 'auto' } ]}>
						<Text style={styles.shareLink}>{url}{this.props.quiz.id}</Text>
						<TouchableOpacity style={[ allStyles.button, allStyles.whiteButton ]}
			                onPress={writeToClipboard}>
							<TabBarIcon name="md-copy" style={[ allStyles.buttonIcon ]}/>
							<Text>{this.state.copyMessage}</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton, styles.shareButton ]}
		                onPress={() => alert("")}>
						<TabBarIcon name="md-chatbubbles" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Send to friends in chat</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blackButton, styles.shareButton, styles.bottomShareButton ]}
		                onPress={shareToMedia}>
						<TabBarIcon name="md-share" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Share on social media</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	} 
}

export default ShareForm;