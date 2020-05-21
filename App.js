import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import App from './src/main';

import { Provider } from 'mobx-react'; 
import {users, chats, quizzes} from './src/stores';

export default function Kwizu(props) { 
		return (
			<View style={styles.container}>
				{Platform.OS === 'ios' && <StatusBar barStyle="default" /> }
				<Provider users={users} chats={chats}>
					<App/>
				</Provider>
			</View>
		)
}

				const styles = StyleSheet.create({
					container: {
						flex: 1,
						backgroundColor: '#fff',
					},
				});