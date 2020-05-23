import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react' 
import Icon from 'react-native-vector-icons/FontAwesome'
import notifications from '../notifications'

import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';
import ProfileCard from '../components/ProfileCard';
import QuizThumbnail from '../components/QuizThumbnail';

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @inject('quizzes') @observer
class Profile extends React.Component {
	state = {
			quizzes: [ 
				[ /* daily */ ],
				[ /* seasonal */ ],
				[ /* personality */ ],
				[ /* trivia */ ],
			],
		}
	
	componentDidMount() {
		this.props.quizzes.index()
		.then((res) => {
			var quizzes = [...this.state.quizzes]
			quizzes[0] = res;
			quizzes[1] = res;
			quizzes[2] = res;
			quizzes[3] = res;
			this.setState({quizzes})
		})
		.catch((error) => {
			console.log(error);
		})
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
			});
		}
		
		return (
				<View style={allStyles.container}>
			      <ScrollView style={allStyles.container}>
						<ProfileCard user={this.props.users.user} navigation={this.props.navigation} />
						<View style={allStyles.section}>
							<Text style={[ allStyles.sectionTitle, {marginTop: 20} ]}>Kwiz Feed</Text>
					      	<Text style={allStyles.sectionSubtitle}>{this.props.users.user.name} has taken these kwizzes. Take them to find out if you got the same results!</Text>
					      	<ScrollView contentContainerStyle={[ allStyles.quizThumbnailContainer ]} horizontal= {true} decelerationRate={0} snapToInterval={250} snapToAlignment={"center"}>
					      	{
				      			quizzesArray(0)
				      		}
							</ScrollView>
					   </View>
					   <View style={allStyles.section}>
						      	<Text style={allStyles.sectionTitle}>My Tests</Text>
						      	<Text style={allStyles.sectionSubtitle}>All your homemade kwizzes show up here. Edit them, share them, or even create a new one in Home!</Text>
						    	<ScrollView contentContainerStyle={allStyles.quizThumbnailContainer} horizontal= {true} decelerationRate={0} snapToInterval={250} snapToAlignment={"center"}>
						    	{
					      			quizzesArray(1)
					      		}
								</ScrollView>
						      </View>
					</ScrollView>
				</View>
		)
	}
}
export default Profile;