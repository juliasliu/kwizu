import * as React from 'react';
import {
	Text,
	Button,
	TouchableOpacity,
	View,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Modal from 'react-native-modal';

import TabBarIcon from '../components/TabBarIcon';

import Home from '../screens/Home';
import Take from '../screens/Take';
import New from '../screens/New';
import Publish from '../screens/Publish';
import Leaderboard from '../screens/Leaderboard';

import Match from '../screens/Match';

import Profile from '../screens/Profile' 
import Friends from '../screens/Friends' 
import Requests from '../screens/Requests' 
import Chats from '../screens/Chats' 
import Chat from '../screens/Chat' 
import Settings from '../screens/Settings' 

import allStyles from '../styles/AllScreens';

const HomeStack = createStackNavigator();

class HomeStackScreen extends React.Component {
	state = {
			isModalVisible: false,
	};

	toggleModal = () => {
		this.setState({isModalVisible: !this.state.isModalVisible});
	};

	  render() {
			return (
			<View style={{flex: 1}}>
				<HomeStack.Navigator>
			      <HomeStack.Screen name="Home" component={Home} options={{
			    	  headerTitle: 'Kwizu', 
			    	  headerTitleStyle: { color: '#515d6e' },
			    	  headerTintColor: '#B2BECF',
			    	  headerRight: () => (
							<TabBarIcon
							onPress={this.toggleModal}
							name="md-add"
								style={[ allStyles.headerIcon, {paddingRight: 25,} ] }
								/>
							)
			      	}} />

			      <HomeStack.Screen name="Take Kwiz" component={Take} options={{
			    	  headerTitle: 'Take Kwiz',
			    	  headerTitleStyle: { color: '#515d6e' },
			    	  headerTintColor: '#B2BECF',
			      	}} />
			      <HomeStack.Screen name="New Kwiz" component={New} options={{
			    	  headerTitle: 'New Kwiz',
			    	  headerTitleStyle: { color: '#515d6e' },
			    	  headerTintColor: '#B2BECF',
			      	}} />
			      <HomeStack.Screen name="Publish and Share Kwiz" component={Publish} options={{
			    	  headerTitle: 'Published Kwiz',
			    	  headerTitleStyle: { color: '#515d6e' },
			    	  headerTintColor: '#B2BECF',
			      	}} />
			      <HomeStack.Screen name="Kwiz Results" component={Leaderboard} options={{
			    	  headerTitle: 'Kwiz Leaderboard',
			    	  headerTitleStyle: { color: '#515d6e' },
			    	  headerTintColor: '#B2BECF',
			      	}} />
			      <HomeStack.Screen name="Profile" component={Profile} options={{
			    	  headerTitle: 'Profile', 
			    	  headerTitleStyle: { color: '#515d6e' },
			    	  headerTintColor: '#B2BECF',
			      }} />
			      </HomeStack.Navigator>
			      
			      <Modal isVisible={this.state.isModalVisible} 
			      coverScreen={false} 
			      backdropOpacity={0} 
			      onBackdropPress={this.toggleModal} 
			      animationIn="slideInDown"
			      animationOut="slideOutUp"
			      style={[ allStyles.modal ]}>
				      <View style={[ allStyles.card, allStyles.modalView, allStyles.modalViewDark ]}>
				        <Text style={ allStyles.modalTitle }>Create a new Kwiz</Text>
				        <TouchableOpacity onPress={() => {this.toggleModal(); this.props.navigation.navigate('New Kwiz', {type: "Personality"}); }} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.whiteButton ]}>
				        	<TabBarIcon name="md-paw" style={[ allStyles.buttonIcon ]}/>
				        	<Text>Personality</Text>
				        </TouchableOpacity>
				        <TouchableOpacity onPress={() => alert("Coming soon!") } style={[ allStyles.button, allStyles.fullWidthButton, allStyles.whiteButton ]}>
					        <TabBarIcon name="md-trophy" style={[ allStyles.buttonIcon ]}/>
				        	<Text>Trivia</Text>
				        </TouchableOpacity>
				        <TouchableOpacity onPress={this.toggleModal} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.clearButton ]}>
				        	<Text style={ allStyles.whiteText }>Cancel</Text>
				        </TouchableOpacity>
				      </View>
			    </Modal>
			</View>
		  );
	  }
}

const MatchStack = createStackNavigator();

function MatchStackScreen() {
	return (
    <MatchStack.Navigator>
      <MatchStack.Screen name="Match" component={Match} options={{
    	  headerTitle: 'Match', 
    	  headerTitleStyle: { color: '#515d6e' },
    	  headerTintColor: '#B2BECF',
    	  headerRight: () => (
				<TabBarIcon
				onPress={() => alert('This is a button!')}
				name="md-map"
					style={[ allStyles.headerIcon, {paddingRight: 25,} ] }
					/>
				)
      }} />
      <MatchStack.Screen name="Profile" component={Profile} options={{
    	  headerTitle: 'Profile', 
    	  headerTitleStyle: { color: '#515d6e' },
    	  headerTintColor: '#B2BECF',
      }} />
      <MatchStack.Screen name="Friends" component={Friends} options={{
    	  headerTitle: 'Friends', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }}/>
    </MatchStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen({navigation}) {
	return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} options={{
    	  headerTitle: 'Profile', 
    	  headerTitleStyle: { color: '#515d6e' },
    	  headerTintColor: '#B2BECF',
    	  headerRight: () => (
    		<TabBarIcon
  				onPress={() => navigation.navigate("Chats")}
  				name="md-chatbubbles"
  					style={[ allStyles.headerIcon, {paddingRight: 25,} ] }
  				/>  
    	  )
      }} />
      <ProfileStack.Screen name="Friends" component={Friends} options={{
    	  headerTitle: 'Friends', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }}/>
      <ProfileStack.Screen name="Requests" component={Requests} options={{
    	  headerTitle: 'Requests', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }}/>
      <ProfileStack.Screen name="Chats" component={Chats} options={{
    	  headerTitle: 'Chats', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }}/>
      <ProfileStack.Screen name="Chat" component={Chat} options={{
    	  headerTitle: 'Chat', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }}/>
      <ProfileStack.Screen name="Settings" component={Settings} options={{
    	  headerTitle: 'Settings', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }} />
			      <ProfileStack.Screen name="Take Kwiz" component={Take} options={{
			    	  headerTitle: 'Take Kwiz',
			    	  headerTitleStyle: { color: '#515d6e' },
			    	  headerTintColor: '#B2BECF',
			      	}} />
			      <ProfileStack.Screen name="Publish and Share Kwiz" component={Publish} options={{
			    	  headerTitle: 'Published Kwiz',
			    	  headerTitleStyle: { color: '#515d6e' },
			    	  headerTintColor: '#B2BECF',
			      	}} />
			      <ProfileStack.Screen name="Kwiz Results" component={Leaderboard} options={{
			    	  headerTitle: 'Kwiz Leaderboard',
			    	  headerTitleStyle: { color: '#515d6e' },
			    	  headerTintColor: '#B2BECF',
			      	}} />
    </ProfileStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerShown: false });
  
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} 
      tabBarOptions={{
        activeTintColor: '#515d6e',
        inactiveTintColor: '#B2BECF',
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => <TabBarIcon focused={focused} style={{ color: color }} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => <TabBarIcon focused={focused} style={{ color: color }} color={color} name="md-person" />,
        }}
      />
    </BottomTab.Navigator>
  );
}