import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text, Switch, FlatList, Linking,
	ActivityIndicator, TouchableOpacity, View, Button, TextInput, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import ImagePicker from 'react-native-image-picker';

import TabBarIcon from '../../components/TabBarIcon';
import SwitchItem from '../../components/SwitchItem';

import allStyles from '../../styles/AllScreens';
import styles from '../../styles/ProfileScreen';

@inject('users') @observer
class Settings extends React.Component {
	state= {
			DATA: [
				{
					id: 0,
					title: 'Daily updates',
					isEnabled: true,
				},
				{
					id: 1,
					title: 'Users took your kwiz',
					isEnabled: true,
				},
				{
					id: 2,
					title: 'Friends took the same kwiz',
					isEnabled: true,
				},
				{
					id: 3,
					title: 'Reminders to publish drafts',
					isEnabled: true,
				},
				{
					id: 4,
					title: 'Chat messages received',
					isEnabled: true,
				},
				{
					id: 5,
					title: 'Friend requests received',
					isEnabled: true,
				},
				{
					id: 6,
					title: 'Friend requests accepted',
					isEnabled: true,
				},
			],
	}
	
	setIsEnabled(id) {
		let data = [...this.state.DATA]
		let index = data.findIndex(elem => elem.id == id)
		data[index].isEnabled = !data[index].isEnabled
		this.setState({DATA: data})
	}

	render () {
		
		return (
			<ScrollView
				ref={ref => {
					this.scrollview_ref = ref;
				}}>
				<View style={allStyles.container}>
					<View style={allStyles.card}>
						<FlatList 
						data={this.state.DATA} 
						keyExtractor={(item, index) => item.id}
						scrollEnabled={false}
						showsVerticalScrollIndicator={false} 
						renderItem={({item}) => {
							return ( 
									<SwitchItem
									id={item.id}
									style={[(item.id === this.state.DATA.length - 1) ? allStyles.bottomListItem : null]}
									text={item.title}
									isEnabled={item.isEnabled}
									setIsEnabled={this.setIsEnabled.bind(this)}
									/>
							) 
						}}
						/>
					</View>
				</View>
			</ScrollView>
		)
	}
}
export default Settings;
