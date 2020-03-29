import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';
import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

export default function HomeScreen() {
  return (
    <View style={allStyles.container}>
      <ScrollView style={allStyles.container} contentContainerStyle={styles.contentContainer}>

      <View style={styles.box}>
      	<Text style={styles.boxTitle}>Daily</Text>
      	<ScrollView contentContainerStyle={styles.quizThumbnailContainer} horizontal= {true} decelerationRate={0} snapToInterval={250} snapToAlignment={"center"}>
      		<TouchableOpacity onPress={handleHelpPress} style={styles.quizPreview}>
		        <Text style={styles.quizThumbnailTitle}>Find your personality this should be 50 words max</Text>
		        <Text style={styles.quizThumbnailDescription}>Hi this is a description of the quiz hahahh trying to fill up space it should overflow</Text>
		      </TouchableOpacity>
		      <TouchableOpacity onPress={handleHelpPress} style={styles.quizPreview}>
		        <Text style={styles.quizThumbnailTitle}>Find your personality this should be 50 words max</Text>
		        <Text style={styles.quizThumbnailDescription}>Hi this is a description of the quiz hahahh trying to fill up space it should overflow</Text>
		      </TouchableOpacity>
		      <TouchableOpacity onPress={handleHelpPress} style={styles.quizPreview}>
		        <Text style={styles.quizThumbnailTitle}>Find your personality this should be 50 words max</Text>
		        <Text style={styles.quizThumbnailDescription}>Hi this is a description of the quiz hahahh trying to fill up space it should overflow</Text>
		      </TouchableOpacity>
		</ScrollView>
      </View>
      <View style={styles.box}>
    	<Text style={styles.boxTitle}>Seasonal</Text>
    	<ScrollView contentContainerStyle={styles.quizThumbnailContainer} horizontal= {true} decelerationRate={0} snapToInterval={150} snapToAlignment={"center"}>
  		<TouchableOpacity onPress={handleHelpPress} style={styles.quizThumbnail}>
	        <Text style={styles.quizThumbnailTitle}>Find your personality this should be 50 words max</Text>
	        <Text style={styles.quizThumbnailDescription}>Hi this is a description of the quiz hahahh trying to fill up space it should overflow</Text>
	      </TouchableOpacity>
	      <TouchableOpacity onPress={handleHelpPress} style={styles.quizThumbnail}>
	        <Text style={styles.quizThumbnailTitle}>Find your personality this should be 50 words max</Text>
	        <Text style={styles.quizThumbnailDescription}>Hi this is a description of the quiz hahahh trying to fill up space it should overflow</Text>
	      </TouchableOpacity>
	      <TouchableOpacity onPress={handleHelpPress} style={styles.quizThumbnail}>
	        <Text style={styles.quizThumbnailTitle}>Find your personality this should be 50 words max</Text>
	        <Text style={styles.quizThumbnailDescription}>Hi this is a description of the quiz hahahh trying to fill up space it should overflow</Text>
	      </TouchableOpacity>
	</ScrollView>
      </View>
      <View style={styles.box}>
      	<Text style={styles.boxTitle}>Personality</Text>
      </View>
      <View style={styles.box}>
      	<Text style={styles.boxTitle}>Trivia</Text>
      </View>
      
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}
