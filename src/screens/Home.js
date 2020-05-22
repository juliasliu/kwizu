import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import { MonoText } from '../components/StyledText';
import QuizThumbnail from '../components/QuizThumbnail';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

class HomeScreen extends React.Component {
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
	
	render() {
		
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
		
			      <View style={allStyles.section}>
			      	<Text style={allStyles.sectionTitle}>Daily</Text>
			      	<Text style={allStyles.sectionSubtitle}>These kwizzes are updated every 24 hours. Come back every day and check them out!</Text>
			      	<ScrollView contentContainerStyle={[ allStyles.quizThumbnailContainer ]} horizontal= {true} decelerationRate={0} snapToInterval={250} snapToAlignment={"center"}>
			      		{
			      			quizzesArray(0)
			      		}
					</ScrollView>
			      </View>
			      <View style={allStyles.section}>
			    	<Text style={allStyles.sectionTitle}>Seasonal</Text>
			      	<Text style={allStyles.sectionSubtitle}>We cycle through categories of kwizzes based on the time of the year. See how you do on them!</Text>
			    	<ScrollView contentContainerStyle={allStyles.quizThumbnailContainer} horizontal= {true} decelerationRate={0} snapToInterval={150} snapToAlignment={"center"}>
			    	{
		      			quizzesArray(1)
		      		}
			  		</ScrollView>
			      </View>
			      <View style={allStyles.section}>
			      	<Text style={allStyles.sectionTitle}>Personality</Text>
			      	<Text style={allStyles.sectionSubtitle}>Take these kwizzes to uncover layers of your personality or just explore various fun aspects of life!</Text>
			    	<ScrollView contentContainerStyle={allStyles.quizThumbnailContainer} horizontal= {true} decelerationRate={0} snapToInterval={150} snapToAlignment={"center"}>
			    	{
		      			quizzesArray(1)
		      		}
					</ScrollView>
			      </View>
			      <View style={allStyles.section}>
			      	<Text style={allStyles.sectionTitle}>Trivia</Text>
			      	<Text style={allStyles.sectionSubtitle}>See how you measure up to others in your trivia game. Take these kwizzes to find out!</Text>
			    	<ScrollView contentContainerStyle={allStyles.quizThumbnailContainer} horizontal= {true} decelerationRate={0} snapToInterval={150} snapToAlignment={"center"}>
			    	{
		      			quizzesArray(1)
		      		}
					</ScrollView>
			      </View>
		      </ScrollView>
		    </View>
		  );
		}
}

export default HomeScreen;