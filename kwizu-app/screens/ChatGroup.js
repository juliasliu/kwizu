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
class ChatGroup extends React.Component {
	
	state = {
			friends: [],
			selectedUsers: [],
			searchKeyword: "",
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
	
	setSearchKeyword(searchKeyword) {
		this.setState({searchKeyword})
	}

	deleteSearchKeyword() {
		this.setState({searchKeyword: ""});
	}
	
	createGroupChat() {
		this.props.navigation.dispatch(StackActions.pop(1))
		this.props.navigation.push("Chat", {users: this.state.selectedUsers})
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
									 this.state.friends.length > 0 ? (
									 		<View style={[allStyles.section, allStyles.sectionClear]}>
									 		{
									 			friendsArray
									 		}
								 		<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.blackButton ]} onPress={this.createGroupChat.bind(this)}>
											<Text style={ allStyles.whiteText }>Create group chat</Text>
										</TouchableOpacity>
										</View>
								 	) : (
									<View style={[ allStyles.section, allStyles.sectionClear ]}>
										<Text style={[ allStyles.sectionMessage ]}>No friends yet! Make a friend so you can send a message to them.</Text>
									</View>
									)
								}
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
export default ChatGroup;
