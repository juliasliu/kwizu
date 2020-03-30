import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, View } from 'react-native'
import { observer, inject } from 'mobx-react'

import Login from './screens/Login' 
import Chats from './screens/Chats' 
import Profile from './screens/Profile' 
import Search from './screens/Search' 
import { users, chats } from './stores'

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

const Stack = createStackNavigator();

@inject('users') @observer
export default class App extends React.Component { 
	
	constructor() {
		super(); 
	}
	render() { 
		if(this.props.users.isLoggedIn){
			console.log("logged in");
			return (
					<NavigationContainer>
			          <Stack.Navigator>
			            <Stack.Screen name="Root" component={BottomTabNavigator} />
			          </Stack.Navigator>
			        </NavigationContainer>
			)
		} else {
			return <Login/>
		}
	} 
}