import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, RefreshControl, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { observer, inject } from 'mobx-react'

import QuizThumbnail from '../components/QuizThumbnail';
import Loading from '../components/Loading';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

@inject('users') @inject('quizzes') @observer
class HomeScreen extends React.Component {
	state = {
		quizzes: [ 
			[ /* featured */ ],
			[ /* recommended */ ],
			[ /* popular */ ],
			[ /* personality */ ],
			[ /* trivia */ ],
		],
	      refreshing: true,
	}
	
	_onRefresh = () => {
	    this.setState({refreshing: true});
	    this.componentDidMount();
	}
	
	componentDidMount() {
		this.props.quizzes.index()
		.then((res) => {
			var quizzes = [...this.state.quizzes]
			quizzes[0] = res.featured;
			quizzes[1] = res.recommended;
			quizzes[2] = res.popular;
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
		    <View style={allStyles.containerNoPadding}>
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
					      <View style={allStyles.section}>
					      	<Text style={allStyles.sectionTitle}>Featured</Text>
					      	<Text style={allStyles.sectionSubtitle}>These are some of our favorite kwizzes. Check them out and see how you do!</Text>
					      	<ScrollView contentContainerStyle={[ allStyles.quizThumbnailContainer ]} showsHorizontalScrollIndicator={false} horizontal= {true} decelerationRate={0} snapToInterval={250} snapToAlignment={"center"}>
					      	{
					      		quizzesArray(0)
					      	}
							</ScrollView>
					      </View>
					      <View style={allStyles.section}>
					    	<Text style={allStyles.sectionTitle}>Recommended</Text>
					      	<Text style={allStyles.sectionSubtitle}>We think you would like these kwizzes.</Text>
					    	<ScrollView contentContainerStyle={allStyles.quizThumbnailContainer} showsHorizontalScrollIndicator={false} horizontal= {true} decelerationRate={0} snapToInterval={150} snapToAlignment={"center"}>
					    	{
				      			quizzesArray(1)
				      		}
					  		</ScrollView>
					      </View>
					      <View style={[allStyles.section, allStyles.sectionClear]}>
					    	<Text style={allStyles.sectionTitle}>Popular</Text>
					      	<Text style={allStyles.sectionSubtitle}>Take our all-time most popular kwizzes.</Text>
					    	<ScrollView contentContainerStyle={allStyles.quizThumbnailContainer} showsHorizontalScrollIndicator={false} horizontal= {true} decelerationRate={0} snapToInterval={150} snapToAlignment={"center"}>
					    	{
				      			quizzesArray(2)
				      		}
					  		</ScrollView>
					      </View>
				      </View>
			      </ScrollView>
			      )
		    }
		    </View>
		  );
		}
}

export default HomeScreen;