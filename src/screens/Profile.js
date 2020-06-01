import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react' 
import Icon from 'react-native-vector-icons/FontAwesome'
import notifications from '../notifications'

import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import TabBarIcon from '../components/TabBarIcon';

import { MonoText } from '../components/StyledText';
import ProfileCard from '../components/ProfileCard';
import QuizThumbnail from '../components/QuizThumbnail';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @inject('quizzes') @observer
class Profile extends React.Component {
	state = {
			user: {},
			quizzes: [ 
				[ /* kwiz feed */ ],
				[ /* my tests */ ],
			],
			refreshing: true,
			isOwnProfile: true,			// true if viewing own profile in stack, false if viewing others
			sentRequest: false,
			receivedRequest: false,
			isFriends: false,
		}
	
	_onRefresh = () => {
	    this.setState({refreshing: true});
	    this.componentDidMount();
	  }
	
	componentDidMount() {
		var user_id;
		if (!this.props.route.params) user_id = this.props.users.id;
		else user_id = this.props.route.params.user_id;
		
		this.props.users.show(user_id)
		.then((res) => {
			console.log("found user!!")
			console.log(res)
			var quizzes = [...this.state.quizzes]
			quizzes[0] = res.taken_quizzes;
			quizzes[1] = res.quizzes;
			this.setState({quizzes: quizzes, user: res}, this.loadUser)
		})
		.catch((error) => {
			console.log("o no")
			console.log(error);
		})

	}
	
	loadUser() {
		// check if profile user is same as logged in user
		if (this.state.user.id == this.props.users.user.id) {
			this.setState({isOwnProfile: true})
			this.setState({refreshing: false});
		} else {
			// only show public quizzes if not same user
			this.setState({isOwnProfile: false})
			var quizzes = [...this.state.quizzes]
			quizzes[1] = quizzes[1].filter(function(el) {
				return el.public;
			});
			this.setState({quizzes})
			
			let otherUserId = this.state.user.id;
			this.setState({
				isFriends: this.props.users.user.friends.filter(function(e) { return e.id === otherUserId; }).length > 0,
				sentRequest: this.props.users.user.friends_requested.filter(function(e) { return e.id === otherUserId; }).length > 0,
				receivedRequest: this.props.users.user.friends_received.filter(function(e) { return e.id === otherUserId; }).length > 0,
			});
			this.setState({refreshing: false});
		}
		
	}
	
	render () {
		let quizzesArray = (type) => {
			return this.state.quizzes[type].map(( item, key ) =>
			{
				return item != undefined ? (
						<QuizThumbnail 
						quiz={item}
						key={key}
						type={"preview"}
						navigation={this.props.navigation}/>
				) : null
			})
		}
		
		return (!this.state.refreshing) ? (
				<View style={allStyles.container}>
			      <ScrollView style={allStyles.container}
		      		refreshControl={
			              <RefreshControl
			              refreshing={this.state.refreshing}
			              onRefresh={this._onRefresh}
			            />
			          }>
						<ProfileCard user={this.state.user}
									navigation={this.props.navigation}
									isOwnProfile={this.state.isOwnProfile}
									sentRequest={this.state.sentRequest}
									receivedRequest={this.state.receivedRequest}
									isFriends={this.state.isFriends}
						/>
						<View style={allStyles.section}>
							<Text style={[ allStyles.sectionTitle, {marginTop: 20} ]}>Kwiz Feed</Text>
					      	{ this.state.isOwnProfile ?
					      		<Text style={allStyles.sectionSubtitle}>The kwizzes you have taken will show up here. See if your friends also got the same results!</Text> 
					      		: <Text style={allStyles.sectionSubtitle}>{this.state.user.name} has taken these kwizzes. Take them to find out if you got the same results!</Text> }
					      	
					      	{
					      		(this.state.quizzes[0].length > 0) ? (
					      				<ScrollView contentContainerStyle={[ allStyles.quizThumbnailContainer ]} horizontal= {true} decelerationRate={0} snapToInterval={250} snapToAlignment={"center"}>
					      				{
					      					quizzesArray(0)
					      				}
					      				</ScrollView>
					      		) : (
					      				this.state.isOwnProfile ? (
					      						<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.greenButton ]} onPress={() => this.props.navigation.navigate("Home")}>
												<TabBarIcon name="md-happy" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							      				<Text style={ allStyles.whiteText }>Take a Kwiz</Text>
							      				</TouchableOpacity>
					      				) : (
					      						<View>
						      						<Text style={[ allStyles.sectionMessage ]}>{this.state.user.name} has not taken any kwizzes yet.</Text>
						      					</View>	
					      					)
					      		)
					      	}
					      	
					   </View>
					   <View style={allStyles.section}>
					   		{ this.state.isOwnProfile ?      	
					   				(
									   		<View>
						   						<Text style={allStyles.sectionTitle}>Your Kwizzes</Text>
						   						<Text style={allStyles.sectionSubtitle}>All your homemade kwizzes show up here. Edit them, share them, or even create a new one in Home!</Text>
										    </View>
					   					)
						      		: (
									   		<View>
						   						<Text style={allStyles.sectionTitle}>{this.state.user.name}'s Kwizzes</Text>
							      				<Text style={allStyles.sectionSubtitle}>Check out the kwizzes {this.state.user.name} has created! Share the results that you got with your friends!</Text>
										    </View>
						      				)
						      		}
						      	{
						      		(this.state.quizzes[1].length > 0) ? (
						      				<ScrollView contentContainerStyle={[ allStyles.quizThumbnailContainer ]} horizontal= {true} decelerationRate={0} snapToInterval={250} snapToAlignment={"center"}>
						      				{
						      					quizzesArray(1)
						      				}
						      				</ScrollView>
						      		) : (
						      				this.state.isOwnProfile ? (
						      						<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.greenButton ]} onPress={() => this.props.navigation.navigate("Home")}>
													<TabBarIcon name="md-create" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
								      				<Text style={ allStyles.whiteText }>Create a Kwiz</Text>
								      				</TouchableOpacity>
						      				) : (
						      					<View>
						      						<Text style={[ allStyles.sectionMessage ]}>{this.state.user.name} has not created any kwizzes yet.</Text>
						      					</View>
						      				)
						      				
						      		)
						      	}
						      	
						      </View>
					</ScrollView>
				</View>
		) : null
	}
}
export default Profile;