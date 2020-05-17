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
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import TabBarIcon from '../components/TabBarIcon';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

class ShareForm extends React.Component {
		
	render() {
		return (
			<View>
				<View style={styles.shareSection}>
					<View style={[ styles.quizFormHeader, styles.questionHeader ]}>
						<Text style={[ styles.quizFormNumber, allStyles.whiteText ]}>Share the link</Text>
					</View>
					<View style={[ allStyles.card, styles.shareLinkCard ]}>
						<Text style={styles.shareLink}>https:kwizu.app/aksdfja134</Text>
						<TouchableOpacity style={[ allStyles.button, allStyles.whiteButton ]}
			                onPress={() => alert("")}>
							<TabBarIcon name="md-copy" style={[ allStyles.buttonIcon ]}/>
							<Text>Copy</Text>
						</TouchableOpacity>
					</View>
				</View>
					
				<View style={styles.shareSection}>
					<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blackButton, styles.shareButton, styles.topShareButton ]}
		                onPress={() => alert("")}>
						<TabBarIcon name="md-chatbubbles" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Send to friends via chat</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.facebookButton, styles.shareButton ]}
		                onPress={() => alert("")}>
						<Icon name="facebook" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Share on Facebook</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.messengerButton, styles.shareButton ]}
		                onPress={() => alert("")}>
						<Icon5 name="facebook-messenger" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Send via Messenger</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.snapchatButton, styles.shareButton ]}
		                onPress={() => alert("")}>
						<Icon5 name="snapchat-ghost" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Share on Snapchat</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.whatsappButton, styles.shareButton ]}
			            onPress={() => alert("")}>
						<Icon name="whatsapp" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Share on WhatsApp</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.instagramButton, styles.shareButton ]}
				        onPress={() => alert("")}>
						<Icon name="instagram" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Share on Instagram</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.twitterButton, styles.shareButton, styles.bottomShareButton ]}
				        onPress={() => alert("")}>
						<Icon name="twitter" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Share on Twitter</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	} 
}

export default ShareForm;