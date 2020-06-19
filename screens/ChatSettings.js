import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, RefreshControl, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from 'react-native-modal';
import { StackActions } from '@react-navigation/native';

import ChatMessage from '../components/ChatMessage';
import ChatQuiz from '../components/ChatQuiz';
import ChatQuizzing from '../components/ChatQuizzing';
import Loading from '../components/Loading';
import ProfileThumbnail from '../components/ProfileThumbnail';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @inject('chats') @observer
class ChatSettings extends React.Component {
	
	state = {
			title: "",
			users: [],
			refreshing: true,
			isModalVisible: false,
	}

	_onRefresh = () => {
		this.setState({refreshing: true});
		this.componentDidMount();
	}

	componentDidMount() {
		this.props.chats.show(this.props.chats.id)
		.then((res) => {
			console.log("got CHATTY chat")
			this.setState({users: res.users, title: res.title, refreshing: false}, this.setTitle);
		})
		.catch((errors) => {
			console.log("and i oop")
			console.log(errors);
			this.setState({isModalVisible: true});
		})
	}
	
	setTitle() {
		console.log("title " + this.state.title)
		// if no chat title exists, make title of chat default string of users names besides yourself
		if (!this.state.title) {
			this.setState({title: this.getStringOfUsers()})
		}
	}
	
	getStringOfUsers() {
		let title = "";
		let users = this.state.users;
		for (var i = 0; i < users.length; i++) {
			if (users[i].id != this.props.users.id) {
				title += users[i].name + ", ";
			}
		}
		title = title.slice(0, title.length - 2);
		return title;
	}

	onPressUpdate() {
		this.props.chats.update(this.props.chats.chat, this.state.title)
		.then(res => {
			this.setState({success: this.props.chats.success, errors: null})
		})
		.catch((errors) => {
			this.setState({errors: this.props.chats.errors})
		})
	}

	updateTitle(title) {
		this.setState({title})
	}
	
	render () {

		let membersArray = this.state.users
		membersArray = membersArray.map(( item, key ) =>
		{
			return item != undefined && (
					<ProfileThumbnail 
					navigation={this.props.navigation}
					user={item}
					key={key}
					style={[ (key === membersArray.length - 1) ? allStyles.bottomProfileThumbnailCard : null,
							 (key === 0) ? allStyles.topProfileThumbnailCard : null,
						]} />
			)
		})
		
		return (
				<View style={allStyles.containerNoPadding}>
				{
					this.state.refreshing ? <Loading /> : (
						<ScrollView
						showsVerticalScrollIndicator={false}
							ref={ref => {
							    this.scrollview_ref = ref;
							  }}>
						      <RefreshControl
					              refreshing={this.state.refreshing}
					              onRefresh={this._onRefresh}
					            />
						      <View style={allStyles.container}>
								{
									this.state.errors &&
									<View style={ allStyles.errors }
									onLayout={event => {
								        const layout = event.nativeEvent.layout;
								        this.scrollview_ref.scrollTo({
								            x: 0,
								            y: layout.y,
								            animated: true,
								        });
								      	}}>
										{
											this.state.errors.map(( item, key ) =>
											{
												return <Text key={key} style={ allStyles.errorText }>• {item}</Text> 
											})
										}
									</View>
								}
								{
									this.state.success &&
									<View style={ allStyles.success }
									onLayout={event => {
								        const layout = event.nativeEvent.layout;
								        this.scrollview_ref.scrollTo({
								            x: 0,
								            y: layout.y,
								            animated: true,
								        });
								      	}}>
										<Text>{this.state.success}</Text>
									</View>
								}
								<View style={[allStyles.section, allStyles.sectionClear]}>
      								<Text style={allStyles.sectionSubtitle}>Group Info</Text>
									<TextInput
										ref='name'
										style={ allStyles.input }
										onChangeText={(title) => this.updateTitle(title)}
										returnKeyType='next'
										value={this.state.title}
										placeholder='Name of chat'
									/>
									{
										this.props.chats.busy ?
												<ActivityIndicator/> :
										<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.blackButton ]} onPress={this.onPressUpdate.bind(this)}>
											<Text style={ allStyles.whiteText }>Update chat name</Text>
										</TouchableOpacity>
									}
								</View>
								<View style={[allStyles.section, allStyles.sectionClear]}>	
	      							<Text style={allStyles.sectionSubtitle}>Group Members</Text>
	      							{
	      								membersArray
	      							}
	      						</View>
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
export default ChatSettings;
