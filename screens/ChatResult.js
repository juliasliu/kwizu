import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from 'react-native-modal';
import { StackActions } from '@react-navigation/native';

import Loading from '../components/Loading';
import ProfileChatThumbnail from '../components/ProfileChatThumbnail';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @inject('chats') @observer
class ChatResult extends React.Component {
	
	state = {
			friends: [],
			selectedUsers: [],
			refreshing: true,
			isModalVisible: false,
	}

	_onRefresh = () => {
		this.setState({refreshing: true});
		this.componentDidMount();
	}

	componentDidMount() {
		this.props.users.show(this.props.users.id)
		.then((res) => {
			console.log("gotem")
			this.setState({friends: res.friends, refreshing: false});
		})
		.catch((errors) => {
			console.log("and i oop")
			console.log(errors);
			this.setState({isModalVisible: true});
		})
	}
	
	sendMessages() {
		for (var i = 0; i < this.state.selectedUsers.length; i++) {
			this.sendMessage(this.state.selectedUsers[i]);
		}
		this.props.navigation.dispatch(StackActions.pop(1))
	}

	sendMessage(user) {
		// if chat doesn't exist, create chat and then send
		this.props.chats.find(user.id)
		.then((res) => {
			// otherwise send message
			if (res.id) {
				console.log("got this chatty " + res.id)
				this.sendMessageHelper(res.id);
			} else {
				// open new channel
				let users = [user];
				this.props.chats.create(null, users)
				.then((res) => {
					console.log("created chatty chat")
					this.sendMessageHelper(res.id);
				})
				.catch((errors) => {
					console.log("and i oop")
					console.log(errors);
					this.setState({isModalVisible: true});
				})
			}
		})
		.catch((error) => {
			console.log("and i oop")
			console.log(error);
		})
	}
	
	sendMessageHelper(chat_id) {
		const {message} = this.props.route.params;
		this.props.chats.send(message, chat_id)
		.then((res) => {
			console.log("sent " + message)
		})
		.catch((errors) => {
			console.log(errors);
			this.setState({isModalVisible: true});
		})
	}
	
	selectUser(user) {
		// toggle the user in selectedUsers if not in there already
		var selectedUsers = [...this.state.selectedUsers]
		if (selectedUsers.findIndex(elem => elem.id === user.id) >= 0)
			selectedUsers.splice(selectedUsers.findIndex(elem => elem.id === user.id), 1);
		else
			selectedUsers = [...selectedUsers, user]

		this.setState({selectedUsers})
	}

	render () {

		let friendsArray = this.state.friends.map(( item, key ) =>
		{
			return item != undefined && (
					<ProfileChatThumbnail navigation={this.props.navigation}
					user={item}
					key={key}
					selectUser={this.selectUser.bind(this)}
					selectedUsers={this.state.selectedUsers}
					style={[ (key === this.state.friends.length - 1) ? allStyles.bottomProfileThumbnailCard : null,
							(key === 0) ? allStyles.topProfileThumbnailCard : null,
									]} />
			)
		})

		return (
				<View style={allStyles.container}>
				{
		      		this.state.refreshing ? <Loading /> : ( 
			      	<ScrollView style={allStyles.contentContainer}
			      		showsVerticalScrollIndicator={false}
			      		refreshControl={
				              <RefreshControl
				              refreshing={this.state.refreshing}
				              onRefresh={this._onRefresh}
				            />
				          }>
			      		{
							!this.state.searching && (
									<View style={[allStyles.section, allStyles.sectionClear]}>
							 		{
							 			this.state.friends.length > 0 ? friendsArray :
										(
											<View style={[ allStyles.section, allStyles.sectionClear ]}>
												<Text style={[ allStyles.sectionMessage ]}>No friends yet! Make a friend so you can send a message to them.</Text>
											</View>
										)
									}
									</View>
							)
				      	}
			      		<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.blackButton ]} onPress={this.sendMessages.bind(this)}>
							<Text style={ allStyles.whiteText }>Send!</Text>
						</TouchableOpacity>
					</ScrollView>
					)
		      	}
			      <Modal isVisible={this.state.isModalVisible} 
			      coverScreen={false} 
			      backdropOpacity={0} 
			      onBackdropPress={() => this.props.navigation.navigate("Profile")} 
			      animationIn="slideInDown"
			      animationOut="slideOutUp"
			      style={[ allStyles.modal ]}>
			      <View style={[ allStyles.card, allStyles.modalView, allStyles.modalViewDanger ]}>
			        <Text style={ allStyles.modalTitle }>Oh no, something went wrong.</Text>
			        <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.whiteButton ]}>
			        	<Text>Go to Profile</Text>
			        </TouchableOpacity>
			        <TouchableOpacity onPress={() => this.props.navigation.dispatch(StackActions.pop(1))} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.clearButton ]}>
			        	<Text style={ allStyles.whiteText }>Go Back</Text>
			        </TouchableOpacity>
			      </View>
			    </Modal>
			</View>
		)
	}
}
export default ChatResult;
