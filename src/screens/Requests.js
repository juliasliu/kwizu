import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react' 
import Icon from 'react-native-vector-icons/FontAwesome'
import notifications from '../notifications'

import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { TabView, SceneMap } from 'react-native-tab-view';

import { MonoText } from '../components/StyledText';
import ProfileThumbnail from '../components/ProfileThumbnail';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @observer
class Requests extends React.Component {
	state = {
			friends_requested: [],
			friends_received: [],
			refreshing: false,
	}
	
	_onRefresh = () => {
	    this.setState({refreshing: true});
	    this.componentDidMount();
	  }
	
	componentDidMount() {
		// get quiz and quizzing for this user: todo later
		const {user_id} = this.props.route.params;
		this.props.users.show(user_id)
		.then((res) => {
			console.log("gotem")
			this.setState({friends_requested: res.friends_requested, friends_received: res.friends_received, refreshing: false});
		})
		.catch((error) => {
			console.log("and i oop")
			console.log(error);
		})
	}
	
	render () {
		
		console.log("hello")
		console.log(this.state.friends_received)
		console.log("bye")
		let friendsArray = this.state.friends_received.map(( item, key ) => 
		{
			return item != undefined ? (
					<ProfileThumbnail navigation={this.props.navigation} 
					user={item} 
					key={key}
					style={[ (key === this.state.friends_received.length - 1) ? allStyles.bottomProfileThumbnailCard : null,
							 (key === 0) ? allStyles.topProfileThumbnailCard : null,
						]} />
			) : null
		})	
		
		return (
				<View style={allStyles.container}>
			      <ScrollView style={allStyles.container}
		      		refreshControl={
			              <RefreshControl
			              refreshing={this.state.refreshing}
			              onRefresh={this._onRefresh}
			            />
			          }>
			      	<View style={styles.friendsList}>
						{
							this.state.friends_received.length > 0 ? friendsArray :
								(
										<View style={[ allStyles.section ]}>
											<Text style={[ allStyles.sectionMessage ]}>No friend requests! You're all caught up.</Text>
										</View>
								)
						}
					</View>
					</ScrollView>
				</View>
		)
	}
}
export default Requests;