import React, { useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { InAppNotificationProvider } from 'react-native-in-app-notification';
import messaging from '@react-native-firebase/messaging';

import useCachedResources from './hooks/useCachedResources';

import { Provider } from 'mobx-react';
import {users, chats, quizzes} from './stores';

import Main from './screens/Main';
import NotificationBody from './components/NotificationBody';

export default function App(props) {
	
	const isLoadingComplete = useCachedResources();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
				<View style={styles.container}>
				{Platform.OS === 'ios' && <StatusBar barStyle="default" /> }
					<Provider users={users} quizzes={quizzes} chats={chats}>
						<InAppNotificationProvider backgroundColour={"transparent"} notificationBodyComponent={NotificationBody}>
							<Main/>
						</InAppNotificationProvider>
					</Provider>
				</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
