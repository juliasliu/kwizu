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

export default class Register extends React.Component {
	
	state = {
			errors: null,
			email: '', 
			name: '',
			username: '',
			password: '',
			password_confirmation: ''
	}
	
	onPressRegister() {
		this.props.users.register(this.state.email, this.state.name, this.state.username, this.state.password, this.state.password_confirmation)
		.then(res => {
			this.props.users.addPoints(10)
			.then(res => {
				console.log("yay points!" + res)
			})
		})
		.catch((errors) => {
			this.setState({errors: this.props.users.errors})
		})
	}
	
	render() {
		return (
				<View style={[styles.welcomeContainer]}>
					<View style={styles.welcomeBackgroundContainer}>
						<Image source={require("../assets/images/register.png")} style={styles.welcomeBackground} />
					</View>
					<KeyboardAwareScrollView style={[styles.welcomeContainer]}
					showsVerticalScrollIndicator={false} 
						innerRef={ref => {
						    this.scrollview_ref = ref;
					  }}>
					<View style={[styles.welcomeFormContainer]}>
						<View style={styles.welcomeForm}>
							<Text style={[ allStyles.title, allStyles.center, allStyles.whiteText ]}>Sign Up</Text>
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
								ref='name' 
								style={ allStyles.input } 
								onChangeText={(name) => this.setState({name})} 
								returnKeyType='next' 
								value={this.state.name} 
								placeholder='Name' 
								onSubmitEditing={(event) => {
									this.refs.email.focus();
								}}
							/>
							<TextInput
							ref='email' 
								autoCapitalize='none' 
								autoCorrect={false} 
								keyboardType='email-address' 
								returnKeyType='next' 
								style={ allStyles.input } 
								onChangeText={(email) => this.setState({email})} 
								value={this.state.email} 
								placeholder='Email' 
								onSubmitEditing={(event) => {
									this.refs.username.focus(); 
								}}
							/>
							<TextInput
							ref='username'
								autoCapitalize='none'
								autoCorrect={false} 
								style={ allStyles.input } 
								onChangeText={(username) => this.setState({username})} 
								returnKeyType='next' 
								value={this.state.username} 
								placeholder='Username (4 chars min)' 
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
								placeholder='Password'
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
								placeholder='Password Confirmation'
							/>
							<View style={ allStyles.flexContainer }>
								<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.redButton ]}
				                	onPress={() => this.props.navigation.navigate('Welcome')}>
									<Text style={[ allStyles.whiteText ]}>Cancel</Text>
								</TouchableOpacity>
								{
									this.props.users.busy ? 
									<ActivityIndicator/> :
									<TouchableOpacity style={[ allStyles.halfWidthButton, allStyles.button, allStyles.whiteButton ]}
										onPress={this.onPressRegister.bind(this)}>
										<Text>Sign me up!</Text>
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
