import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text,
	ActivityIndicator, TouchableOpacity, View, Button, TextInput, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import ImagePicker from 'react-native-image-picker';

import TabBarIcon from '../../components/TabBarIcon';

import allStyles from '../../styles/AllScreens';
import styles from '../../styles/ProfileScreen';

@inject('users') @observer
class Settings extends React.Component {
	state= {
		oldPassword: "",
		password: "",
		passwordConfirmation: "",
	}

	componentDidMount() {
		
	}

	render () {
		return (
				<View style={allStyles.container}>
			      <ScrollView style={allStyles.contentContainer}
					ref={ref => {
					    this.scrollview_ref = ref;
					  }}>
				      <View style={[allStyles.card, allStyles.center]}>
						<Text style={allStyles.heading}>Reset My Password</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							If you have forgotten your password, please email us at <Text style={[allStyles.link]}>kwizu@gmail.com</Text>.
						</Text>
				      </View>
				      <View style={[allStyles.section, allStyles.sectionClear]}>
					      <TextInput
							autoCapitalize='none'
							autoCorrect={false}
							ref='oldPassword'
							style={ allStyles.input }
							onChangeText={(oldPassword) => this.setOldPassword(oldPassword)}
							returnKeyType='next'
							value={this.state.oldPassword}
							placeholder='Your old password'
							onSubmitEditing={(event) => {
								this.refs.password.focus();
							}}
						/>
						<TextInput
							autoCapitalize='none'
							autoCorrect={false}
							ref='password'
							style={ allStyles.input }
							onChangeText={(password) => this.setPassword(password)}
							returnKeyType='next'
							value={this.state.password}
							placeholder='Your new password'
							onSubmitEditing={(event) => {
								this.refs.passwordConfirmation.focus();
							}}
						/>
						<TextInput
							autoCapitalize='none'
							autoCorrect={false}
							ref='passwordConfirmation'
							style={ allStyles.input }
							onChangeText={(passwordConfirmation) => this.setPasswordConfirmation(passwordConfirmation)}
							returnKeyType='next'
							value={this.state.passwordConfirmation}
							placeholder='New password confirmation'
						/>
							{
								this.props.users.busy ?
										<ActivityIndicator/> :
								<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.blueButton ]} onPress={() => alert("")}>
									<Text style={ allStyles.whiteText }>Reset My Password</Text>
								</TouchableOpacity>
							}
					      </View>
					</ScrollView>
				</View>
		)
	}
}
export default Settings;
