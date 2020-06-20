import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text, Linking,
	ActivityIndicator, TouchableOpacity, View, Button, TextInput, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import ImagePicker from 'react-native-image-picker';

import TabBarIcon from '../../components/TabBarIcon';

import allStyles from '../../styles/AllScreens';
import styles from '../../styles/ProfileScreen';

@inject('users') @observer
class Settings extends React.Component {
	state = {
		old_password: "",
		password: "",
		password_confirmation: "",
		busy: false,
		errors: null,
		success: null,
	}

	onPressResetPassword() {
		this.props.users.reset(this.state.old_password, this.state.password, this.state.password_confirmation)
		.then(res => {
			this.setState({old_password: "", password: "", password_confirmation: ""})
			this.setState({success: this.props.users.success, errors: null})
		})
		.catch((errors) => {
			this.setState({errors: this.props.users.errors})
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
				      <View style={[allStyles.card, allStyles.center]}>
						<Text style={allStyles.heading}>Reset My Password</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							If you have forgotten your password, please email us at <Text style={[allStyles.link]} onPress={() => Linking.openURL("mailto:kwizu.app@gmail.com?subject=Forgot%20Password&body=...")}>kwizu.app@gmail.com</Text>.
						</Text>
				      </View>
				      <View style={[allStyles.section, allStyles.sectionClear]}>
					      <TextInput
							ref='old_password' 
							style={ allStyles.input } 
							onChangeText={(old_password) => this.setState({old_password})} 
							returnKeyType='next' 
							value={this.state.old_password} 
							secureTextEntry={true} 
							placeholder='Old Password'
							onSubmitEditing={(event) => {
								this.refs.password.focus();
							}}
						/>
					      <TextInput
							ref='password' 
							style={ allStyles.input } 
							onChangeText={(password) => this.setState({password})} 
							returnKeyType='next' 
							value={this.state.password} 
							secureTextEntry={true} 
							placeholder='New Password'
							onSubmitEditing={(event) => {
								this.refs.password_confirmation.focus();
							}}
						/>
						<TextInput
							ref='password_confirmation' 
							style={ allStyles.input } 
							onChangeText={(password_confirmation) => this.setState({password_confirmation})} 
							value={this.state.password_confirmation} 
							secureTextEntry={true} 
							placeholder='New Password Confirmation'
						/>
							{
								this.props.users.busy ?
										<ActivityIndicator/> :
								<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.blueButton ]} 
								onPress={this.onPressResetPassword.bind(this)}>
									<Text style={ allStyles.whiteText }>Reset My Password</Text>
								</TouchableOpacity>
							}
					      </View>
					  </View>
				</View>
			</ScrollView>
		)
	}
}
export default Settings;
