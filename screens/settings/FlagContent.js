import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text,
	ActivityIndicator, TouchableOpacity, View, Button, TextInput, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import ImagePicker from 'react-native-image-picker';

import TabBarIcon from '../../components/TabBarIcon';

import allStyles from '../../styles/AllScreens';
import styles from '../../styles/ProfileScreen';

@inject('users') @observer
class Settings extends React.Component {
	state= {
		type: "content",
		title: "",
		id: "",
		content: "",
	}

	componentDidMount() {
		
	}

	render () {
		return (
			    <ScrollView
					ref={ref => {
					    this.scrollview_ref = ref;
					  }}>
					<View style={allStyles.container}>
				      <View style={[allStyles.card, allStyles.center]}>
						<Text style={allStyles.heading}>Flag Content</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							Please use this area to notify us of problematic content published on the platform. 
							Please read over the community guidelines carefully in order to better describe the situation
							and the kwiz that it concerns.
							We will try to respond within 48 hours. For a faster response time,
							please email us at <Text style={[allStyles.link]}>kwizu.app@gmail.com</Text>.
						</Text>
				      </View>
				      <View style={[allStyles.section, allStyles.sectionClear]}>
					      <TextInput
							autoCapitalize='none'
							autoCorrect={false}
							ref='title'
							style={ allStyles.input }
							onChangeText={(title) => this.setState({title})}
							returnKeyType='next'
							value={this.state.title}
							placeholder='Problem title (150 chars max)'
							onSubmitEditing={(event) => {
								this.refs.id.focus();
							}}
						/>
					      <TextInput
							autoCapitalize='none'
							autoCorrect={false}
							ref='id'
							keyboardType='numeric'
							style={ allStyles.input }
							onChangeText={(id) => this.setState({id})}
							returnKeyType='next'
							value={this.state.id}
							placeholder='Unique ID of the kwiz (i.e. 42)'
							onSubmitEditing={(event) => {
								this.refs.content.focus();
							}}
						/>
						<TextInput
							autoCapitalize='none'
							ref='content'
							style={[ allStyles.input, allStyles.textarea ]}
							onChangeText={(content) => this.setState({content})}
							returnKeyType='next'
							value={this.state.content}
							placeholder='Problem description (1000 chars max)'
								multiline={true}
						/>
							{
								this.props.users.busy ?
										<ActivityIndicator/> :
								<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.redButton ]} onPress={() => alert("")}>
									<Text style={ allStyles.whiteText }>Submit a Ticket</Text>
								</TouchableOpacity>
							}
					      </View>
				</View>
			</ScrollView>
		)
	}
}
export default Settings;
