import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';

import { Provider } from 'mobx-react';
import {users, chats, quizzes} from './stores';

import PushNotificationManager from './PushNotifications'

import Main from './screens/Main';

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
				{Platform.OS === 'ios' && <StatusBar barStyle="default" /> }
				<Provider users={users} quizzes={quizzes} chats={chats}>
					<PushNotificationManager>
						<Main/>
					</PushNotificationManager>
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
