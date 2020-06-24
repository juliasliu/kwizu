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
			friends_received: [],
			searchKeyword: "",
			isOwnProfile: false,
			refreshing: true,
			isModalVisible: false,
	}

	_onRefresh = () => {
	    this.setState({refreshing: true});
	    this.refreshFriends();
	}

	componentDidMount() {
		const {user_id} = this.props;
		if (user_id == this.props.users.user.id) {
			this.setState({isOwnProfile: true})
		}
		if (this.props.friends_received) {
			this.setState({friends_received: this.props.friends_received, refreshing: false})
		}
	}
	
	refreshFriends() {
		const {user_id} = this.props;
		if (user_id == this.props.users.user.id) {
			this.setState({isOwnProfile: true})
		}
		this.props.users.show(this.props.user_id)
		.then((res) => {
			console.log("gotem")
			this.setState({friends_received: res.friends_received, refreshing: false});
		})
		.catch((errors) => {
			console.log("and i oop")
			console.log(errors);
			this.setState({isModalVisible: true});
		})
	}

	render () {

		let friendsReceivedArray = this.state.friends_received.map(( item, key ) =>
		{
			return item != undefined && (
					<ProfileThumbnail navigation={this.props.navigation}
					user={item}
					key={key}
					style={[ (key === this.state.friends_received.length - 1) ? allStyles.bottomProfileThumbnailCard : null,
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
							refreshControl={
									<RefreshControl
									refreshing={this.state.refreshing}
									onRefresh={this._onRefresh}
									/>
							}>
							<View style={allStyles.container}>
								<View style={[allStyles.section, allStyles.sectionClear]}>
								{
									this.state.friends_received.length > 0 ? friendsReceivedArray :
										(
												<View style={[ allStyles.section, allStyles.sectionClear ]}>
												<Text style={[ allStyles.sectionMessage ]}>You have no incoming friend requests! You're all caught up.</Text>
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
export default FriendsRoute;
