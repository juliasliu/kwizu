import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import TabBarIcon from '../components/TabBarIcon';

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
			chats: [],
			selectedChats: [],
			searchKeyword: "",
			refreshing: true,
			isModalVisible: false,
	}

	_onRefresh = () => {
		this.setState({refreshing: true});
		this.componentDidMount();
	}

	componentDidMount() {
		this.props.chats.index()
		.then((res) => {
			console.log("got those chats")
			this.setState({chats: res});
			this.props.users.show(this.props.users.id)
			.then((res) => {
				console.log("gotem")
				this.setState({friends: res.friends, refreshing: false}, this.loadChats);
			})
			.catch((errors) => {
				console.log("and i oop")
				console.log(errors);
				this.setState({isModalVisible: true});
			})
		})
		.catch((errors) => {
			console.log("and i oop")
			console.log(errors);
			this.setState({isModalVisible: true});
		})
	}
	
	loadChats() {
		// if chat exists with this single user, remove from the friends array
		var friends = [...this.state.friends]
		for (var i = 0; i < this.state.chats.length; i++) {
			let chat = this.state.chats[i];
			if (chat.users.length == 2) {
				let indexOfUser = chat.users.findIndex(elem => elem.id !== this.props.users.id)
				let otherUser = chat.users[indexOfUser]
				let friendIndex = friends.findIndex(elem => elem.id == otherUser.id)
				if (friendIndex >= 0) {
					friends.splice(friendIndex, 1)
				}
			}
		}
		this.setState({friends})
	}
	
	setSearchKeyword(searchKeyword) {
		this.setState({searchKeyword})
	}

	deleteSearchKeyword() {
		this.setState({searchKeyword: ""});
	}
	
	getTitle(chat) {
		// if no chat title exists, make title of chat default string of users names besides yourself
		if (!chat.title) {
			let title = "";
			console.log(this.props.users.id)
			for (var i = 0; i < chat.users.length; i++) {
				if (chat.users[i].id != this.props.users.id) {
					title += chat.users[i].name + ", ";
				}
			}
			title = title.slice(0, title.length - 2);
			return title;
		}
		return chat.title;
	}
	
	getImage(chat) {
		var indexOfUser = chat.users.findIndex(elem => elem.id !== this.props.users.id);
		return chat.users[indexOfUser].avatar_url;
	}
	
	sendMessages() {
		for (var i = 0; i < this.state.selectedUsers.length; i++) {
			this.sendMessageToUser(this.state.selectedUsers[i]);
		}
		for (var i = 0; i < this.state.selectedChats.length; i++) {
			this.sendMessageToChat(this.state.selectedChats[i]);
		}
		this.props.navigation.dispatch(StackActions.pop(1))
	}

	sendMessageToUser(user) {
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
	
	sendMessageToChat(chat) {
		this.sendMessageHelper(chat.id);
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
	
	selectChat(chat) {
		// toggle the user in selectedUsers if not in there already
		var selectedChats = [...this.state.selectedChats]
		if (selectedChats.findIndex(elem => elem.id === chat.id) >= 0)
			selectedChats.splice(selectedChats.findIndex(elem => elem.id === chat.id), 1);
		else
			selectedChats = [...selectedChats, chat]

		this.setState({selectedChats})
	}

	render () {

		let chatsArray = this.state.chats.filter(elem => this.getTitle(elem).toLowerCase().includes(this.state.searchKeyword.toLowerCase()))
		chatsArray = chatsArray.map(( item, key ) =>
		{
			return item != undefined && (
					<ProfileChatThumbnail navigation={this.props.navigation}
					item={item}
					id={item.id}
					title={this.getTitle(item)}
					avatar_url={this.getImage(item)}
					key={key}
					select={this.selectChat.bind(this)}
					selected={this.state.selectedChats}
					style={[ (key === chatsArray.length - 1) ? allStyles.bottomProfileThumbnailCard : null,
							(key === 0) ? allStyles.topProfileThumbnailCard : null,
									]} />
			)
		})
		
		let friendsArray = this.state.friends.filter(elem => elem.name.toLowerCase().includes(this.state.searchKeyword.toLowerCase()) || elem.username.toLowerCase().includes(this.state.searchKeyword.toLowerCase()))
		friendsArray = friendsArray.map(( item, key ) =>
		{
			return item != undefined && (
					<ProfileChatThumbnail navigation={this.props.navigation}
					item={item}
					id={item.id}
					title={item.name}
					avatar_url={item.avatar_url}
					key={key}
					select={this.selectUser.bind(this)}
					selected={this.state.selectedUsers}
					style={[ (key === friendsArray.length - 1) ? allStyles.bottomProfileThumbnailCard : null,
							(key === 0) ? allStyles.topProfileThumbnailCard : null,
									]} />
			)
		})
		
		let searchInput = (
			<View style={[allStyles.searchInputContainer]}>
				<View style={[ allStyles.input, allStyles.searchInput ]}>
				  <Icon
				    name='search'
				    style={allStyles.searchIcon}
				  />
				  <TextInput
				  style={[ allStyles.searchInputText ]}
				  placeholder={'Search...'}
				  placeholderTextColor={'#8393a8'}
				  underlineColorAndroid={'#fff'}
				  autoCapitalize='none'
				  autoCorrect={false}
				  returnKeyType='search'
				  value={ this.state.searchKeyword }
				  onChangeText={(keyword) => this.setSearchKeyword(keyword)}
				  />
				  <TouchableOpacity onPress={this.deleteSearchKeyword.bind(this)}>
				      <TabBarIcon
				        name='md-close'
				        style={[allStyles.searchIcon, allStyles.searchDeleteIcon]}
				      />
				  </TouchableOpacity>
				</View>
			</View>	
		)

		return (
				<View style={allStyles.containerNoPadding}>
				{
		      		this.state.refreshing ? <Loading /> : ( 
			      	<ScrollView
			      		showsVerticalScrollIndicator={false}
			      		refreshControl={
				              <RefreshControl
				              refreshing={this.state.refreshing}
				              onRefresh={this._onRefresh}
				            />
				          }>
			      		<View style={allStyles.container}>
			      			{
								searchInput
							}
			      			{
			      				(this.state.chats.length == 0 && this.state.friends.length == 0) ? (
			      					<View style={[ allStyles.section, allStyles.sectionClear ]}>
		      							<Text style={[ allStyles.sectionMessage ]}>No chats yet! Make a friend so you can send a message to them.</Text>
		      						</View>	
			      				) : (
			      					<View style={allStyles.containerNoPadding}>
			      						<View style={[allStyles.section, allStyles.sectionClear]}>	
			      							{
			      								this.state.chats.length > 0 && (
			      										<Text style={allStyles.sectionSubtitle}>Your chats</Text>	
			      								)
			      							}
			      							{
			      								chatsArray
			      							}
			      						</View>
			      						<View style={[allStyles.section, allStyles.sectionClear]}>
				      						{
			      								this.state.friends.length > 0 && (
			      										<Text style={allStyles.sectionSubtitle}>Other friends</Text>	
			      								)
			      							}
						      				{
						      					friendsArray
						      				}
						      			</View>
						      		</View>
			      				)
			      			}
				      		<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.blackButton ]} onPress={this.sendMessages.bind(this)}>
								<Text style={ allStyles.whiteText }>Send!</Text>
							</TouchableOpacity>
						</View>
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
