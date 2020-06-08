import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import TabBarIcon from '../components/TabBarIcon';

import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';
import ChatThumbnail from '../components/ChatThumbnail';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @inject('chats') @observer
class Chats extends React.Component {
	state = {
			chats: [],
			friendResults: [],
			searchKeyword: "",
			searching: false,
			refreshing: false,
	}

	_onRefresh = () => {
		this.setState({refreshing: true});
		this.componentDidMount();
	}

	componentDidMount() {
		this.props.chats.index()
		.then((res) => {
			console.log("got those chats")
			this.setState({chats: res, refreshing: false});
		})
		.catch((error) => {
			console.log("and i oop")
			console.log(error);
		})
	}

	searchSubmit() {
		if (this.state.searchKeyword == "") {
			this.setState({refreshing: false});
			return;
		}
		this.props.users.search(this.state.searchKeyword)
		.then((res) => {
			var results = res;
			var friendResults = []
			// convert into chat thumbnail item
			for (var i = 0; i < results.length; i++) {
				// dont add yourself
				if (results[i].id != this.props.users.id) {
					// if have a chat with this friend already, get actual chat; todo later
					var chat;
					chat = {
							title: results[i].name,
							users: [results[i]],
					}
					friendResults.push(chat);
				}
			}
			this.setState({friendResults})
			this.setState({searching: true, refreshing: false});
		})
		.catch((error) => {
			console.log(error);
		})
	}

	setSearchKeyword(searchKeyword) {
		this.setState({searchKeyword})
	}

	deleteSearchKeyword() {
		this.setState({searchKeyword: "", searching: false});
	}

	render () {

		let chatsArray = this.state.chats.map(( item, key ) =>
		{
			return item != undefined ? (
					<ChatThumbnail navigation={this.props.navigation}
					chat={item}
					logged_in_user_id={this.props.users.id}
					key={key}
					style={[ (key === this.state.chats.length - 1) ? allStyles.bottomProfileThumbnailCard : null,
							 (key === 0) ? allStyles.topProfileThumbnailCard : null,
						]} />
			) : null
		})

		let friendsArray = this.state.friendResults.map(( item, key ) =>
		{
			return item != undefined ? (
					<ChatThumbnail navigation={this.props.navigation}
					chat={item}
					logged_in_user_id={this.props.users.id}
					key={key}
					style={[ (key === this.state.friendResults.length - 1) ? allStyles.bottomProfileThumbnailCard : null,
							 (key === 0) ? allStyles.topProfileThumbnailCard : null,
						]} />
			) : null
		})

		return (
				<View style={{flex: 1}}>
			      <View style={[allStyles.searchInputContainer]}>
					  <View style={[ allStyles.input, allStyles.searchInput ]}>
		                <Icon
		                  name='search'
		                  style={allStyles.searchIcon}
		                />
		                <TextInput
		                ref={'searchInput'}
		                style={[ allStyles.searchInputText ]}
		                placeholder={'Find a friend here...'}
		                placeholderTextColor={'#8393a8'}
		                underlineColorAndroid={'#fff'}
						autoCapitalize='none'
		                autoCorrect={false}
		                returnKeyType='search'
		                value={ this.state.searchKeyword }
		                onChangeText={(keyword) => this.setSearchKeyword(keyword)}
		                onSubmitEditing={this.searchSubmit.bind(this)}
		                />
		                <TouchableOpacity onPress={this.deleteSearchKeyword.bind(this)}>
			                <TabBarIcon
			                  name='md-close'
			                  style={[allStyles.searchIcon, allStyles.searchDeleteIcon]}
			                />
			            </TouchableOpacity>
			         </View>
			      </View>
			      <View style={allStyles.container}>
				      <ScrollView style={allStyles.container}
			      		refreshControl={
				              <RefreshControl
				              refreshing={this.state.refreshing}
				              onRefresh={this._onRefresh}
				            />
				          }>
				      	{
							!this.state.searching ? (
									<View style={[styles.friendsList, allStyles.sectionClear]}>
							 		{
							 			this.state.chats.length > 0 ? chatsArray :
										(
											<View style={[ allStyles.section, allStyles.sectionClear ]}>
												<Text style={[ allStyles.sectionMessage ]}>No chats yet! Start a new conversation with a friend right now.</Text>
													<TouchableOpacity onPress={() => this.refs.searchInput.focus()} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.grayButton ]}>
											        	<TabBarIcon name="md-add" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
											        	<Text style={allStyles.whiteText}>New chat</Text>
											        </TouchableOpacity>
											</View>
										)
									}
									</View>
							) : null
				      	}
						{
							this.state.searching ? (
									<View style={[styles.friendsList, allStyles.sectionClear]}>
										{
											this.state.friendResults.length > 0 ? friendsArray :
												(
													<View style={[ allStyles.section, allStyles.sectionClear ]}>
														<Text style={[ allStyles.sectionMessage ]}>There are no results.</Text>
													</View>
												)
										}
									</View>
							) : null
						}
						</ScrollView>
					</View>
				</View>
		)
	}
}
export default Chats;
