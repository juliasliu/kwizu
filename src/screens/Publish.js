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

@inject('users') @inject('quizzes') @observer
class Publish extends React.Component {
	
	
	render() {
		console.log("HI I PUBLISHED")
		
		return (
				<KeyboardAwareScrollView style={[allStyles.container, styles.quizFormContainer ]}>
					
					<View style={[ allStyles.section, allStyles.sectionClear ]}>
						<Text style={[ allStyles.heading, { textAlign: 'center' } ]}>Your Kwiz is ready!</Text>
					</View>
						
					<View style={[ allStyles.section, allStyles.sectionClear ]}>
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton, styles.shareButton, styles.topShareButton ]}
			                onPress={() => alert("")}>
							<TabBarIcon name="md-happy" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Take your own kwiz</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blackButton, styles.shareButton, styles.bottomShareButton, { height: 60, } ]}
					        onPress={() => this.props.navigation.navigate("Kwiz Results")}>
							<TabBarIcon name="md-trophy" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>See results of your kwiz!</Text>
						</TouchableOpacity>
					</View>
					
					<ShareForm quiz={ this.props.quizzes.quiz } />
					
					<View style={[ allStyles.section, allStyles.sectionClear ]}>
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

export default Publish;