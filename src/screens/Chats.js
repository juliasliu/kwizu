import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react' 
import Icon from 'react-native-vector-icons/FontAwesome'
import notifications from '../notifications'

import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';
import ChatThumbnail from '../components/ChatThumbnail';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @observer
class Chats extends React.Component {
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
				      
			      	<View style={styles.friendsList}>
						<ChatThumbnail navigation={this.props.navigation} style={[styles.topChatThumbnailCard]} />
			      		<ChatThumbnail navigation={this.props.navigation} style={[
							(this.props.index === 0) ? styles.topChatThumbnailCard : styles.chatThumbnailCard, 
									(this.props.index === 5 - 1) ? styles.bottomChatThumbnailCard : styles.chatThumbnailCard ]} />
			      		<ChatThumbnail navigation={this.props.navigation} style={[
							(this.props.index === 0) ? styles.topChatThumbnailCard : styles.chatThumbnailCard, 
									(this.props.index === 5 - 1) ? styles.bottomChatThumbnailCard : styles.chatThumbnailCard ]} />
			      		<ChatThumbnail navigation={this.props.navigation} style={[
							(this.props.index === 0) ? styles.topChatThumbnailCard : styles.chatThumbnailCard, 
									(this.props.index === 5 - 1) ? styles.bottomChatThumbnailCard : styles.chatThumbnailCard ]} />
			      		<ChatThumbnail navigation={this.props.navigation} style={[ styles.bottomChatThumbnailCard ]} />
					</View>
					</ScrollView>
				</View>
		)
	}
}
export default Chats;