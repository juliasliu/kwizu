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
	state= {
			
	}

	componentDidMount() {
		
	}

	render () {
		return (
			      <ScrollView
					ref={ref => {
					    this.scrollview_ref = ref;
					  }}>
				<View style={allStyles.container}>
				      <View style={[allStyles.card, allStyles.center]}>
						<Text style={allStyles.heading}>Privacy Policy</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							Section body text
						</Text>
						<Text style={allStyles.subheading}>I. Section 1</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							Section body text
						</Text>
				      </View>
				</View>
				</ScrollView>
		)
	}
}
export default Settings;
