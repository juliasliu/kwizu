import * as React from 'react';
import {
	Text,
	Button,
	TouchableOpacity,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import Home from '../screens/Home';
import Match from '../screens/Match';
import Profile from '../screens/Profile';

import allStyles from '../styles/AllScreens';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route), headerRight: getHeaderButton(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="Match"
        component={Match}
        options={{
          title: 'Match',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-heart" />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Kwizu';
    case 'Match':
        return 'Match';
    case 'Profile':
      return 'Profile';
  }
}

function getHeaderButton(route) {
	  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
	
	switch (routeName) {
		case 'Home':
			return () => (
				<TabBarIcon
				onPress={() => alert('This is a button!')}
				name="md-add"
					style={ allStyles.headerRightIcon }
					/>
				);
		case 'Match':
			return () => (
				<TabBarIcon
				onPress={() => alert('This is a button!')}
				name="md-map"
					style={ allStyles.headerRightIcon }
					/>
				);
		case 'Profile':
			return () => (
				<TabBarIcon
				onPress={() => alert('This is a button!')}
				name="md-chatbubbles"
					style={ allStyles.headerRightIcon }
					/>
				);
	}
}