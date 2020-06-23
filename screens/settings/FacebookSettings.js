import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text, Linking,
	ActivityIndicator, TouchableOpacity, View, Button, TextInput, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import ImagePicker from 'react-native-image-picker';

import TabBarIcon from '../../components/TabBarIcon';
import FBLoginButton from '../../components/FBLoginButton';

import allStyles from '../../styles/AllScreens';
import styles from '../../styles/ProfileScreen';

@inject('users') @observer
class Settings extends React.Component {
	state = {
			signedIn: false,
			busy: false,
			errors: null,
			success: null,
	}

	initUser(token) {
		fetch('https://graph.facebook.com/v7.0/me?fields=email,name,friends&access_token=' + token)
		  .then((response) => response.json())
		  .then((json) => {
		    this.setState({email: json.email, 
		    	name: json.name, 
		    	username: json.email.split("@")[0].toLowerCase(), 
		    	password: json.id, 
		    	password_confirmation: json.id})
		    this.setState({signedIn: true})
		  })
		  .catch(() => {
		    reject('ERROR GETTING DATA FROM FACEBOOK')
		  })
	}

	render () {
		return (
			<ScrollView
				ref={ref => {
					this.scrollview_ref = ref;
				}}>
				<View style={allStyles.container}>
				{
					this.state.errors &&
					<View style={ allStyles.errors }
					onLayout={event => {
						const layout = event.nativeEvent.layout;
						this.scrollview_ref.scrollTo({
							x: 0,
							y: layout.y,
							animated: true,
						});
					}}>
					{
						this.state.errors.map(( item, key ) =>
						{
							return <Text key={key} style={ allStyles.errorText }>• {item}</Text> 
						})
					}
					</View>
				}
				{
					this.state.success &&
					<View style={ allStyles.success }
					onLayout={event => {
						const layout = event.nativeEvent.layout;
						this.scrollview_ref.scrollTo({
							x: 0,
							y: layout.y,
							animated: true,
						});
					}}>
					<Text>{this.state.success}</Text>
					</View>
				}
				<View style={[allStyles.section, allStyles.sectionClear]}>
					{
						this.state.signedIn ? (
							<View style={[allStyles.card, allStyles.center]}>
								<Text style={[allStyles.text]}>
									You are currently signed into Facebook.
								</Text>
								{
									this.props.users.busy ? 
									<ActivityIndicator/> :
									<FBLoginButton 
									initUser={this.initUser.bind(this)} />
								}
							</View>
						) : (
							<View style={[allStyles.card, allStyles.center]}>
								<Text style={[allStyles.text, allStyles.center]}>
									If you have forgotten your password, please email us at <Text style={[allStyles.link]} onPress={() => Linking.openURL("mailto:kwizu.app@gmail.com?subject=Forgot%20Password&body=...")}>kwizu.app@gmail.com</Text>.
								</Text>
								{
									this.props.users.busy ? 
									<ActivityIndicator/> :
									<FBLoginButton 
									initUser={this.initUser.bind(this)} />
								}
							</View>
						)
					}
				</View>
			</View>
		</ScrollView>
		)
	}
}
export default Settings;
