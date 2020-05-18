import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react' 
import Icon from 'react-native-vector-icons/FontAwesome'
import notifications from '../notifications'

import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';
import ProfileThumbnail from '../components/ProfileThumbnail';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @observer
class Chats extends React.Component {
	render () {
		return (
				<View style={allStyles.container}>
			      <ScrollView style={allStyles.container}>
				      
					</ScrollView>
				</View>
		)
	}
}
export default Chats;