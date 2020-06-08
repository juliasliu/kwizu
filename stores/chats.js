import {observable, computed, map, toJS, action} from 'mobx'; 
import axios from 'axios'
import { API_ROOT, API_WS_ROOT } from '../constants';

//import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import { ActionCable, Cable } from '@kesha-antonov/react-native-action-cable';

const actionCable = ActionCable.createConsumer(API_WS_ROOT);
const cable = new Cable({});

class Chats {
	@observable chat = null;
	@observable id = null;
	@observable busy = false;
	@observable error = null;
	@observable success = null;
	@observable channel = null;
	
	@action create = function(title, users) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		let chat = {}
		if (title) chat.title = title;
		
		return new Promise(function(resolve, reject) {
			axios.post(API_ROOT + '/chats', {chat: chat, users: users}, {withCredentials: true})
			.then(response => {
				that.handleSuccess(response.data.chat)
				that.handleChannel(response.data.chat.id)
				resolve(response.data.chat);
			})
			.catch(error => {
				that.handleErrors(error)
				console.log('api errors:', error)
				reject(error);
			})
		})
	}
	
	@action index = function() {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/chats', {withCredentials: true})
	        .then(response => {
	            that.handleSuccess()
	        	resolve(response.data.chats);
	        })
	        .catch(error => reject(error))
		})
	}
	
	@action show = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/chats/' + id, {withCredentials: true})
	        .then(response => {
	        	console.log("here with da chat")
	        	that.handleSuccess(response.data.chat);
	            resolve(response.data.chat);
	        })
	        .catch(error => {
				that.handleErrors(error)
				console.log('api errors:', error)
				reject(error);
			})
		})
	}
	
	@action send = function(message_text, chat_id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		let message = {
				text: message_text,
		}
		
		return new Promise(function(resolve, reject) {
			axios.post(API_ROOT + '/messages', {message: message, chat_id: chat_id}, {withCredentials: true})
	        .then(response => {
	        	that.handleSuccess(response.data.chat);
	            resolve(response.data.chat);
	        })
	        .catch(error => {
				that.handleErrors(error)
				console.log('api errors:', error)
				reject(error);
			})
		})
	}
	
	handleChannel(chat_id) {
		let chatChannel = "chat_" + chat_id;
		console.log("set channel to " + chatChannel)
		channel = cable.setChannel(
				chatChannel, // channel name to which we will pass data from Rails app with `stream_from`
				actionCable.subscriptions.create({
					channel: 'ChatsChannel', // from Rails app app/channels/chats_channel.rb
					chat_id,
				})
		)
		channel
		.on( 'received', this.handleReceived )
		.on( 'connected', this.handleConnected )
		.on( 'rejected', this.handleDisconnected )
		.on( 'disconnected', this.handleDisconnected )
	}

	handleReceived = (data) => {
		console.log("HANDLE RECEIVED")
		let chatChannel = "chat_" + this.id;
		switch(data.type) {
			case 'new_incoming_message': {
				cable.channel(chatChannel).perform('send_message', { text: 'Hey' })
			}
		}
		// add message to chat
	}

	handleConnected = () => {
		console.log("HANDLE CONNECTED")
		this.handleSuccess();
	}

	handleDisconnected = () => {
		console.log("HANDLE NO  DICSCONENT")
		this.handleErrors();
	}
	
	handleSuccess(chat) {
		this.chat = chat;
		if (chat) this.id = chat.id;
		this.busy = false; 
		this.error = null;
		this.success = null;
	}
	
	handleErrors(errors) {
		this.chat = null;
		this.id = null;
		this.busy = false; 
		this.error = errors
		this.success = null;
	}
}

const chats = new Chats();
export default chats;