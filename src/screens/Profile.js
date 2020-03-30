import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react' 
import Icon from 'react-native-vector-icons/FontAwesome'
import notifications from '../notifications'

import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';
import allStyles from '../styles/AllScreens';
import styles from '../styles/MatchScreen';

@inject('users') @observer
class Profile extends React.Component {
	static navigationOptions = { 
		tabBarLabel: 'Profile', 
		tabBarIcon: ({ tintColor }) => (
				<Icon name="user" size={30} color={tintColor}/> 
		),
	};
	imgPlaceholder = 'https://cdn.pixabay.com/photo/2017/03/21/02/00/user-2160923_960_720.png'
		onPressLogout() {
		this.props.users.logout();
	}

	render () {
		return (
				<View style={allStyles.container}>
			      <ScrollView style={allStyles.container} contentContainerStyle={styles.contentContainer}>
				{
					this.props.users.name &&
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Image
					source={{uri: this.props.users.avatar ||
						this.imgPlaceholder}}
						style={{width: 100, height: 100, 
						borderRadius: 50,
						margin: 20, 
						resizeMode: 'cover'}}
					/>
					<Text style={{fontSize: 25}}>{this.props.users.name} </Text>
					</View> 
				}
				<Button onPress={this.onPressLogout.bind(this)} title="Logout" />
					</ScrollView>
				</View>
		)
	}
}
export default Profile;