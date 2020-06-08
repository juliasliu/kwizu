import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator, View, Button, RefreshControl, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { MonoText } from '../components/StyledText';
import QuizThumbnail from '../components/QuizThumbnail';
import ProfileThumbnail from '../components/ProfileThumbnail';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

@inject('users') @inject('quizzes') @observer
class SearchScreen extends React.Component {
	state = {
		quizzes: [],
		users: [],
		searchKeyword: "",
	      refreshing: false,
			index: 0,
			routes: [
				{ key: 'first', title: 'Kwizzes' },
				{ key: 'second', title: 'Users' },
			]
	}
	
	_onRefresh = () => {
	    this.setState({refreshing: true});
	    this.componentDidMount();
	  }
	
	componentDidMount() {
	      this.searchSubmit();
	}
	
	searchSubmit() {
		if (this.state.searchKeyword == "") {
			this.setState({refreshing: false});
			return;
		}
		this.props.quizzes.search(this.state.searchKeyword)
		.then((res) => {
			var quizzes = [...this.state.quizzes]
			quizzes = res;
			this.setState({quizzes})
		      this.setState({refreshing: false});
		})
		.catch((error) => {
			console.log(error);
		})
		this.props.users.search(this.state.searchKeyword)
		.then((res) => {
			var users = [...this.state.users]
			users = res;
			this.setState({users});
		      this.setState({refreshing: false});
		})
		.catch((error) => {
			console.log(error);
		})
	}
	
	setSearchKeyword(searchKeyword) {
		this.setState({searchKeyword})
	}
	
	setIndex(index) {
		this.setState({index: index});
	}
	
	render() {
		
		let quizzesArray = this.state.quizzes.map(( item, key ) =>
		{
			return item != undefined ? (
					<QuizThumbnail 
					quiz={item}
					key={key}
					type={"thumbnail"}
					navigation={this.props.navigation}/>
			) : null
		});
		
		let usersArray = this.state.users.map(( item, key ) => 
		{
			return item != undefined ? (
					<ProfileThumbnail navigation={this.props.navigation} 
					user={item} 
					key={key}
					style={[ (key === this.state.users.length - 1) ? allStyles.bottomProfileThumbnailCard : null,
							 (key === 0) ? allStyles.topProfileThumbnailCard : null,
						]} />
			) : null
		})	
		
		let FirstRoute = () => (
				<ScrollView style={[allStyles.container]}
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
													<Text style={[ allStyles.sectionMessage ]}>There are no results.</Text>
													</View>
											)
								)
			      }
			      </View>
		      </ScrollView>
		);

		let SecondRoute = () => (
				<ScrollView style={allStyles.container}
				refreshControl={
						<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh}
						/>
				}>
				<View style={[allStyles.container]}>
				{
					this.props.users.busy ? 
							<ActivityIndicator/> : (
									this.state.users.length > 0 ? usersArray :
										(
												<View style={[ allStyles.section, allStyles.sectionClear ]}>
												<Text style={[ allStyles.sectionMessage ]}>There are no results.</Text>
												</View>
										)
							)
				
				}
				</View>
				</ScrollView>
		);
		
		const renderTabBar = props => (
				<TabBar
				{...props}
				indicatorStyle={ allStyles.tabIndicator }
				style={ allStyles.tabBar }
				renderLabel={({ route, focused, color }) => (
						<View style={allStyles.tabBarContainer}>
							<Icon
						    name={
						    		route.title == "Kwizzes" ? (
						    				focused ? 'sticky-note' : 'sticky-note-o'
						    		) : (
						    				focused ? 'user' : 'user-o'
						    		)
						    }
						    color={color}
						    style={ allStyles.tabBarIcon }
						    />
							<Text style={[ allStyles.tabBarLabel, { color }]}>
								{route.title}
						    </Text>
						 </View>
					  )}
				activeColor={"#fff"}
				inactiveColor={"#8393a8"}
				/>
		);
		
		  return (
				  <View style={{ flex: 1 }}>
					  <View style={[allStyles.searchInputContainer, allStyles.blackInputContainer]}>
						  <View style={[ allStyles.input, allStyles.searchInput ]}>
			                <Icon
			                  name='search'
			                  style={allStyles.searchIcon}
			                />
			                <TextInput 
			                style={[ allStyles.searchInputText ]}
			                placeholder={'Enter your search here...'}
			                placeholderTextColor={'#8393a8'}
			                underlineColorAndroid={'#fff'}
							autoCapitalize='none'
			                autoCorrect={false}
			                autoFocus={true}
			                returnKeyType='search'
			                value={ this.state.searchKeyword }
			                onChangeText={(keyword) => this.setSearchKeyword(keyword)}
			                onSubmitEditing={this.searchSubmit.bind(this)}
			                />
			              </View>
			          </View>
						  <TabView
					      navigationState={{ index: this.state.index, routes: this.state.routes }}
					      renderScene={
								SceneMap({
									first: FirstRoute,
									second: SecondRoute,
								})
							}
					      onIndexChange={this.setIndex.bind(this)}
					      initialLayout={{ width: Dimensions.get('window').width }}
							renderTabBar={renderTabBar}
					    />
				</View>
		  );
		}
}

export default SearchScreen;