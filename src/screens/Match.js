import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';
import allStyles from '../styles/AllScreens';
import styles from '../styles/MatchScreen';

export default function HomeScreen() {
  return (
    <View style={allStyles.container}>
      <ScrollView style={allStyles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.matchProfileContainer}>
        	<View style={styles.profilePreview}>
          		<Image source={require('../assets/images/robot-dev.png')} style={styles.profilePreviewPhoto}/>
          		<Text style={styles.profilePreviewName}>my name</Text>
          		<Text style={styles.profilePreviewCaption}>hi im a quaranteeen asdkjfhaj</Text>
          	</View>
        </View>
        <View style={styles.matchButtonContainer}>
        	<TouchableOpacity onPress={handleHelpPress} style={styles.matchButton}>
        		<Text>Match</Text>
        	</TouchableOpacity>
        </View>
        <View style={styles.matchProfileContainer}>
	        <View style={styles.profilePreview}>
		  		<Image source={require('../assets/images/robot-dev.png')} style={styles.profilePreviewPhoto}/>
		  		<Text style={styles.profilePreviewName}>my name</Text>
		  		<Text style={styles.profilePreviewCaption}>hi im a quaranteeen asdkjfhaj</Text>
		  	</View>
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
