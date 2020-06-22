import React, { Component } from 'react';
import {
	Button,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import { LoginManager } from "react-native-fbsdk";

import Icon from 'react-native-vector-icons/FontAwesome'

import allStyles from '../styles/AllScreens';
import styles from '../styles/WelcomeScreen';

export default class FBLoginButton extends Component {
  
	loginFB() {
		// Attempt a login using the Facebook login dialog asking for default permissions.
        LoginManager.logInWithPermissions(["public_profile"]).then(
          function(result) {
            if (result.isCancelled) {
              console.log("Login cancelled");
            } else {
              console.log(
                "Login success with permissions: " +
                  result.grantedPermissions.toString()
              );
            }
          },
          function(error) {
            console.log("Login fail with error: " + error);
          }
        );
	}
	
	render() {
    return (
    	<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.facebookButton, styles.shareButton ]}
	            onPress={this.loginFB.bind(this)}>
				<Icon name="facebook" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
				<Text style={[ allStyles.whiteText ]}>Sign in with Facebook</Text>
		</TouchableOpacity>
    );
  }
};

module.exports = FBLoginButton;