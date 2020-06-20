import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text, Linking,
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
		category: "help",
		title: "",
		description: "",
		busy: false,
		errors: null,
		success: null,
	}

	submitTicket() {
		this.props.users.submitTicket(this.state)
		.then((res) => {
			this.setState({title: "", description: ""});
			this.setState({success: this.props.users.success, errors: null})
		})
		.catch((errors) => {
			this.setState({errors: this.props.users.errors})
		})
	}

	render () {
		return (
			      <ScrollView
					ref={ref => {
					    this.scrollview_ref = ref;
					  }}>
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
				      <View style={[allStyles.card, allStyles.center]}>
						<Text style={allStyles.heading}>Help Center</Text>
						<Text style={[allStyles.text, allStyles.center]}>
							Please check the FAQ to see if your question has already been addressed before 
							submitting a ticket. If you have specific concerns regarding a kwiz or user, please file 
							a ticket using the <Text style={[allStyles.link]} onPress={() => this.props.navigation.push("Flag Content")}>Flag Content</Text> or 
							<Text style={[allStyles.link]} onPress={() => this.props.navigation.push("Report a User")}> Report a User</Text> pages instead.
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
							placeholder='Question title (150 chars max)'
							onSubmitEditing={(event) => {
								this.refs.description.focus();
							}}
						/>
						<TextInput
							autoCapitalize='none'
							ref='description'
							style={[ allStyles.input, allStyles.textarea ]}
							onChangeText={(description) => this.setState({description})}
							returnKeyType='next'
							value={this.state.description}
							placeholder='Question description (1000 chars max)'
								multiline={true}
						/>
							{
								this.props.users.busy ?
										<ActivityIndicator/> :
								<TouchableOpacity style={[ allStyles.button, allStyles.fullWidthButton, allStyles.blueButton ]} onPress={this.submitTicket.bind(this)}>
									<Text style={ allStyles.whiteText }>Submit a Ticket</Text>
								</TouchableOpacity>
							}
					      </View>
					  </View>
				</View>
				</ScrollView>
		)
	}
}
export default Settings;
