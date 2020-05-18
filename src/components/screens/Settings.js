import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react' 
import Icon from 'react-native-vector-icons/FontAwesome'
import notifications from '../notifications'

import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @observer
class Settings extends React.Component {
	static navigationOptions = { 
		tabBarLabel: 'Profile', 
		tabBarIcon: ({ tintColor }) => (
				<Icon name="user" size={30} color={tintColor}/> 
		),
	};
	onPressLogout() {
		this.props.users.logout();
	}

	render () {
		return (
				<View style={allStyles.container}>
			      <ScrollView style={allStyles.container} contentContainerStyle={allStyles.contentContainer}>
						<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.redButton ]} onPress={this.onPressLogout.bind(this)} title="Logout">
							<Text style={ allStyles.whiteText }>Log Out</Text>
						</TouchableOpacity>
					</ScrollView>
				</View>
		)
	}
}
export default Settings;