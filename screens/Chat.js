import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { MonoText } from '../components/StyledText';
import ChatMessage from '../components/ChatMessage';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @inject('chats') @observer
class Chats extends React.Component {

	state = {
			messages: [],
			message: "",
			refreshing: false,
	}

	_onRefresh = () => {
		this.setState({refreshing: true});
		this.componentDidMount();
	}

	componentDidMount() {
		const {chat_id} = this.props.route.params;
		if (chat_id) {
			this.props.chats.show(chat_id)
			.then((res) => {
				console.log("got chatty chat")
				this.setState({messages: this.props.chats.chat.messages});
				this.setState({refreshing: false});
			})
			.catch((error) => {
				console.log("and i oop")
				console.log(error);
			})
		}
	}

	sendMessage() {
		if (this.state.message == "") {
			this.setState({refreshing: false});
			return;
		}

		const {users} = this.props.route.params;
		if(users) {
			// open new channel
			this.props.chats.create(null, users)
			.then((res) => {
				console.log("created chatty chat")
				this.sendMessageHelper();
			})
			.catch((error) => {
				console.log("and i oop")
				console.log(error);
			})
		} else {
			this.sendMessageHelper();
		}
	}

	sendMessageHelper() {
		this.props.chats.send(this.state.message, this.props.chats.id)
		.then((res) => {
			console.log("sent a messagey message")
			this.setState({messages: this.props.chats.chat.messages});
			this.setState({message: "", refreshing: false});
		})
		.catch((error) => {
			console.log(error);
		})
	}

	setMessage(message) {
		this.setState({message})
	}

	render () {

		let messageArray = this.state.messages.map(( item, key ) =>
		{
			return item != undefined ? (
					<ChatMessage
					message={item}
					user={item.user}
					logged_in_user_id={this.props.users.id}
					key={key} />
			) : null
		})

		return (
				<View style={{flex: 1}}>
			      <View style={styles.chatContainer}>
				      <View style={{flex: 1, justifyContent: 'flex-start' }}>
				      		<ScrollView>
					      	{
					      		messageArray
					      	}
					      	</ScrollView>
				      </View>
				    <View style={{flex: 1, justifyContent: 'flex-end' }}>
				    	<KeyboardAwareScrollView>
					      	<View style={[allStyles.searchInputContainer, styles.chatInputContainer]}>
							  <View style={[ allStyles.input, allStyles.searchInput, styles.chatInput ]}>
				                <TextInput
				                style={[ allStyles.searchInputText ]}
				                placeholder={'Type your message here...'}
				                placeholderTextColor={'#8393a8'}
				                underlineColorAndroid={'#fff'}
								autoCapitalize='none'
				                autoCorrect={false}
				                returnKeyType='search'
				                value={ this.state.message }
				                onChangeText={(keyword) => this.setMessage(keyword)}
				                onSubmitEditing={this.sendMessage.bind(this)}
				                />
				              </View>
				              <View style={[styles.chatInputIconContainer]}>
				                <TouchableOpacity onPress={this.sendMessage.bind(this)}>
					              	<Icon
					                  name='send'
					                  style={[allStyles.buttonIcon, allStyles.whiteText]}
					                />
					            </TouchableOpacity>
					          </View>
				           </View>
				         </KeyboardAwareScrollView>
				      </View>
			      </View>
				</View>
		)
	}
}
export default Chats;
