import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text,
	ActivityIndicator, TouchableOpacity, View, Button, TextInput, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import ImagePicker from 'react-native-image-picker';

import TabBarIcon from '../components/TabBarIcon';
import ListItem from '../components/ListItem' 

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

@inject('users') @observer
class Settings extends React.Component {
	state= {
			searchKeyword: "",
			user: {},
			busy: false,
			errors: null,
			success: null,
	}

	onPressLogout() {
		this.props.users.logout()
		.then((res) => {
			console.log("logged out")
		})
		.catch((errors) => {
			this.setState({errors: this.props.users.errors})
		})
	}

	setSearchKeyword(searchKeyword) {
		this.setState({searchKeyword})
	}

	deleteSearchKeyword() {
		this.setState({searchKeyword: ""});
	}
	
	render () {
		let DATA = [
			{
				id: '0',
				title: 'Push Notifications',
				icon: 'bell',
			},
			{
				id: '1',
				title: 'Facebook Settings',
				icon: 'facebook-square',
			},
			{
				id: '2',
				title: 'Change My Password',
				icon: 'key',
			},
			{
				id: '3',
				title: 'Report a Problem',
				icon: 'exclamation-circle',
			},
			{
				id: '4',
				title: 'Report a User',
				icon: 'bullhorn',
			},
			{
				id: '5',
				title: 'Flag Content',
				icon: 'warning',
			},
			{
				id: '6',
				title: 'Frequently Asked Questions',
				icon: 'lightbulb-o',
			},
			{
				id: '7',
				title: 'Help Center',
				icon: 'info-circle',
			},
			{
				id: '8',
				title: 'About Us',
				icon: 'heart',
			},
			{
				id: '9',
				title: 'Community Guidelines',
				icon: 'globe',
			},
			{
				id: '10',
				title: 'Terms of Use',
				icon: 'legal',
			},
			{
				id: '11',
				title: 'Privacy Policy',
				icon: 'lock',
			},
		];
		DATA = DATA.filter(elem => elem.title.toLowerCase().includes(this.state.searchKeyword.toLowerCase()))
		
		let searchInput = (
			<View style={[allStyles.searchInputContainer]}>
				<View style={[ allStyles.input, allStyles.searchInput ]}>
				  <Icon
				    name='search'
				    style={allStyles.searchIcon}
				  />
				  <TextInput
				  style={[ allStyles.searchInputText ]}
				  placeholder={'Search...'}
				  placeholderTextColor={'#8393a8'}
				  underlineColorAndroid={'#fff'}
				  autoCapitalize='none'
				  autoCorrect={false}
				  returnKeyType='search'
				  value={ this.state.searchKeyword }
				  onChangeText={(keyword) => this.setSearchKeyword(keyword)}
				  />
				  <TouchableOpacity onPress={this.deleteSearchKeyword.bind(this)}>
				      <TabBarIcon
				        name='md-close'
				        style={[allStyles.searchIcon, allStyles.searchDeleteIcon]}
				      />
				  </TouchableOpacity>
				</View>
			</View>	
		)
		
		return (
				<View style={allStyles.containerNoPadding}>
					<ScrollView
					showsVerticalScrollIndicator={false} 
					ref={ref => {
					    this.scrollview_ref = ref;
					  }}>
						<View style={allStyles.container}>
						{
							searchInput
						}  
						<FlatList 
							data={DATA} 
							keyExtractor={(item, index) => item.id} 
							renderItem={({item}) => {
								return ( 
										<ListItem
										text={item.title}
										icon={item.icon} 
										onPress={() => this.props.navigation.push(item.title)}
										/>
								) 
							}}
							/>
							<View>
					      		{
									this.props.users.busy ?
									<ActivityIndicator/> :
										<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.redButton ]} onPress={this.onPressLogout.bind(this)} title="Log Out">
										<Text style={ allStyles.whiteText }>Log Out</Text>
									</TouchableOpacity>
								}
					      	</View>
				      	</View>
					</ScrollView>
				</View>
		)
	}
}
export default Settings;
