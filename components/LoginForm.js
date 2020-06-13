import React, { PropTypes } from 'react'
import {
	TextInput,
	Button,
	Text,
	View,
	Image,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';

import allStyles from '../styles/AllScreens';
import styles from '../styles/WelcomeScreen';

class LoginForm extends React.Component { 
	state= {
			loginEmail: '',
			loginPassword: ''
	}
	onPressLogin() { 
		this.props.onPress(this.state.loginEmail, this.state.loginPassword);
	}
	render() {
		return (
				<View>
				<TextInput
					autoCapitalize='none'
					autoCorrect={false}
					keyboardType='email-address'
					returnKeyType='next'
					style={ allStyles.input }
					onChangeText={(loginEmail) => this.setState({loginEmail})}
					value={this.state.loginEmail}
					placeholder='Email or username'
					onSubmitEditing={(event) => { 
						this.refs.loginPassword.focus();
					}}
				/>
				<TextInput
					ref='loginPassword' 
					style={ allStyles.input } 
					onChangeText={(loginPassword) => this.setState({loginPassword})} 
					value={this.state.loginPassword} 
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
							onPress={this.onPressLogin.bind(this)}>
							<Text style={ styles.fullWidthButtonText }>Sign me in!</Text>
						</TouchableOpacity>
					}
				</View>
			</View>
		)
	} 
}

export default LoginForm;