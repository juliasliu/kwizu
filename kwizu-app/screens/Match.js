import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import ProfileCard from '../components/ProfileCard';

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
		      <ScrollView style={allStyles.container}>
			    <View style={[allStyles.container, styles.matchContainer]}>
			        <View style={styles.matchProfileContainer}>
			        	<ProfileCard navigation={this.props.navigation}/>
			        </View>
			        <View style={styles.matchButtonContainer}>
			        	<TouchableOpacity onPress={this.handleHelpPress} style={[ allStyles.button, allStyles.halfWidthButton, allStyles.redButton ]}>
			        		<Text style={ allStyles.whiteText }>Match</Text>
			        	</TouchableOpacity>
			        </View>
			        <View style={styles.matchProfileContainer}>
				        <View style={styles.matchProfileContainer}>
				        	<ProfileCard navigation={this.props.navigation} />
				        </View>
			        </View>
		        </View>
		      </ScrollView>
	  );
	}
}

export default Match;