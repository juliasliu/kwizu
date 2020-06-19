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
						<Text style={allStyles.heading}>Community Guidelines</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							Kwizu is a space meant to foster individuality, expression, and creativity.
							We achieve this through building a strong and empathetic community, without judgement 
							of each other as people. We champion freedom of speech and self-expression, while 
								respecting one another and following the law.
						</Text>
						<Text style={[allStyles.subheading, allStyles.center]}>I. Create content that you have the right to share.</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							You own the content that you create on this platform, whether that be pictures or words, so remember to post
							authentic content and make sure that you have the right to share it. Make sure that you have permission to use 
							downloaded content from the internet.
						</Text>
						<Text style={[allStyles.subheading, allStyles.center]}>II. Post content that is appropriate for a diverse audience.</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							Please only use pictures and words that are appropriate for general audiences. This means the 
							restriction of content that has components of violence, profanity, substances, sex, and nudity. 
							Mature content on the platform must be shared in a respectful and thoughtful manner and should 
							always be preceded with a warning. Offensive content will not be tolerated.
						</Text>
						<Text style={[allStyles.subheading, allStyles.center]}>III. Foster meaningful and genuine interactions.</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							Help us stay spam-free by not artificially collecting friends or posting repetitive content, 
							or repeatedly contacting people for commercial purposes without their consent. 
							Respect the personal spaces of other users and be honest with your identity and intentions on this platform.
						</Text>
						<Text style={[allStyles.subheading, allStyles.center]}>IV. Follow the law.</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							Our platform does not support terrorism, organized crime, or hate groups. 
							Offering sexual services, buying or selling firearms, alcohol, and tobacco products between private individuals, 
							and buying or selling illegal or prescription drugs are also not allowed. 
							We have zero tolerance when it comes to sharing sexual content involving minors or threatening to post intimate images of others.
						</Text>
						<Text style={[allStyles.subheading, allStyles.center]}>V. Respect and be thoughtful of members in the community.</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							Our platform revolves around each other, the community. Being mindful of others is of the utmost importance. 
							Do not post offensive content or make hurtful comments at other users. Help us maintain Kwizu as a safe space 
							for everyone to share their thoughts and express themselves in healthy and productive ways.
						</Text>
				      </View>
				</View>
			</ScrollView>
		)
	}
}
export default Settings;
