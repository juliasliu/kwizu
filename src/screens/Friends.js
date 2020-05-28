import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react' 
import Icon from 'react-native-vector-icons/FontAwesome'
import notifications from '../notifications'

import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';
import ProfileThumbnail from '../components/ProfileThumbnail';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @observer
class Friends extends React.Component {
	state = {
			refreshing: false,
	}
	
	_onRefresh = () => {
	    this.setState({refreshing: true});
	    this.componentDidMount();
	  }
	
	componentDidMount() {
	      this.setState({refreshing: false});
	}
	
	render () {
		return (
				<View style={allStyles.container}>
			      <ScrollView style={allStyles.container}
		      		refreshControl={
			              <RefreshControl
			              refreshing={this.state.refreshing}
			              onRefresh={this._onRefresh}
			            />
			          }>
				      <TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.facebookButton ]}
		                onPress={() => alert("")}>
						<Icon name="facebook" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Add from Facebook</Text>
					</TouchableOpacity>
			      	<View style={styles.friendsList}>
						<ProfileThumbnail navigation={this.props.navigation} style={[ styles.topProfileThumbnailCard ]} />
			      		<ProfileThumbnail navigation={this.props.navigation} style={[
			      			(this.props.index === 0) ? styles.topProfileThumbnailCard : styles.profileThumbnailCard, 
			      			(this.props.index === 5 - 1) ? styles.bottomProfileThumbnailCard : styles.profileThumbnailCard ]} />
			      		<ProfileThumbnail navigation={this.props.navigation} style={[
			      			(this.props.index === 0) ? styles.topProfileThumbnailCard : styles.profileThumbnailCard, 
			      			(this.props.index === 5 - 1) ? styles.bottomProfileThumbnailCard : styles.profileThumbnailCard ]} />
			      		<ProfileThumbnail navigation={this.props.navigation} style={[
			      			(this.props.index === 0) ? styles.topProfileThumbnailCard : styles.profileThumbnailCard, 
			      			(this.props.index === 5 - 1) ? styles.bottomProfileThumbnailCard : styles.profileThumbnailCard ]} />
			      		<ProfileThumbnail navigation={this.props.navigation} style={[ styles.bottomProfileThumbnailCard ]} />
					</View>
					</ScrollView>
				</View>
		)
	}
}
export default Friends;