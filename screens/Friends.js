import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import TabBarIcon from '../components/TabBarIcon';
import { Badge } from 'react-native-elements'

import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, RefreshControl, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Modal from 'react-native-modal';
import { StackActions } from '@react-navigation/native';

import ProfileThumbnail from '../components/ProfileThumbnail';
import FriendsRoute from '../components/FriendsRoute';
import RequestsRoute from '../components/RequestsRoute';
import Loading from '../components/Loading';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @observer
class Friends extends React.Component {
	state = {
			friends: null,
			friends_received: null,
			isOwnProfile: false,
			isModalVisible: false,
			index: 0,
			routes: [
				{ key: 'first', title: 'Friends' },
				{ key: 'second', title: 'Requests' },
			],
	}

	componentDidMount() {
		const {user_id} = this.props.route.params;
		if (user_id == this.props.users.user.id) {
			this.setState({isOwnProfile: true})
		}
		this.props.users.show(user_id)
		.then((res) => {
			console.log("gotem frands")
			this.setState({friends: res.friends, friends_received: res.friends_received});
		})
		.catch((errors) => {
			console.log("and i oop")
			console.log(errors);
			this.setState({isModalVisible: true});
		})
	}
	
	setIndex(index) {
		this.setState({index: index});
	}

	render () {
		
		let FirstRoute = (reload) => (
				<FriendsRoute
				reload={reload}
				friends={this.state.friends}
				navigation={this.props.navigation}
				user_id={this.props.route.params.user_id} />
		);

		let SecondRoute = () => (
				<RequestsRoute
				friends_received={this.state.friends_received}
				navigation={this.props.navigation}
				user_id={this.props.route.params.user_id} />
		);

		const renderTabBar = props => (
				<TabBar
				{...props}
				indicatorStyle={ allStyles.tabIndicator }
				style={ allStyles.tabBar }
				renderLabel={({ route, focused, color }) => (
						<View style={[allStyles.tabBarContainer, styles.profileSocialButtonBadge]}>
							<Icon
						    name={
						    		route.title == "Requests" ? (
						    				focused ? 'envelope-open' : 'envelope-open-o'
						    		) : (
						    				focused ? 'user' : 'user-o'
						    		)
						    }
						    color={color}
						    style={ allStyles.tabBarIcon }
						    />
							<Text style={[ allStyles.tabBarLabel, { color }]}>
								{route.title}
						    </Text>
						    {
						    	(route.title == "Requests" && 
						    	this.state.friends_received && this.state.friends_received.length != 0 ) && (
						    			<Badge
										value={this.state.friends_received.length}
										status="error"
										containerStyle={[allStyles.badge, styles.tabViewBadge]}
										/>	
						    	)
						    }
						 </View>
					  )}
				activeColor={"#fff"}
				inactiveColor={"#8393a8"}
				/>
		);

		return (
				<View style={allStyles.containerNoPadding}>
					{
						this.state.isOwnProfile ? (
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
						) : (
								FirstRoute(true)
						)
					}
				</View>
		)
	}
}
export default Friends;
