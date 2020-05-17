import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';
import allStyles from '../styles/AllScreens';
import styles from '../styles/MatchScreen';

class Match extends React.Component {

	handleLearnMorePress() {
	  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
	}

	handleHelpPress() {
	  WebBrowser.openBrowserAsync(
	    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
	  );
	}
	
	render() {
		return (
		    <View style={allStyles.container}>
		      <ScrollView style={allStyles.container} contentContainerStyle={allStyles.contentContainer}>
		        <View style={styles.matchProfileContainer}>
		        	<View style={[ allStyles.card, styles.profilePreview ]}>
		          		<Image source={require('../assets/images/robot-dev.png')} style={styles.profilePreviewPhoto}/>
		          		<Text style={styles.profilePreviewName}>my name</Text>
		          		<Text style={styles.profilePreviewCaption}>hi im a quaranteeen asdkjfhaj</Text>
		          	</View>
		        </View>
		        <View style={styles.matchButtonContainer}>
		        	<TouchableOpacity onPress={this.handleHelpPress} style={[ allStyles.button, allStyles.halfWidthButton, allStyles.redButton ]}>
		        		<Text style={ allStyles.whiteText }>Match</Text>
		        	</TouchableOpacity>
		        </View>
		        <View style={styles.matchProfileContainer}>
			        <View style={[ allStyles.card, styles.profilePreview ]}>
				  		<Image source={require('../assets/images/robot-dev.png')} style={styles.profilePreviewPhoto}/>
				  		<Text style={styles.profilePreviewName}>my name</Text>
				  		<Text style={styles.profilePreviewCaption}>hi im a quaranteeen asdkjfhaj</Text>
				  	</View>
		        </View>
		      </ScrollView>
		    </View>
	  );
	}
}

export default Match;