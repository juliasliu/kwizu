import React, { useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import useCachedResources from './hooks/useCachedResources';

import { Provider } from 'mobx-react';
import {users, chats, quizzes} from './stores';

import Main from './screens/Main';

export default function App(props) {
	//Register background handler
	messaging().setBackgroundMessageHandler(async remoteMessage => {
	  console.log('Message handled in the background!', remoteMessage);
	});
	
	useEffect(() => {
		requestUserPermission();
		const unsubscribe = messaging().onMessage(async remoteMessage => {
			Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
		});
//
		return unsubscribe;
	}, []);
	
	const isLoadingComplete = useCachedResources();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
				<View style={styles.container}>
				{Platform.OS === 'ios' && <StatusBar barStyle="default" /> }
					<Provider users={users} quizzes={quizzes} chats={chats}>
						<Main/>
					</Provider>
				</View>
		);
	}
}

async function requestUserPermission() {
	const authStatus = await messaging().requestPermission();
	const enabled =
		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
		authStatus === messaging.AuthorizationStatus.PROVISIONAL;

	if (enabled) {
		getFcmToken();
		console.log('Authorization status:', authStatus);
	}
}

getFcmToken = async () => {
	const fcmToken = await messaging().getToken();
	if (fcmToken) {
		console.log(fcmToken);
		console.log("Your Firebase Token is:", fcmToken);
	} else {
		console.log("Failed", "No token received");
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
