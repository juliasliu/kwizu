import React, { PropTypes } from 'react'
import {
	ScrollView,
	TextInput,
	Button,
	Text,
	View,
	Image,
	ActivityIndicator,
	StyleSheet,
	Link,
	TouchableOpacity,
} from 'react-native';

import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import allStyles from '../styles/AllScreens';
import styles from '../styles/WelcomeScreen';

@inject('users') @observer
class Login extends React.Component {
	
	state = {
			errors: null,
			email: '',
			password: ''
	}
	
	onLogin() { 
		this.props.users.login(this.state.email, this.state.password)
		.then(res => {
			console.log("login!")
		})
		.catch((errors) => {
			this.setState({errors: this.props.users.errors})
		})
	}
	
	render() {
		return (
				<View style={[styles.welcomeContainer]}>
					<View style={styles.welcomeBackgroundContainer}>
						<Image source={require("../assets/images/login.png")} style={styles.welcomeBackground} />
					</View>
					<KeyboardAwareScrollView style={[styles.welcomeContainer]}
						innerRef={ref => {
						    this.scrollview_ref = ref;
					  }}>
					<View style={[styles.welcomeFormContainer]}>
						<View style={styles.welcomeForm}>
							<Text style={[ allStyles.title, allStyles.center, allStyles.whiteText ]}>Sign In</Text>
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
							<TextInput
								autoCapitalize='none'
								autoCorrect={false}
								keyboardType='email-address'
								returnKeyType='next'
								style={ allStyles.input }
								onChangeText={(email) => this.setState({email})}
								value={this.state.email}
								placeholder='Email or username'
								onSubmitEditing={(event) => { 
									this.refs.password.focus();
								}}
							/>
							<TextInput
								ref='password' 
								style={ allStyles.input } 
								onChangeText={(password) => this.setState({password})} 
								value={this.state.password} 
								secureTextEntry={true} 
								placeholder='Password'
							/>
							<View style={ allStyles.flexContainer }>
								<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.redButton ]}
				                	onPress={() => this.props.navigation.navigate('Welcome')}>
									<Text style={[ styles.fullWidthButtonText, allStyles.whiteText ]}>Cancel</Text>
								</TouchableOpacity>
								{
									this.props.users.busy ? 
									<ActivityIndicator/> :
									<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.whiteButton ]}
										onPress={this.onLogin.bind(this)}>
										<Text style={[ allStyles.fullWidthButtonText ]}>Sign me in!</Text>
									</TouchableOpacity>
								}
							</View>
						</View>
					</View>
					</KeyboardAwareScrollView>
				</View>
		) 
	}
}

export default Login;