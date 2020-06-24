import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text, Linking,
	ActivityIndicator, TouchableOpacity, View, Button, TextInput, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';

import Loading from '../../components/Loading';
import TabBarIcon from '../../components/TabBarIcon';
import FBLoginButton from '../../components/FBLoginButton';

import allStyles from '../../styles/AllScreens';
import styles from '../../styles/ProfileScreen';

@inject('users') @observer
class Settings extends React.Component {
	state = {
			facebook_id: null,
			refreshing: true,
			busy: false,
			errors: null,
			success: null,
			isModalVisible: false,
	}
	
	_onRefresh = () => {
		this.setState({refreshing: true});
		this.componentDidMount();
	}
	
	componentDidMount() {
		// find out if facebook account is connected
		this.props.users.show(this.props.users.id)
		.then((res) => {
			this.setState({facebook_id: res.facebook_id, refreshing: false});
		})
		.catch((errors) => {
			this.setState({errors: this.props.users.errors})
			this.setState({isModalVisible: true});
		})
	}
	
	initUser(token) {
		fetch('https://graph.facebook.com/v7.0/me?fields=email,name,friends&access_token=' + token)
		  .then((response) => response.json())
		  .then((json) => {
			  this.setState({facebook_id: json.id}, this.connectFacebook)
		  })
		  .catch(() => {
			  reject('ERROR GETTING DATA FROM FACEBOOK')
		  })
	}

	connectFacebook() {
		console.log("gotta connectt to FB")
		  console.log(this.state.facebook_id)
		this.props.users.connectFacebook(this.state.facebook_id)
		.then(res => {
			this.setState({facebook_id: res.facebook_id})
			this.setState({success: this.props.users.success})
		})
		.catch((errors) => {
			this.setState({errors: this.props.users.errors})
		})
	}

	render () {
		return (
			<View style={allStyles.containerNoPadding}>
			{
				this.state.refreshing ? <Loading /> : (
					<ScrollView
					ref={ref => {
					    this.scrollview_ref = ref;
					  }}
					showsVerticalScrollIndicator={false}
		      		refreshControl={
			              <RefreshControl
			              refreshing={this.state.refreshing}
			              onRefresh={this._onRefresh}
			            />
			          }>
						<View style={allStyles.container}>
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
						{
							this.state.success &&
							<View style={ allStyles.success }
							onLayout={event => {
								const layout = event.nativeEvent.layout;
								this.scrollview_ref.scrollTo({
									x: 0,
									y: layout.y,
									animated: true,
								});
							}}>
							<Text>{this.state.success}</Text>
							</View>
						}
						<View style={[allStyles.section, allStyles.sectionClear]}>
							{
								this.state.facebook_id ? (
									<View style={[allStyles.card]}>
										<Text style={[allStyles.subheading]}>
											You are currently signed into Facebook.
										</Text>
										<Text style={[allStyles.text]}>
											You have given us permission to access the following information of your Facebook profile:
										</Text>
										<View>
											<Text style={[allStyles.text]}>• Public profile</Text>
											<Text style={[allStyles.text]}>• Email</Text>
											<Text style={[allStyles.text]}>• Friends list</Text>
										</View>
										<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.whiteButton ]}>
											<TabBarIcon name="md-checkmark" style={[ allStyles.buttonIcon ]}/>
											<Text>Facebook connected</Text>
										</TouchableOpacity>	
									</View>
								) : (
									<View style={[allStyles.card]}>
										<Text style={[allStyles.subheading]}>
											Looks like you don't have a Facebook account connected.
										</Text>
										<Text style={[allStyles.text]}>
											Connect your Facebook account so you can find your friends on this platform more easily! 
											It's as easy as clicking a button.
										</Text>
										{
											this.props.users.busy ? 
											<ActivityIndicator/> :
											<FBLoginButton 
											initUser={this.initUser.bind(this)} />
										}
									</View>
								)
							}
						</View>
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
		)
	}
}
export default Settings;
