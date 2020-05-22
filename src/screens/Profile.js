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

@inject('users') @observer
class Profile extends React.Component {
	state = {
			quizzes: [ 
				[ // daily
					{
						id: 1348237,
						title: 'Kwiz Title here: Find your personality this should be 50 words max',
						image: 'https://img1.looper.com/img/gallery/things-that-make-no-sense-about-harry-potter/intro-1550086067.jpg',
						user: this.props.user,
					},
					{
						id: 1348237,
						title: 'Kwiz Title here: Find your personality this should be 50 words max',
						image: 'https://img1.looper.com/img/gallery/things-that-make-no-sense-about-harry-potter/intro-1550086067.jpg',
						user: this.props.user,
					},
					{
						id: 1348237,
						title: 'Kwiz Title here: Find your personality this should be 50 words max',
						image: 'https://img1.looper.com/img/gallery/things-that-make-no-sense-about-harry-potter/intro-1550086067.jpg',
						user: this.props.user,
					},
				],
				[ // seasonal
					{
						id: 1348237,
						title: 'Kwiz Title here: Find your personality this should be 50 words max',
						image: 'https://img1.looper.com/img/gallery/things-that-make-no-sense-about-harry-potter/intro-1550086067.jpg',
						user: this.props.user,
					},
					{
						id: 1348237,
						title: 'Kwiz Title here: Find your personality this should be 50 words max',
						image: 'https://img1.looper.com/img/gallery/things-that-make-no-sense-about-harry-potter/intro-1550086067.jpg',
						user: this.props.user,
					},
					{
						id: 1348237,
						title: 'Kwiz Title here: Find your personality this should be 50 words max',
						image: 'https://img1.looper.com/img/gallery/things-that-make-no-sense-about-harry-potter/intro-1550086067.jpg',
						user: this.props.user,
					},
				],
			],
		}
	
	render () {
		let quizzesArray = (type) => {
			return this.state.quizzes[type].map(( item, key ) =>
			{
				return item != undefined ? (
						<QuizThumbnail 
								quiz={item}
								key={key}
								type={ type == 0 ? "preview" : "thumbnail"}
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
					      			quizzesArray(0)
					      		}
								</ScrollView>
						      </View>
					</ScrollView>
				</View>
		)
	}
}
export default Profile;