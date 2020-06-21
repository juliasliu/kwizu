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
import Modal from 'react-native-modal';
import { StackActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { InterstitialAd, TestIds, AdEventType} from '@react-native-firebase/admob';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

import TabBarIcon from '../components/TabBarIcon';
import ProfileResult from '../components/ProfileResult'
import Loading from '../components/Loading';

@inject('users') @inject('quizzes') @observer
class Leaderboard extends React.Component {
	state = {
			results: [],
			users: [],
			quizzings: [],
			isOwner: false,			// if the logged in user own this quiz, see all users not just friends
			usersForResult: {},		// dictionary { result_id: users }
			searchKeyword: "",
			refreshing: true,
			isModalVisible: false,
	}
	
	_onRefresh = () => {
	    this.setState({refreshing: true});
	    this.componentDidMount();
	}
	
	componentDidMount() {
		const {quiz_id} = this.props.route.params;
		this.props.quizzes.leader(quiz_id)
		.then((res) => {
			console.log("gotem")
			this.setState({results: res.quiz.results, users: res.users, quizzings: res.quizzings, isOwner: res.quiz.user_id == this.props.users.id}, this.loadUsersForResult)
		    this.setState({refreshing: false});
		})
		.catch((errors) => {
			console.log("and i oop")
			console.log(errors);
			this.setState({isModalVisible: true});
		})
	}
	
	loadUsersForResult() {
		console.log(this.state.isOwner)
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
			
			// filter out users who are not friends if isOwner is false
			if (!this.state.isOwner) {
				let that = this;
				usersForResult[result_id] = usersForQuizzings.filter(function (el) {
					return that.props.users.user.friends.filter(function(e) { return e.id === el.id; }).length > 0;
				})
			} else {
				usersForResult[result_id] = usersForQuizzings
			}
			
			this.setState({usersForResult});
			console.log(usersForResult)
		}
	}
	
	setSearchKeyword(searchKeyword) {
		this.setState({searchKeyword})
	}

	deleteSearchKeyword() {
		this.setState({searchKeyword: ""});
	}
	
	render() {
		
		let usersArrayForResult = (result_id) => {
			if (this.state.usersForResult[result_id] == undefined || this.state.usersForResult[result_id].length == 0) {
				if (this.state.isOwner) {
					return (
							<View style={[allStyles.card, allStyles.profileThumbnailCard, allStyles.bottomProfileThumbnailCard ]}>
								<Text style={[allStyles.leaderboardResultNone]}>No users got this result.</Text>
							</View>
							)
				}
				return (
						<View style={[allStyles.card, allStyles.profileThumbnailCard, allStyles.bottomProfileThumbnailCard ]}>
							<Text style={[allStyles.leaderboardResultNone]}>None of your friends got this result.</Text>
						</View>
						)
			} else {
				return this.state.usersForResult[result_id] && (this.state.usersForResult[result_id].map(( item, key ) => 
				{
					return item != undefined && (
							<ProfileResult navigation={this.props.navigation} 
							user={item} 
							quiz={this.props.quizzes.quiz}
							key={key}
							style={(key === this.state.usersForResult[result_id].length - 1) ? allStyles.bottomProfileThumbnailCard : (key === 0 ? allStyles.profileThumbnailCard : null )} />
					)
				}))
			}
			
		}
		
		let resultsArray = this.state.results.filter(elem => elem.title.toLowerCase().includes(this.state.searchKeyword.toLowerCase()))
		resultsArray = resultsArray.map(( item, key ) =>
		{
			return item != undefined && (
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
			)
		});
		
		let searchInput = (
			<View style={[allStyles.searchInputContainer]}>
				<View style={[ allStyles.input, allStyles.searchInput ]}>
				  <Icon
				    name='search'
				    style={allStyles.searchIcon}
				  />
				  <TextInput
				  style={[ allStyles.searchInputText ]}
				  placeholder={'Search...'}
				  placeholderTextColor={'#8393a8'}
				  underlineColorAndroid={'#fff'}
				  autoCapitalize='none'
				  autoCorrect={false}
				  returnKeyType='search'
				  value={ this.state.searchKeyword }
				  onChangeText={(keyword) => this.setSearchKeyword(keyword)}
				  />
				  <TouchableOpacity onPress={this.deleteSearchKeyword.bind(this)}>
				      <TabBarIcon
				        name='md-close'
				        style={[allStyles.searchIcon, allStyles.searchDeleteIcon]}
				      />
				  </TouchableOpacity>
				</View>
			</View>	
		)
		
		return (
				<View style={allStyles.containerNoPadding}>
					{
						this.state.refreshing ? <Loading /> : (
							<ScrollView
							showsVerticalScrollIndicator={false} 
				      		refreshControl={
						              <RefreshControl
						              refreshing={this.state.refreshing}
						              onRefresh={this._onRefresh}
						            />
						          }>
							<View style={allStyles.container}>
								{
									searchInput
								}
								<View style={[ allStyles.section, allStyles.sectionClear ]}>
									{
										resultsArray
									}
								</View>
							</View>
							</ScrollView>
							)
					}
					<Modal isVisible={this.state.isModalVisible} 
				      coverScreen={false} 
				      backdropOpacity={0} 
				      onBackdropPress={() => this.props.navigation.navigate("Home")} 
				      animationIn="slideInDown"
				      animationOut="slideOutUp"
				      style={[ allStyles.modal ]}>
				      <View style={[ allStyles.card, allStyles.modalView, allStyles.modalViewDanger ]}>
				        <Text style={ allStyles.modalTitle }>Oh no, something went wrong.</Text>
				        <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.whiteButton ]}>
				        	<Text>Go to Home</Text>
				        </TouchableOpacity>
				        <TouchableOpacity onPress={() => this.props.navigation.dispatch(StackActions.pop(1))} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.clearButton ]}>
				        	<Text style={ allStyles.whiteText }>Go Back</Text>
				        </TouchableOpacity>
				      </View>
				    </Modal>
				</View>
		) 
	}
}

export default Leaderboard;