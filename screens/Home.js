import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, RefreshControl, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { observer, inject } from 'mobx-react'

import QuizThumbnail from '../components/QuizThumbnail';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

@inject('users') @inject('quizzes') @observer
class HomeScreen extends React.Component {
	state = {
		quizzes: [ 
			[ /* daily */ ],
			[ /* seasonal */ ],
			[ /* personality */ ],
			[ /* trivia */ ],
		],
	      refreshing: false,
	}
	
	_onRefresh = () => {
	    this.setState({refreshing: true});
	    this.componentDidMount();
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
		      this.setState({refreshing: false});
		})
		.catch((errors) => {
			console.log(errors);
		})
	}
	
	render() {
		
		let quizzesArray = (type) => {
			return this.state.quizzes[type].map(( item, key ) =>
			{
				return item != undefined && (
						<QuizThumbnail 
								quiz={item}
								key={key}
								type={ type == 0 ? "preview" : "thumbnail"}
								navigation={this.props.navigation}/>
					)
			});
		}
		
		  return (
		    <View style={allStyles.container}>
		    {
				!this.state.refreshing && (
			      <ScrollView style={allStyles.contentContainer}
			      		refreshControl={
			              <RefreshControl
			              refreshing={this.state.refreshing}
			              onRefresh={this._onRefresh}
			            />
			          }>
			      	
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
			      			quizzesArray(2)
			      		}
						</ScrollView>
				      </View>
			      </ScrollView>
			      )
		    }
		    </View>
		  );
		}
}

export default HomeScreen;