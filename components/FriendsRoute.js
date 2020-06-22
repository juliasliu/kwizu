import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import TabBarIcon from '../components/TabBarIcon';

import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, RefreshControl, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Modal from 'react-native-modal';
import { StackActions } from '@react-navigation/native';

import ProfileThumbnail from '../components/ProfileThumbnail';
import Loading from '../components/Loading';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @observer
class FriendsRoute extends React.Component {
	state = {
			friends: [],
			searchKeyword: "",
			isOwnProfile: false,
			refreshing: true,
			isModalVisible: false,
	}

	_onRefresh = () => {
	    this.setState({refreshing: true});
	    this.componentDidMount();
	  }

	componentDidMount() {
		const {user_id} = this.props;
		if (user_id == this.props.users.user.id) {
			this.setState({isOwnProfile: true})
		}
		this.props.users.show(this.props.user_id)
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
					      	<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.facebookButton ]}
				                onPress={() => alert("")}>
								<Icon name="facebook" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
								<Text style={[ allStyles.whiteText ]}>Add from Facebook</Text>
							</TouchableOpacity>
					      	<View style={[allStyles.section, allStyles.sectionClear]}>
								{
									this.state.friends.length > 0 ? friendsArray :
										(
												this.state.isOwnProfile ? (
															<View style={[ allStyles.section, allStyles.sectionClear ]}>
																<Text style={[ allStyles.sectionMessage ]}>No friends yet! Find people by taking more kwizzes or import your friends from Facebook!</Text>
															</View>
														) : (
															<View style={[ allStyles.section, allStyles.sectionClear ]}>
																<Text style={[ allStyles.sectionMessage ]}>This user has no friends yet. Be their first friend!</Text>
															</View>
														)
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
export default FriendsRoute;
