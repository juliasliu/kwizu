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
import { LoginManager, AccessToken } from "react-native-fbsdk";

import Loading from '../components/Loading';
import ProfileChatThumbnail from '../components/ProfileChatThumbnail';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @inject('chats') @observer
class FBImport extends React.Component {
	
	state = {
			facebook_id: null,
			friends: [],
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
			this.setState({facebook_id: res.facebook_id, refreshing: false}, this.importFriends);
		})
		.catch((errors) => {
			console.log("and i oop")
			console.log(errors);
			this.setState({isModalVisible: true});
		})
	}
	
	importFriends() {
		if (this.state.facebook_id) {
			// generate access token
			AccessToken.getCurrentAccessToken().then((data) => {
				const { accessToken } = data
				console.log(accessToken)
				this.props.users.importFacebookFriends(accessToken)
				.then((res) => {
					console.log("gotem")
					this.setState({friends: res, refreshing: false});
				})
				.catch((errors) => {
					console.log("and i oop")
					console.log(errors);
					this.setState({isModalVisible: true});
				})
			})
		}
	}
	
	setSearchKeyword(searchKeyword) {
		this.setState({searchKeyword})
	}

	deleteSearchKeyword() {
		this.setState({searchKeyword: ""});
	}

	render () {

		let friendsArray = this.state.friends.filter(elem => elem.name.toLowerCase().includes(this.state.searchKeyword.toLowerCase()) || elem.username.toLowerCase().includes(this.state.searchKeyword.toLowerCase()))
		friendsArray = friendsArray.map(( item, key ) =>
		{
			return item != undefined && (
					<ProfileThumbnail navigation={this.props.navigation}
					user={item}
					key={key}
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
					      		<View style={[allStyles.section, allStyles.sectionClear]}>
								{
									this.state.facebook_id ? (
										this.state.friends.length > 0 ? friendsArray :
											(
												<View style={[ allStyles.section, allStyles.sectionClear ]}>
													<Text style={[ allStyles.sectionMessage ]}>None of your Facebook friends are here yet! Share the app with them!</Text>
												</View>
											)
									) : (
										<View style={[ allStyles.section, allStyles.sectionClear ]}>
											<Text style={[ allStyles.sectionMessage ]}>You must connect your Facebook account in order to view your friends.</Text>
											<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blackButton ]}
								                onPress={() => this.props.navigation.push('Facebook Settings')}>
												<Text style={[ allStyles.whiteText ]}>Go to Facebook settings</Text>
											</TouchableOpacity>
										</View>
									)
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
export default FBImport;
