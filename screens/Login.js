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

import LoginForm from '../components/LoginForm'

@inject('users') @observer
class Login extends React.Component {
	
	state = {
			errors: null,
	}
	
	onLogin(email, password) { 
		this.props.users.login(email, password)
		.then(res => {
			console.log("login!")
		})
		.catch((errors) => {
			this.setState({errors: this.props.users.errors})
		})
	}
	
	render() {
		return (
				<ScrollView style={allStyles.container}
				ref={ref => {
				    this.scrollview_ref = ref;
				  }}>
				<KeyboardAwareScrollView contentContainerStyle={styles.welcomeContainer}>
					<Text style={[ allStyles.title, allStyles.center, { marginVertical: 50 } ]}>Sign In</Text>
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
					<LoginForm onPress={this.onLogin.bind(this)} 
					busy={this.props.users.busy}
					navigation={this.props.navigation}></LoginForm>
				</KeyboardAwareScrollView>
				</ScrollView>
		) 
	}
}

export default Login;