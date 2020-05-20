import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import { MonoText } from '../components/StyledText';
import QuizPreview from '../components/QuizPreview';
import QuizThumbnail from '../components/QuizThumbnail';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

class HomeScreen extends React.Component {
	
	render() {
		  return (
		    <View style={allStyles.container}>
		      <ScrollView style={allStyles.container}>
		
			      <View style={allStyles.section}>
			      	<Text style={allStyles.sectionTitle}>Daily</Text>
			      	<Text style={allStyles.sectionSubtitle}>These kwizzes are updated every 24 hours. Come back every day and check them out!</Text>
			      	<ScrollView contentContainerStyle={[ styles.quizThumbnailContainer, styles.dailyQuizContainer ]} horizontal= {true} decelerationRate={0} snapToInterval={250} snapToAlignment={"center"}>
			      		<QuizPreview navigation={this.props.navigation}/>
			      		<QuizPreview navigation={this.props.navigation} />
			      		<QuizPreview navigation={this.props.navigation} />
					</ScrollView>
			      </View>
			      <View style={allStyles.section}>
			    	<Text style={allStyles.sectionTitle}>Seasonal</Text>
			      	<Text style={allStyles.sectionSubtitle}>We cycle through categories of kwizzes based on the time of the year. See how you do on them!</Text>
			    	<ScrollView contentContainerStyle={styles.quizThumbnailContainer} horizontal= {true} decelerationRate={0} snapToInterval={150} snapToAlignment={"center"}>
			  			<QuizThumbnail navigation={this.props.navigation} />
			  			<QuizThumbnail navigation={this.props.navigation} />
			  			<QuizThumbnail navigation={this.props.navigation} />
			  		</ScrollView>
			      </View>
			      <View style={allStyles.section}>
			      	<Text style={allStyles.sectionTitle}>Personality</Text>
			      	<Text style={allStyles.sectionSubtitle}>Take these kwizzes to uncover layers of your personality or just explore various fun aspects of life!</Text>
			    	<ScrollView contentContainerStyle={styles.quizThumbnailContainer} horizontal= {true} decelerationRate={0} snapToInterval={150} snapToAlignment={"center"}>
						<QuizThumbnail navigation={this.props.navigation} />
						<QuizThumbnail navigation={this.props.navigation} />
						<QuizThumbnail navigation={this.props.navigation} />
					</ScrollView>
			      </View>
			      <View style={allStyles.section}>
			      	<Text style={allStyles.sectionTitle}>Trivia</Text>
			      	<Text style={allStyles.sectionSubtitle}>See how you measure up to others in your trivia game. Take these kwizzes to find out!</Text>
			    	<ScrollView contentContainerStyle={styles.quizThumbnailContainer} horizontal= {true} decelerationRate={0} snapToInterval={150} snapToAlignment={"center"}>
						<QuizThumbnail navigation={this.props.navigation} />
						<QuizThumbnail navigation={this.props.navigation} />
						<QuizThumbnail navigation={this.props.navigation} />
					</ScrollView>
			      </View>

			      <View style={allStyles.section}>
			      	<Text style={allStyles.sectionTitle}>My Tests</Text>
			      	<Text style={allStyles.sectionSubtitle}>All your homemade kwizzes show up here. Edit them, share them, or even create a new one!</Text>
			    	<ScrollView contentContainerStyle={styles.quizThumbnailContainer} horizontal= {true} decelerationRate={0} snapToInterval={150} snapToAlignment={"center"}>
						<QuizThumbnail navigation={this.props.navigation} />
						<QuizThumbnail navigation={this.props.navigation} />
						<QuizThumbnail navigation={this.props.navigation} />
					</ScrollView>
			      </View>
		      </ScrollView>
		    </View>
		  );
		}
}

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen;

//function DevelopmentModeNotice() {
//  if (__DEV__) {
//    const learnMoreButton = (
//      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
//        Learn more
//      </Text>
//    );
//
//    return (
//      <Text style={styles.developmentModeText}>
//        Development mode is enabled: your app will be slower but you can use useful development
//        tools. {learnMoreButton}
//      </Text>
//    );
//  } else {
//    return (
//      <Text style={styles.developmentModeText}>
//        You are not in development mode: your app will run at full speed.
//      </Text>
//    );
//  }
//}
