import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import TabBarIcon from '../components/TabBarIcon';
import Modal from 'react-native-modal';
import { StackActions } from '@react-navigation/native';

import ProfileCard from '../components/ProfileCard';
import QuizThumbnail from '../components/QuizThumbnail';
import Loading from '../components/Loading';

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
		    isModalVisible: false,
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
			var quizzes = [...this.state.quizzes]
			quizzes[0] = res.taken_quizzes.slice(0, 5);
			quizzes[1] = res.quizzes.slice(0, 5);
			this.setState({quizzes: quizzes, user: res}, this.loadUser)
		})
		.catch((errors) => {
			console.log("o no")
			console.log(errors);
			this.setState({isModalVisible: true});
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
			this.props.navigation.setOptions({headerRight: null})
			this.setState({refreshing: false});
		}

	}

	render () {
		let quizzesArray = (type) => {
			return this.state.quizzes[type].map(( item, key ) =>
			{
				return item != undefined && (
						<QuizThumbnail
						quiz={item}
						userId={this.state.user.id}
						key={key}
						type={"thumbnail"}
						isOwnProfile={this.state.isOwnProfile}
						navigation={this.props.navigation}/>
				)
			})
		}

		return <View style={allStyles.containerNoPadding}>
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
									<ProfileCard
										user={this.state.user}
										navigation={this.props.navigation}
									/>
									{
										(this.state.isOwnProfile || this.state.isFriends) ? (
											<View>
											<View style={[allStyles.section, {marginTop: 10}]}>
												<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
													<Text style={[ allStyles.sectionTitle ]}>Kwiz Feed</Text>
									   				<TouchableOpacity onPress={() => this.props.navigation.push("Profile Kwizzes", {user_id: this.state.user.id, type: "taken"})}>
											   			<Text style={allStyles.sectionSubtitle}>View all</Text>
											   		</TouchableOpacity>
									   			</View>
										      	{ this.state.isOwnProfile ?
										      		<Text style={allStyles.sectionSubtitle}>The kwizzes you have taken will show up here. See if your friends also got the same results!</Text>
										      		: <Text style={allStyles.sectionSubtitle}>{this.state.user.name} has taken these kwizzes. Take them to find out if you got the same results!</Text> }

										      	{
										      		(this.state.quizzes[0].length > 0) ? (
										      				<ScrollView contentContainerStyle={[ allStyles.quizThumbnailContainer ]} showsHorizontalScrollIndicator={false} horizontal= {true} decelerationRate={0} snapToInterval={250} snapToAlignment={"center"}>
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
										   <View style={[allStyles.section, allStyles.sectionClear]}>
										   		{ this.state.isOwnProfile ?
										   				(
														   		<View>
											   						<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
														   				<Text style={allStyles.sectionTitle}>Your Kwizzes</Text>
														   				<TouchableOpacity onPress={() => this.props.navigation.push("Profile Kwizzes", {user_id: this.state.user.id, type: "created"})}>
														   					<Text style={allStyles.sectionSubtitle}>View all</Text>
														   				</TouchableOpacity>
														   			</View>
											   						<Text style={allStyles.sectionSubtitle}>All your homemade kwizzes show up here. Edit them, share them, or even create a new one in Home!</Text>
															    </View>
										   					)
											      		: (
														   		<View>
														   			<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
														   				<Text style={allStyles.sectionTitle}>{this.state.user.name}'s Kwizzes</Text>
														   				<TouchableOpacity onPress={() => this.props.navigation.push("Profile Kwizzes", {user_id: this.state.user.id, type: "created"})}>
																	   		<Text style={allStyles.sectionSubtitle}>View all</Text>
																	   	</TouchableOpacity>
															   		</View>
												      				<Text style={allStyles.sectionSubtitle}>Check out the kwizzes {this.state.user.name} has created! Share the results that you got with your friends!</Text>
															    </View>
											      				)
											      		}
											      	{
											      		(this.state.quizzes[1].length > 0) ? (
													      		<ScrollView contentContainerStyle={[ allStyles.quizThumbnailContainer ]} showsHorizontalScrollIndicator={false} horizontal= {true} decelerationRate={0} snapToInterval={250} snapToAlignment={"center"}>
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
											</View>
										) : (
											<View style={[allStyles.section, allStyles.sectionClear]}>
					      						<Text style={[ allStyles.sectionMessage ]}>You must be friends with {this.state.user.name} to view their profile.</Text>
					      					</View>
										)
									}
									  </View>
								</ScrollView>
						)
				}
					<Modal isVisible={this.state.isModalVisible} 
				      coverScreen={false} 
				      backdropOpacity={0} 
				      onBackdropPress={() => this.props.navigation.navigate("Home")} 
				      animationIn="slideInDown"
				      animationOut="slideOutUp"
				      style={[ allStyles.modal ]}>
				      <View style={[ allStyles.card, allStyles.modalView, allStyles.modalViewDanger ]}>
				        <Text style={ allStyles.modalTitle }>Oh no, something went wrong.</Text>
				        <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.whiteButton ]}>
				        	<Text>Go to Home</Text>
				        </TouchableOpacity>
				        <TouchableOpacity onPress={() => this.props.navigation.dispatch(StackActions.pop(1))} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.clearButton ]}>
				        	<Text style={ allStyles.whiteText }>Go Back</Text>
				        </TouchableOpacity>
				      </View>
				    </Modal>
				</View>
	}
}
export default Profile;
