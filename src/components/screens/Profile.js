import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react' 
import Icon from 'react-native-vector-icons/FontAwesome'
import notifications from '../notifications'

import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';
import ProfileCard from '../components/ProfileCard';
import QuizResult from '../components/QuizResult';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @observer
class Profile extends React.Component {
	static navigationOptions = { 
		tabBarLabel: 'Profile', 
		tabBarIcon: ({ tintColor }) => (
				<Icon name="user" size={30} color={tintColor}/> 
		),
	};
	
	render () {
		return (
				<View style={allStyles.container}>
			      <ScrollView style={allStyles.container}>
						{
							this.props.users.id &&
							<ProfileCard users={this.props.users} navigation={this.props.navigation} />
						}
				      	<Text style={[ allStyles.sectionTitle, {marginTop: 20} ]}>Kwiz Feed</Text>
				      	<Text style={allStyles.sectionSubtitle}>First has taken these kwizzes. Result descriptions will only appear once you have taken the kwiz.</Text>
						<QuizResult navigation={this.props.navigation} />
						<QuizResult navigation={this.props.navigation} />
						<QuizResult navigation={this.props.navigation} />
					</ScrollView>
				</View>
		)
	}
}
export default Profile;