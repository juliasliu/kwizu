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
		type: "help",
		title: "",
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
							Please check the FAQ to see if your question has already been addressed before 
							submitting a ticket.
						</Text>
				      </View>
				      <View style={[allStyles.section, allStyles.sectionClear]}>
					      <TextInput
							autoCapitalize='none'
							autoCorrect={false}
							ref='title'
							style={ allStyles.input }
							onChangeText={(title) => this.setProfileTitle(title)}
							returnKeyType='next'
							value={this.state.title}
							placeholder='Title (150 chars max)'
							onSubmitEditing={(event) => {
								this.refs.content.focus();
							}}
						/>
						<TextInput
							autoCapitalize='none'
							ref='content'
							style={[ allStyles.input, allStyles.textarea ]}
							onChangeText={(content) => this.setProfileContent(content)}
							returnKeyType='next'
							value={this.state.content}
							placeholder='Content (1000 chars max)'
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
