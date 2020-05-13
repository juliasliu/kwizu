import React, { PropTypes } from 'react'
import {
	ScrollView,
	TextInput,
	Button,
	Text,
	View,
	Image,
	ActivityIndicator,
	TouchableOpacity
} from 'react-native';

import allStyles from '../styles/AllScreens';
import styles from '../styles/WelcomeScreen';

class RegisterForm extends React.Component {
	state= { 
			registerEmail: '', 
			registerPassword: '', 
			registerName: ''
	}
	onPressRegister() { 
		this.props.onPress(this.state.registerEmail, this.state.registerPassword, this.state.registerName);
	}
	render() {
		return (
				<View>
				{
					this.props.registeringError &&
					<View style={ allStyles.error }>
						<Text>{this.props.registeringError}</Text>
					</View>
				}
				<TextInput
					autoCapitalize='none' 
					autoCorrect={false} 
					keyboardType='email-address' 
					returnKeyType='next' 
					style={ allStyles.input } 
					onChangeText={(registerEmail) => this.setState({registerEmail})} 
					value={this.state.registerEmail} 
					placeholder='Email' 
					onSubmitEditing={(event) => {
						this.refs.registerName.focus(); 
					}}
				/>
				<TextInput
					ref='registerName' 
					style={ allStyles.input } 
					onChangeText={(registerName) => this.setState({registerName})} 
					returnKeyType='next' 
					value={this.state.registerName} 
					placeholder='Name' 
					onSubmitEditing={(event) => {
						this.refs.registerPassword.focus();
					}}
				/>
				<TextInput
					ref='registerPassword' 
					style={ allStyles.input } 
					onChangeText={(registerPassword) => this.setState({registerPassword})} 
					value={this.state.registerPassword} 
					secureTextEntry={true} 
					placeholder='Password'
					/>
				<View style={ allStyles.flexContainer }>
					<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.redButton ]}
	                	onPress={() => this.props.navigation.navigate('Welcome')}>
						<Text style={[ styles.fullWidthButtonText, allStyles.whiteText ]}>Cancel</Text>
					</TouchableOpacity>
					{
						this.props.busy ? 
						<ActivityIndicator/> :
						<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.whiteButton ]}
							onPress={this.onPressRegister.bind(this)}>
							<Text style={ styles.fullWidthButtonText }>Sign me up!</Text>
						</TouchableOpacity>
					}
				</View>
			</View>
		)
	}
}

export default RegisterForm;