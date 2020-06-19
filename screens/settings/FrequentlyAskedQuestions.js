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
						<Text style={[allStyles.subheading, allStyles.center]}>II. How do I edit my kwiz drafts?</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							Under your profile section, you can see the kwiz you created. Drafts will appear with a darker
							background image overlay and you are the only one who can view them, 
							while published kwizzes are public to everyone.
						</Text>
						<Text style={[allStyles.subheading, allStyles.center]}>III. How do I share my kwiz results with a link?</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							You can share your result with your friends or on social media. The link that you 
							share with them will redirect them to the App Store if the mobile app is not downloaded 
							but will otherwise direct them to the corresponding kwiz result page in the mobile app.
						</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							Your friends will see a separate page 
							from the one you see for your own kwiz results––they will only see the result you got but not 
							the responses to each question.
						</Text>
						<Text style={[allStyles.subheading, allStyles.center]}>IV. How do I make my kwiz private after publishing it?</Text>
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
