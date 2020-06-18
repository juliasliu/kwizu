import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import TabBarIcon from '../components/TabBarIcon';

import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import Modal from 'react-native-modal';
import { StackActions } from '@react-navigation/native';

import ChatThumbnail from '../components/ChatThumbnail';
import Loading from '../components/Loading';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @inject('chats') @observer
class Chats extends React.Component {
	state = {
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
			this.setState({refreshing: false});
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

	render () {
		console.log('CHATS CHATHS A CHATHAS CHHATHS CHATTTSSS')
		console.log(this.props.chats.chats);
		let chatsArray;
		if (this.props.chats.chats) {
			chatsArray = this.props.chats.chats.filter(elem => elem.created_at.includes(this.state.searchKeyword)).map(( item, key ) =>
			{
				return item != undefined && (
						<ChatThumbnail navigation={this.props.navigation}
						chat={item}
						logged_in_user_id={this.props.users.id}
						key={key}
						style={[ (key === this.props.chats.chats.length - 1) ? allStyles.bottomProfileThumbnailCard : null,
								(key === 0) ? allStyles.topProfileThumbnailCard : null,
										]} />
				)
			})
		}
		
		return (
				<View style={{flex: 1}}>
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
			      <View style={allStyles.container}>
			      	{
			      		this.state.refreshing ? <Loading /> : ( 
				      	<ScrollView style={allStyles.contentContainer}
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
								 			this.props.chats.chats.length > 0 ? chatsArray :
											(
												<View style={[ allStyles.section, allStyles.sectionClear ]}>
													<Text style={[ allStyles.sectionMessage ]}>No chats yet! Start a new conversation with a friend right now.</Text>
												</View>
											)
										}
										</View>
								)
					      	}
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
				</View>
		)
	}
}
export default Chats;
