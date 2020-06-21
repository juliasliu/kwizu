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
import Modal from 'react-native-modal';
import { InterstitialAd, TestIds, AdEventType} from '@react-native-firebase/admob';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

import TabBarIcon from '../components/TabBarIcon';
import ShareForm from '../components/ShareForm'

@inject('users') @inject('quizzes') @observer
class Publish extends React.Component {
	state = {
			isModalVisible: false,
	};
	
	showInterstitialAd = () => {
	    // Create a new instance
	    const interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

	    // Add event handlers
	    interstitialAd.onAdEvent((type, error) => {
	        if (type === AdEventType.LOADED) {
	            interstitialAd.show();
	        }
	    });

	    // Load a new advert
	    interstitialAd.load();
	}
	
	componentDidMount() {
		this.showInterstitialAd();
	}

	toggleModal = () => {
		this.setState({isModalVisible: !this.state.isModalVisible});
	};
	
	onPressDelete() {
		this.props.quizzes.delete(this.props.quizzes.quiz.id)
		.then(res => {
			console.log("deleted!")
			this.props.navigation.navigate("Home");
		})
		.catch(error => {
			console.log("failed");
			console.log(error);
		})
	}
	
	render() {
		return this.props.quizzes.quiz && (
				<View style={allStyles.containerNoPadding}>
					<ScrollView
					showsVerticalScrollIndicator={false}>
						<View style={allStyles.container}>
							<View style={[ allStyles.section, allStyles.sectionClear ]}>
								<Text style={[ allStyles.title, allStyles.center ]}>Your Kwiz is ready!</Text>
							</View>
								
							<View style={[ allStyles.section, allStyles.sectionClear ]}>
								<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton, styles.shareButton, styles.topShareButton ]}
					                onPress={() => this.props.navigation.push("Take Kwiz", {quiz_id: this.props.quizzes.quiz.id, fromPublish: true})}>
									<TabBarIcon name="md-happy" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
									<Text style={[ allStyles.whiteText ]}>Take your own kwiz</Text>
								</TouchableOpacity>
								<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blackButton, styles.shareButton, styles.bottomShareButton ]}
							        onPress={() => this.props.navigation.push("Kwiz Results", {quiz_id: this.props.quizzes.quiz.id})}>
									<TabBarIcon name="md-trophy" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
									<Text style={[ allStyles.whiteText ]}>See results of your kwiz!</Text>
								</TouchableOpacity>
							</View>
							
							<ShareForm 
							navigation={ this.props.navigation }
							quiz={ this.props.quizzes.quiz } />
							
							<View style={[ allStyles.section, allStyles.sectionClear ]}>
								<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.whiteButton ]}
					                onPress={() => this.props.navigation.push("New Kwiz", {type: "Personality", quiz_id: this.props.quizzes.quiz.id})}>
									<TabBarIcon name="md-create" style={[ allStyles.buttonIcon ]}/>
									<Text>Edit your kwiz</Text>
								</TouchableOpacity>
								<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.redButton ]}
					                onPress={this.toggleModal}>
									<TabBarIcon name="md-trash" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
									<Text style={[ allStyles.whiteText ]}>Delete your kwiz</Text>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				
			      <Modal isVisible={this.state.isModalVisible} 
				      coverScreen={false} 
				      backdropOpacity={0} 
				      onBackdropPress={this.toggleModal} 
				      animationIn="slideInDown"
				      animationOut="slideOutUp"
				      style={[ allStyles.modal ]}>
				      <View style={[ allStyles.card, allStyles.modalView, allStyles.modalViewDanger ]}>
				        <Text style={ allStyles.modalTitle }>Are you sure you want to delete your kwiz? This action is irreversible.</Text>
				        <TouchableOpacity onPress={() => {this.toggleModal(); this.onPressDelete() }} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.whiteButton ]}>
				        	<TabBarIcon name="md-sad" style={[ allStyles.buttonIcon ]}/>
				        	<Text>Yes, delete my kwiz</Text>
				        </TouchableOpacity>
				        <TouchableOpacity onPress={this.toggleModal} style={[ allStyles.button, allStyles.fullWidthButton, allStyles.clearButton ]}>
				        	<Text style={ allStyles.whiteText }>Cancel</Text>
				        </TouchableOpacity>
				      </View>
			    </Modal>
			 </View>
		)
	}
}

export default Publish;