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
			friends: [],
			isOwnProfile: false,
			refreshing: false,
	}
	
	_onRefresh = () => {
	    this.setState({refreshing: true});
	    this.componentDidMount();
	  }
	
	componentDidMount() {
		// get quiz and quizzing for this user: todo later
		const {user_id} = this.props.route.params;
		if (user_id == this.props.users.user.id) {
			this.setState({isOwnProfile: true})
		}
		this.props.users.show(user_id)
		.then((res) => {
			console.log("gotem")
			this.setState({friends: res.friends, refreshing: false});
		})
		.catch((error) => {
			console.log("and i oop")
			console.log(error);
		})
	}
	
	render () {
		
		let friendsArray = this.state.friends.map(( item, key ) => 
		{
			return item != undefined ? (
					<ProfileThumbnail navigation={this.props.navigation} 
					user={item} 
					key={key}
					style={[ (key === this.state.friends.length - 1) ? allStyles.bottomProfileThumbnailCard : null,
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
				      <TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.facebookButton ]}
		                onPress={() => alert("")}>
						<Icon name="facebook" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
						<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Add from Facebook</Text>
					</TouchableOpacity>
			      	<View style={styles.friendsList}>
						{
							this.state.friends.length > 0 ? friendsArray :
								(
										this.state.isOwnProfile ? (
													<View style={[ allStyles.section, allStyles.sectionClear ]}>
														<Text style={[ allStyles.sectionMessage ]}>No friends yet! Find people by taking more kwizzes or import your friends from Facebook!</Text>
													</View>
												) : (
													<View style={[ allStyles.section, allStyles.sectionClear ]}>
														<Text style={[ allStyles.sectionMessage ]}>This user has no friends yet. Be their first friend!</Text>
													</View>	
												)
								)
						}
					</View>
					</ScrollView>
				</View>
		)
	}
}
export default Friends;