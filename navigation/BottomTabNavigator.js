import * as React from 'react';
import {
	Text,
	Button,
	TouchableOpacity,
	View,
	Linking,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Modal from 'react-native-modal';

import TabBarIcon from '../components/TabBarIcon';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Take from '../screens/Take';
import New from '../screens/New';
import ViewTake from '../screens/ViewTake';
import Publish from '../screens/Publish';
import Leaderboard from '../screens/Leaderboard';

import Match from '../screens/Match';

import Profile from '../screens/Profile' 
import Friends from '../screens/Friends' 
import Requests from '../screens/Requests' 
import Chats from '../screens/Chats' 
import Chat from '../screens/Chat' 
import Customize from '../screens/Customize'
import Settings from '../screens/Settings'

import PushNotifications from '../screens/settings/PushNotifications'
import FacebookSettings from '../screens/settings/FacebookSettings'
import ChangeMyPassword from '../screens/settings/ChangeMyPassword'
import ReportAProblem from '../screens/settings/ReportAProblem'
import ReportAUser from '../screens/settings/ReportAUser'
import FlagContent from '../screens/settings/FlagContent'
import FrequentlyAskedQuestions from '../screens/settings/FrequentlyAskedQuestions'
import HelpCenter from '../screens/settings/HelpCenter'
import AboutUs from '../screens/settings/AboutUs'
import CommunityGuidelines from '../screens/settings/CommunityGuidelines'
import TermsOfUse from '../screens/settings/TermsOfUse'
import PrivacyPolicy from '../screens/settings/PrivacyPolicy'

import allStyles from '../styles/AllScreens';
import * as Colors from '../constants/Colors.js';

const HomeStack = createStackNavigator();

class HomeStackScreen extends React.Component {
	state = {
			isModalVisible: false,
	};

	toggleModal = () => {
		this.setState({isModalVisible: !this.state.isModalVisible});
	};
	
	componentDidMount() {
		if (Platform.OS === 'android') { // B
			Linking.getInitialURL().then(url => {
				this.navigate(url);
			});
		} else {
			Linking.getInitialURL().then(url => {
				if (url) this.navigate(url);
			});
			Linking.addEventListener('url', this.handleOpenURL);
			console.log("here")
		}
	}
	
	/* Deep Linking Routes */

	componentWillUnmount() { // C
		Linking.removeEventListener('url', this.handleOpenURL);
	}
	handleOpenURL = (event) => { // D
		console.log("hi " + event)
		this.navigate(event.url);
	}
	navigate = (url) => { // E
		console.log("hi " + url)
		const { navigate } = this.props.navigation;
		const route = url.replace(/.*?:\/\//g, '');
		const id = route.match(/\/([^\/]+)\/?$/)[1];
		const routeName = route.split('/')[0];

		if (routeName === 'quizzes') {
			navigate('Take Kwiz', { quiz_id: id })
		} else if (routeName === 'users') {
			navigate('Profile', { user_id: id })
		}
	}

	  render() {
			return (
			<View style={{flex: 1}}>
				<HomeStack.Navigator>
			      <HomeStack.Screen name="Home" component={Home} options={{
			    	  headerTitle: 'Kwizu', 
			    	  headerTitleStyle: { color: '#515d6e' },
			    	  headerTintColor: '#B2BECF',
			    	  headerLeft: () => (
								<TabBarIcon
								onPress={() => this.props.navigation.push("Search")}
								name="md-search"
									style={[ allStyles.headerIcon ]}
									/>
								),
			    	  headerRight: () => (
							<TabBarIcon
							onPress={this.toggleModal}
							name="md-add"
								style={[ allStyles.headerIcon ]}
								/>
							)
			      	}} />
			      <HomeStack.Screen name="Search" component={Search} options={{
			    	  headerTitle: 'Search', 
			    	  headerTitleStyle: { color: '#515d6e' },
			    	  headerTintColor: '#B2BECF',
			      }} />
			      <HomeStack.Screen name="Take Kwiz" component={Take} options={{
			    	  headerTitle: 'Take Kwiz',
			    	  headerTitleStyle: { color: '#515d6e' },
			    	  headerTintColor: '#B2BECF',
			      	}} />
			      <HomeStack.Screen name="Kwiz Result" component={ViewTake} options={{
			    	  headerTitle: 'View Kwiz Result',
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
			      <HomeStack.Screen name="Friends" component={Friends} options={{
			    	  headerTitle: 'Friends', 
					  headerTitleStyle: { color: '#515d6e' },
					  headerTintColor: '#B2BECF',
			      }}/>
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
					style={[ allStyles.headerIcon ]}
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
    			  onPress={() => navigation.push("Settings") }
    			  name="md-settings"
    				  style={[ allStyles.headerIcon ]}
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
		  headerTintColor: '#B2BECF'
      }}/>
      <ProfileStack.Screen name="Chat" component={Chat} options={{
    	  headerTitle: 'Chat', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }}/>
      <ProfileStack.Screen name="Customize" component={Customize} options={{
    	  headerTitle: 'Edit Profile', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }} />
      <ProfileStack.Screen name="Settings" component={Settings} options={{
    	  headerTitle: 'Settings', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }} />	
      <ProfileStack.Screen name="Push Notifications" component={PushNotifications} options={{
    	  headerTitle: 'Push Notifications', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }} />	
      <ProfileStack.Screen name="Facebook Settings" component={FacebookSettings} options={{
    	  headerTitle: 'Facebook Settings', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }} />	
      <ProfileStack.Screen name="Change My Password" component={ChangeMyPassword} options={{
    	  headerTitle: 'Change My Password', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }} />	
      <ProfileStack.Screen name="Report a Problem" component={ReportAProblem} options={{
    	  headerTitle: 'Report a Problem', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }} />	
      <ProfileStack.Screen name="Report a User" component={ReportAUser} options={{
    	  headerTitle: 'Report a User', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }} />	
      <ProfileStack.Screen name="Flag Content" component={FlagContent} options={{
    	  headerTitle: 'Flag Content', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }} />	
      <ProfileStack.Screen name="Frequently Asked Questions" component={FrequentlyAskedQuestions} options={{
    	  headerTitle: 'FAQ', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }} />	
      <ProfileStack.Screen name="Help Center" component={HelpCenter} options={{
    	  headerTitle: 'Help Center', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }} />	
      <ProfileStack.Screen name="About Us" component={AboutUs} options={{
    	  headerTitle: 'About Us', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }} />	
      <ProfileStack.Screen name="Community Guidelines" component={CommunityGuidelines} options={{
    	  headerTitle: 'Community Guidelines', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }} />	
      <ProfileStack.Screen name="Terms of Use" component={TermsOfUse} options={{
    	  headerTitle: 'Terms of Use', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }} />	
      <ProfileStack.Screen name="Privacy Policy" component={PrivacyPolicy} options={{
    	  headerTitle: 'Privacy Policy', 
		  headerTitleStyle: { color: '#515d6e' },
		  headerTintColor: '#B2BECF',
      }} />	
      <ProfileStack.Screen name="Take Kwiz" component={Take} options={{
    	  headerTitle: 'Take Kwiz',
    	  headerTitleStyle: { color: '#515d6e' },
    	  headerTintColor: '#B2BECF',
      }} />
      <ProfileStack.Screen name="Kwiz Result" component={ViewTake} options={{
    	  headerTitle: 'View Kwiz Result',
    	  headerTitleStyle: { color: '#515d6e' },
    	  headerTintColor: '#B2BECF',
      	}} />
      <ProfileStack.Screen name="New Kwiz" component={New} options={{
    	  headerTitle: 'New Kwiz',
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