import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from 'react-native-modal';
import { StackActions } from '@react-navigation/native';

import ChatMessage from '../components/ChatMessage';
import Loading from '../components/Loading';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @inject('chats') @observer
class Chats extends React.Component {
	
	state = {
//			messages: [],
			message: "",
			newChat: false,
			refreshing: true,
			isModalVisible: false,
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
//				this.setState({messages: this.props.chats.chat.messages});
				this.setState({refreshing: false});
			})
			.catch((errors) => {
				console.log("and i oop")
				console.log(errors);
				this.setState({isModalVisible: true});
			})
		} else {
			this.setState({refreshing: false, newChat: true});
		}
	}

	sendMessage() {
		if (this.state.message == "") {
			this.setState({refreshing: false});
			return;
		}

		if(this.state.newChat) {
			// open new channel
			const {users} = this.props.route.params;
			this.props.chats.create(null, users)
			.then((res) => {
				console.log("created chatty chat")
				this.setState({chat: res, newChat: false})
				this.sendMessageHelper();
			})
			.catch((errors) => {
				console.log("and i oop")
				console.log(errors);
			})
		} else {
			this.sendMessageHelper();
		}
	}

	sendMessageHelper() {
		this.props.chats.send(this.state.message, this.props.chats.id)
		.then((res) => {
			console.log("sent a messagey message")
//			this.setState({messages: this.props.chats.chat.messages});
			this.setState({message: "", refreshing: false});
		})
		.catch((errors) => {
			console.log(errors);
		})
	}

	setMessage(message) {
		this.setState({message})
	}

	render () {

		let messageArray;
		if (this.props.chats.chat && this.props.chats.chat.messages) {
			messageArray = this.props.chats.chat.messages.map(( item, key ) =>
			{
				return item != undefined && (
						<ChatMessage
						message={item}
						user={item.user}
						logged_in_user_id={this.props.users.id}
						key={key} />
				)
			})
		}

		return (
				<View style={allStyles.container}>
				{
					this.state.refreshing ? <Loading /> : (
				      <View style={styles.chatContainer}>
					      <View style={styles.chatMessagesContainer}>
					      		<ScrollView
					      		ref={ref => {
								    this.scrollview_ref = ref;
								  }}
							    onContentSizeChange={() => this.scrollview_ref.scrollToEnd({animated: true})}>
						      	{
						      		messageArray
						      	}
						      	</ScrollView>
					      </View>
					    <View style={styles.chatBottomContainer}>
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
					                returnKeyType='send'
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
export default Chats;
