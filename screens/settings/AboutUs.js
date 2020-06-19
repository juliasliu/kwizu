import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text,
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
							<Text style={allStyles.heading}>Kwizu</Text>
							<Text style={allStyles.subheading}>Quizzes + You</Text>
							<Text style={[allStyles.text, allStyles.center]}>
								A refreshing twist on the classic personality tests is brought to you by 
								many nights of caffeine and creative adrenaline.
								Here we celebrate individuality and relish the journey of 
								digging deeper to find out who you are, all the while sprinkling in some fun and pizzazz.
								Our content is made to be taken lightheartedly and deliciously––share the joy 
								with your friends, or even make new ones! We hope that you have smiled and laughed while 
								taking our quizzes. 😍
							</Text>
							<Text style={allStyles.subheading}>Contact</Text>
							<Text style={[allStyles.text, allStyles.center]}>
								We would love to hear from you! If you have any feedback on your experience using our app, 
								please feel free to shoot us an email at <Text style={allStyles.link}>kwizu.app@gmail.com</Text>.
							</Text>
							<Text style={[allStyles.text, allStyles.center]}>
								Lastly, visit us on the <Text style={allStyles.link}>App Store</Text> and give us 5 stars if 
								you enjoyed using our platform! It would really mean the world to us. 💖
							</Text>
				        </View>
				</View>
			</ScrollView>
		)
	}
}
export default Settings;
