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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from 'react-native-check-box'

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

import TabBarIcon from '../components/TabBarIcon';
import ShareForm from '../components/ShareForm'

@inject('users') @observer
class Save extends React.Component {
	onPressRegister(email, password, name) { 
		this.props.users.register(email, password, name);
	}
	
	render() {
		return (
				<KeyboardAwareScrollView style={[allStyles.container, styles.quizFormContainer ]}>
					
					<View style={styles.shareSection}>
						<Text style={[ allStyles.heading, { textAlign: 'center' } ]}>Your Kwiz is ready!</Text>
					</View>
					
					<ShareForm />
						
					<View style={styles.shareSection}>
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton, styles.shareButton, styles.topShareButton ]}
			                onPress={() => alert("")}>
							<TabBarIcon name="md-trash" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Take your own kwiz</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blackButton, styles.shareButton, styles.bottomShareButton, { height: 60, } ]}
					        onPress={() => alert("")}>
							<TabBarIcon name="md-happy" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>See results of your kwiz!</Text>
						</TouchableOpacity>
					</View>
					
					<View style={styles.shareSection}>
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.whiteButton ]}
			                onPress={() => alert("")}>
							<TabBarIcon name="md-create" style={[ allStyles.buttonIcon ]}/>
							<Text style={[ allStyles.fullWidthButtonText ]}>Edit your kwiz</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.redButton ]}
			                onPress={() => alert("")}>
							<TabBarIcon name="md-trash" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Delete your kwiz</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAwareScrollView>
		) 
	}
}

export default Save;