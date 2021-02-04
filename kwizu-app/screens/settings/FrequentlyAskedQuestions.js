import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text, Linking,
	ActivityIndicator, TouchableOpacity, View, Button, TextInput, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import ImagePicker from 'react-native-image-picker';

import TabBarIcon from '../../components/TabBarIcon';

import allStyles from '../../styles/AllScreens';
import styles from '../../styles/ProfileScreen';

@inject('users') @observer
class Settings extends React.Component {

	render () {
		return (
			<ScrollView
					ref={ref => {
					    this.scrollview_ref = ref;
					  }}>
				<View style={allStyles.container}>
				      <View style={[allStyles.card, allStyles.center]}>
						<Text style={allStyles.heading}>Frequently Asked Questions</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							If you have additional questions, please visit and submit a ticket at the 
							<Text style={[allStyles.link]} onPress={() => this.props.navigation.push("Help Center")}> Help Center</Text>.
						</Text>
						<Text style={[allStyles.subheading, allStyles.center]}>I. How can I view my kwiz results?</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							When you click on a kwiz, it will show your responses and the result that you got.
							You can choose to retake the kwiz, although we think your first take is the most authentic ;), 
							and only your last take will be saved.
						</Text>
						<Text style={[allStyles.subheading, allStyles.center]}>II. Who can I see on the kwiz leaderboard?</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							If you are the creator of the quiz, you can see the results of everyone who took the quiz. 
							Otherwise, you can only see the results of your friends, which you can click to view a more detailed 
							breakdown. You must have taken the quiz yourself in order to unlock the leaderboard.
						</Text>
						<Text style={[allStyles.subheading, allStyles.center]}>III. How do I share my kwiz results?</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							You can share your result with your friends via the in-app chat or on social media. 
							Your friends will see a separate page from the one you see for your own kwiz results––
							they will only see the result you got but not the responses to each question.
						</Text>
						<Text style={[allStyles.subheading, allStyles.center]}>IV. How can I message someone in chats?</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							You can send someone a message directly by chatting them using the "Chat" button on 
							their profile card. You can also create group chats by using the "+" button on the top right of the chats page. 
							Note that you must be friends with the person in order to be able to chat them; otherwise,
							the button will be disabled.
						</Text>
						<Text style={[allStyles.subheading, allStyles.center]}>IV. Someone just sent me a kwiz or kwiz result in chat. How do I view it?</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							The message will appear as green, indicating that you can click on it to 
							reveal a preview of the kwiz or kwiz result that the person sent. Click on the preview again 
							to be redirected to a full page view of the corresponding kwiz or kwiz result.
						</Text>
						<Text style={[allStyles.subheading, allStyles.center]}>V. How do I edit my kwiz drafts?</Text>
							<Text style={[allStyles.text, allStyles.center]}>
								Under your profile section, you can see the kwiz you created. Drafts will appear with a darker
								background image overlay and you are the only one who can view them, 
								while published kwizzes are public to everyone.
								</Text>
						<Text style={[allStyles.subheading, allStyles.center]}>VI. How do I make my kwiz private after publishing it?</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							Unfortunately, there is no feature yet that enables you to restrict the view options of your kwiz 
							after you publish it. If there are any features that you really want to be implemented, let us know!
						</Text>
				      </View>
				</View>
			</ScrollView>
		)
	}
}
export default Settings;
