import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, View } from 'react-native'
import { observer, inject } from 'mobx-react'
import messaging from '@react-native-firebase/messaging';

import Welcome from '../screens/Welcome'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Chats from '../screens/Chats'
import Profile from '../screens/Profile'
import Search from '../screens/Search'

import BottomTabNavigator from '../navigation/BottomTabNavigator';

const Stack = createStackNavigator();

@inject('users') @observer
export default class Main extends React.Component {

	constructor() {
		super();
	}
	
	componentDidMount() {
		this.props.users.loginStatus()
	}
	
	requestUserPermission = async () => {
		const authStatus = await messaging().requestPermission();
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (enabled) {
			this.getFcmToken();
			console.log('Authorization status:', authStatus);
		}
	}

	getFcmToken = async () => {
		const fcmToken = await messaging().getToken();
		if (fcmToken) {
			this.props.users.setNotificationToken(fcmToken);
			console.log("Your Firebase Token is:", fcmToken);
		} else {
			console.log("Failed", "No token received");
		}
	}
	
	render() {
		
		if(this.props.users.isLoggedIn){
			this.requestUserPermission();
			
			return (
					<NavigationContainer>
			          <Stack.Navigator>
			            <Stack.Screen name="Root" component={BottomTabNavigator} />
			          </Stack.Navigator>
			        </NavigationContainer>
			)
		} else {
			return(
					<NavigationContainer>
			          <Stack.Navigator
			          	screenOptions={{
			        	    headerShown: false
			        	  }}>
				          <Stack.Screen name="Welcome" component={Welcome} />
				          <Stack.Screen name="Login" component={Login} />
				          <Stack.Screen name="Register" component={Register} />
			          </Stack.Navigator>
			        </NavigationContainer>
			)
		}
	}
}
