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
import Icon5 from 'react-native-vector-icons/FontAwesome5'

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

import TabBarIcon from '../components/TabBarIcon';
import ProfileThumbnail from '../components/ProfileThumbnail'

@inject('users') @observer
class Leaderboard extends React.Component {
	onPressRegister(email, password, name) { 
		this.props.users.register(email, password, name);
	}
	
	render() {
		return (
				<KeyboardAwareScrollView style={[allStyles.container, styles.quizFormContainer ]}>
					
					<View style={[ allStyles.section, allStyles.sectionClear ]}>
						<Text style={[ allStyles.heading, { textAlign: 'center' } ]}>Results of your Kwiz</Text>
					</View>
						
					<View style={[ allStyles.section, allStyles.sectionClear ]}>
						<View style={[ allStyles.card, allStyles.quizResult, styles.takeResult, allStyles.button, allStyles.grayButton, styles.shareButton, styles.topShareButton ]}>
								<View style={[ allStyles.quizResultContainer, styles.takeResultContainer ]}>
									<Text style={[ allStyles.quizResultTitle, styles.resultLeaderboardTitle, allStyles.whiteText ]}>Youo are swagidilocious beep beep boop harry pot.</Text>
								</View>
						</View>

				      	<View style={styles.friendsList}>
							<ProfileThumbnail navigation={this.props.navigation} style={[
				      			(this.props.index === 0) ? allStyles.topProfileThumbnailCard : allStyles.profileThumbnailCard, 
						      	(this.props.index === 5 - 1) ? allStyles.bottomProfileThumbnailCard : allStyles.profileThumbnailCard ]}/>
				      		<ProfileThumbnail navigation={this.props.navigation} style={[
				      			(this.props.index === 0) ? allStyles.topProfileThumbnailCard : allStyles.profileThumbnailCard, 
				      			(this.props.index === 5 - 1) ? allStyles.bottomProfileThumbnailCard : allStyles.profileThumbnailCard ]} />
				      		<ProfileThumbnail navigation={this.props.navigation} style={[ allStyles.bottomProfileThumbnailCard ]} />
						</View>
					</View>
					
				</KeyboardAwareScrollView>
		) 
	}
}

export default Leaderboard;