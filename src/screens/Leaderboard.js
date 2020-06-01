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
	RefreshControl
} from 'react-native';

import { observer, inject } from 'mobx-react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from 'react-native-check-box'
import Icon5 from 'react-native-vector-icons/FontAwesome5'

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

import TabBarIcon from '../components/TabBarIcon';
import ProfileThumbnail from '../components/ProfileThumbnail'

@inject('users') @inject('quizzes') @observer
class Leaderboard extends React.Component {
	state = {
			results: [],
			users: [],
			quizzings: [],
			usersForResult: {},		// dictionary { result_id: users }
			refreshing: false,
	}
	
	_onRefresh = () => {
	    this.setState({refreshing: true});
	    this.componentDidMount();
	  }
	
	componentDidMount() {
		// get quiz and quizzing for this user: todo later
		const {quiz_id} = this.props.route.params;
		this.props.quizzes.leader(quiz_id)
		.then((res) => {
			console.log("gotem")
			this.setState({results: res.results, users: res.users, quizzings: res.quizzings}, this.loadUsersForResult)
		      this.setState({refreshing: false});
		})
		.catch((error) => {
			console.log("and i oop")
			console.log(error);
		})
	}
	
	loadUsersForResult() {
		for (var i = 0; i < this.state.results.length; i++) {
			var result_id = this.state.results[i].id;
			
			var quizzingsForResult = this.state.quizzings.reduce(function(array, element, i) {
				if (element.result_id == result_id) array.push(element)
				return array;
			}, [])
			
			var usersTemp = this.state.users
			var usersForQuizzings = quizzingsForResult.reduce(function(array, element, i) {
				var userIndex = usersTemp.findIndex(elem => elem.id === element.user_id);
				if (userIndex >= 0) array.push(usersTemp[userIndex]);
				return array;
			}, [])
			
			var usersForResult = this.state.usersForResult;
			usersForResult[result_id] = usersForQuizzings
			this.setState({usersForResult});
			console.log(usersForResult)
		}
	}
	
	render() {
		
		let usersArrayForResult = (result_id) => {
			if (this.state.usersForResult[result_id] == undefined || this.state.usersForResult[result_id].length == 0) {
				return (
						<View style={[allStyles.card, allStyles.profileThumbnailCard, allStyles.bottomProfileThumbnailCard ]}>
							<Text style={[allStyles.leaderboardResultNone]}>No users got this result.</Text>
						</View>
						)
			} else {
				return this.state.usersForResult[result_id] ? (this.state.usersForResult[result_id].map(( item, key ) => 
				{
					return item != undefined ? (
							<ProfileThumbnail navigation={this.props.navigation} 
							user={item} 
							key={key}
							style={(key === this.state.usersForResult[result_id].length - 1) ? allStyles.bottomProfileThumbnailCard : (key === 0 ? allStyles.profileThumbnailCard : null )} />
					) : null
				})) : null
			}
			
		}
		
		let resultsArray = this.state.results.map(( item, key ) =>
		{
			return item != undefined ? (
					<View 
					key={key}
					style={[allStyles.leaderboardResult]}>
						<View style={[ allStyles.card, allStyles.quizResult, styles.takeResult, allStyles.button, allStyles.grayButton, styles.shareButton, styles.topShareButton ]}>
							<View style={[ allStyles.quizResultContainer, styles.takeResultContainer ]}>
								<Text style={[ allStyles.quizResultTitle, styles.resultLeaderboardTitle, allStyles.whiteText ]}>
									{ item.title }
								</Text>
							</View>
						</View>
			
				      	<View style={styles.friendsList}>
				      	{
				      		usersArrayForResult(item.id)
				      	}
						</View>	
					</View>
			) : null
		});
		
		return (
				<KeyboardAwareScrollView style={[allStyles.container, styles.quizFormContainer ]}
	      		refreshControl={
			              <RefreshControl
			              refreshing={this.state.refreshing}
			              onRefresh={this._onRefresh}
			            />
			          }>
						
					<View style={[ allStyles.section, allStyles.sectionClear ]}>
						{
							resultsArray
						}
					</View>
					
				</KeyboardAwareScrollView>
		) 
	}
}

export default Leaderboard;