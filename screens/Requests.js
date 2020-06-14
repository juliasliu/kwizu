import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, RefreshControl, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import ProfileThumbnail from '../components/ProfileThumbnail';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @observer
class Requests extends React.Component {
	state = {
			friends_requested: [],
			friends_received: [],
			refreshing: false,
			index: 0,
			routes: [
				{ key: 'first', title: 'Requests' },
				{ key: 'second', title: 'Sent' },
			]
	}

	_onRefresh = () => {
	    this.setState({refreshing: true});
	    this.componentDidMount();
	  }

	componentDidMount() {
		const {user_id} = this.props.route.params;
		this.props.users.show(user_id)
		.then((res) => {
			console.log("gotem")
			this.setState({friends_requested: res.friends_requested, friends_received: res.friends_received, refreshing: false});
		})
		.catch((error) => {
			console.log("and i oop")
			console.log(error);
		})
	}

	setIndex(index) {
		this.setState({index: index});
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

		let friendsRequestedArray = this.state.friends_requested.map(( item, key ) =>
		{
			return item != undefined && (
					<ProfileThumbnail navigation={this.props.navigation}
					user={item}
					key={key}
					style={[ (key === this.state.friends_requested.length - 1) ? allStyles.bottomProfileThumbnailCard : null,
							 (key === 0) ? allStyles.topProfileThumbnailCard : null,
						]} />
			)
		})

		let FirstRoute = () => (
				<ScrollView style={allStyles.contentContainer}
				refreshControl={
						<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh}
						/>
				}>
				<View style={[styles.friendsList, allStyles.container]}>
				{
					this.state.friends_received.length > 0 ? friendsReceivedArray :
						(
								<View style={[ allStyles.section, allStyles.sectionClear ]}>
								<Text style={[ allStyles.sectionMessage ]}>You have no incoming friend requests! You're all caught up.</Text>
								</View>
						)
				}
				</View>
				</ScrollView>
		);

		let SecondRoute = () => (
				<ScrollView style={allStyles.contentContainer}
				refreshControl={
						<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh}
						/>
				}>
				<View style={[styles.friendsList, allStyles.container]}>
				{
					this.state.friends_requested.length > 0 ? friendsRequestedArray :
						(
								<View style={[ allStyles.section, allStyles.sectionClear ]}>
								<Text style={[ allStyles.sectionMessage ]}>You have no outgoing friend requests! You're all caught up.</Text>
								</View>
						)
				}
				</View>
				</ScrollView>
		);

		const renderTabBar = props => (
				<TabBar
				{...props}
				indicatorStyle={ allStyles.tabIndicator }
				style={ allStyles.tabBar }
				renderLabel={({ route, focused, color }) => (
						<View style={allStyles.tabBarContainer}>
							<Icon
						    name={
						    		route.title == "Requests" ? (
						    				focused ? 'envelope-open' : 'envelope-open-o'
						    		) : (
						    				focused ? 'send' : 'send-o'
						    		)
						    }
						    color={color}
						    style={ allStyles.tabBarIcon }
						    />
							<Text style={[ allStyles.tabBarLabel, { color }]}>
								{route.title}
						    </Text>
						 </View>
					  )}
				activeColor={"#fff"}
				inactiveColor={"#8393a8"}
				/>
		);

		return (
				<View style={{flex: 1}}>
					<TabView
				      navigationState={{ index: this.state.index, routes: this.state.routes }}
				      renderScene={
							SceneMap({
								first: FirstRoute,
								second: SecondRoute,
							})
						}
				      onIndexChange={this.setIndex.bind(this)}
				      initialLayout={{ width: Dimensions.get('window').width }}
						renderTabBar={renderTabBar}
				    />
				</View>
		)
	}
}
export default Requests;
