import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator, View, Button, RefreshControl, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TabBarIcon from '../components/TabBarIcon';

import QuizThumbnail from '../components/QuizThumbnail';
import Loading from '../components/Loading';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

@inject('users') @inject('quizzes') @observer
class ProfileQuizzes extends React.Component {
	state = {
		quizzes: [],
		searchKeyword: "",
	    refreshing: true,
	}
	
	_onRefresh = () => {
	    this.setState({refreshing: true});
	    this.componentDidMount();
	  }
	
	componentDidMount() {
		var user_id;
		if (!this.props.route.params) user_id = this.props.users.id;
		else user_id = this.props.route.params.user_id;

		const {type} = this.props.route.params;
		this.props.users.show(user_id)
		.then((res) => {
			let quizzes;
			if (type == "taken") quizzes = res.taken_quizzes;
			else if (type == "created") quizzes = res.quizzes;
			this.setState({quizzes: quizzes, refreshing: false})
		})
		.catch((errors) => {
			console.log("o no")
			console.log(errors);
			this.setState({isModalVisible: true});
		})
	}
	
	setSearchKeyword(searchKeyword) {
		this.setState({searchKeyword})
	}

	deleteSearchKeyword() {
		this.setState({searchKeyword: ""});
	}
	
	render() {
		
		let quizzesArray = this.state.quizzes.filter(elem => elem.title.toLowerCase().includes(this.state.searchKeyword.toLowerCase()))
		quizzesArray = quizzesArray.map(( item, key ) =>
		{
			return item != undefined && (
					<QuizThumbnail 
					quiz={item}
					key={key}
					type={"thumbnail"}
					navigation={this.props.navigation}/>
			)
		});
		
		  return (
				  <View style={{ flex: 1 }}>
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
							<View style={[allStyles.container]}>
						      {
						    	  this.props.quizzes.busy ? 
											<ActivityIndicator/> : (
													this.state.quizzes.length > 0 ? (
														<View style={[styles.searchQuizContainer]}>
															{
																quizzesArray
															}
														</View>
													) :
														(
																<View style={[ allStyles.section, allStyles.sectionClear ]}>
																<Text style={[ allStyles.sectionMessage ]}>There are no kwizzes.</Text>
																</View>
														)
											)
						      }
						      </View>
					      </ScrollView>  
							)
					}
					<Modal isVisible={this.state.isModalVisible} 
				      coverScreen={false} 
				      backdropOpacity={0} 
				      onBackdropPress={() => this.props.navigation.navigate("Profile")} 
				      animationIn="slideInDown"
				      animationOut="slideOutUp"
				      style={[ allStyles.modal ]}>
				      <View style={[ allStyles.card, allStyles.modalView, allStyles.modalViewDanger ]}>
				        <Text style={ allStyles.modalTitle }>Oh no, something went wrong.</Text>
				        <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.whiteButton ]}>
				        	<Text>Go to Profile</Text>
				        </TouchableOpacity>
				        <TouchableOpacity onPress={() => this.props.navigation.dispatch(StackActions.pop(1))} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.clearButton ]}>
				        	<Text style={ allStyles.whiteText }>Go Back</Text>
				        </TouchableOpacity>
				      </View>
				    </Modal>
				</View>
		  );
		}
}

export default ProfileQuizzes;