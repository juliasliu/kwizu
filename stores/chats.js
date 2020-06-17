import {observable, computed, map, toJS, action} from 'mobx'; 
import axios from 'axios'
import { API_ROOT, API_WS_ROOT } from '../constants';

//import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import { ActionCable, Cable } from '@kesha-antonov/react-native-action-cable';

const actionCable = ActionCable.createConsumer(API_WS_ROOT);
const cable = new Cable({});

class Chats {
	@observable chats = [];
	@observable chat = null;
	@observable id = null;
	@observable busy = false;
	@observable errors = null;
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
			.catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
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
	            that.chats = response.data.chats;
	            for (var i = 0; i < response.data.chats.length; i++) {
	            	that.handleChannel(response.data.chats[i].id)
	            }
	        	resolve(response.data.chats);
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	@action find = function(user_id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/chats/user/' + user_id, {withCredentials: true})
	        .then(response => {
	            if (response.data.chat) {
		        	that.handleSuccess()
		        	resolve(response.data.chat);
	            } else {
	            	that.handleSuccess()
		        	resolve({});
	            }
	        })
	        .catch(errors => reject(errors))
		})
	}
	
	@action show = function(id) {
		this.busy = true;
		let that = this;	// have to reassign because 'this' changes scope within the promise.then
		
		return new Promise(function(resolve, reject) {
			axios.get(API_ROOT + '/chats/' + id, {withCredentials: true})
	        .then(response => {
	        	that.handleSuccess(response.data.chat);
	        	that.handleChannel(response.data.chat.id)
	            resolve(response.data.chat);
	        })
	        .catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
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
	        .catch(errors => {
				that.handleErrors(errors)
				console.log('api errors:', errors)
				reject(errors);
			})
		})
	}
	
	handleChannel(chat_id) {
		let chatChannel = "chat_" + chat_id;
		console.log("set channel to " + chatChannel)
		channel = cable.setChannel(
				chatChannel, // channel name to which we will pass data from Rails app with `stream_from`
				actionCable.subscriptions.create({
					channel: "ChatsChannel", // from Rails app app/channels/chats_channel.rb
					id: chat_id,
				})
		)
		channel
		.on( 'received', this.handleReceived.bind(this) )
		.on( 'connected', this.handleConnected.bind(this) )
		.on( 'rejected', this.handleDisconnected.bind(this) )
		.on( 'disconnected', this.handleDisconnected.bind(this) )
	}

	handleReceived(data) {
		console.log("HANDLE RECEIVED")
		console.log(data)
		console.log(this)
		// if data is a message
		if (data.chat_id) {
			// add the latest message to the right chat it if doesn't exist yet
			var chatIndex = this.chats.findIndex(elem => elem.id === data.chat_id)
			if (chatIndex >= 0 && this.chats[chatIndex].messages.findIndex(elem => elem.id === data.id) < 0) {
				console.log("ADDING MESAGE")
				var chats = this.chats;
				chats[chatIndex].messages.push(data);
				this.chats = []
				this.chats = chats;
				console.log(this.chats[chatIndex].messages);
			}
			
			if (this.chat && this.chat.id == data.chat_id && 
					this.chat.messages && this.chat.messages.findIndex(elem => elem.id === data.id) < 0) {
				// add message to chat if doesn't exist yet
				this.chat.messages.push(data);
			}
		}
		// if data is a chat
		else if (data.messages) {
			// add the chat if it doesn't exist
			var chatIndex = this.chats.findIndex(elem => elem.id === data.chat_id)
			if (chatIndex < 0) {
				this.chats.push(data);
			}
		}
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
		if (chat) this.chat = chat;
		if (chat) this.id = chat.id;
		this.busy = false; 
		this.errors = null;
		this.success = null;
	}
	
	handleErrors(errors) {
		this.chat = null;
		this.id = null;
		this.busy = false; 
		this.errors = errors
		this.success = null;
	}
}

const chats = new Chats();
export default chats;