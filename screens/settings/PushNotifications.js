import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text, Switch,
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
			isEnabled: false,
	}

	componentDidMount() {
		
	}
	
	setIsEnabled() {
		this.setState({isEnabled: !this.state.isEnabled})
	}

	render () {
		
		return (
			      <ScrollView
					ref={ref => {
					    this.scrollview_ref = ref;
					  }}>
				<View style={allStyles.container}>
				      <View style={[allStyles.section, allStyles.sectionClear]}>
					      <Switch
					        trackColor={{ false: "#767577", true: "#81b0ff" }}
					        thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
					        ios_backgroundColor="#3e3e3e"
					        onValueChange={this.setIsEnabled.bind(this)}
					        value={this.state.isEnabled}
					      />
					  </View>
				</View>
				</ScrollView>
		)
	}
}
export default Settings;
