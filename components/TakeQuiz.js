import React, { PropTypes } from 'react'
import {
	ScrollView,
	TextInput,
	Button,
	Text,
	View,
	Image,
	ActivityIndicator,
	TouchableOpacity,
	  Dimensions,
} from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import TabBarIcon from '../components/TabBarIcon';

import ShareForm from '../components/ShareForm'
import QuizThumbnail from '../components/QuizThumbnail'
import TakeResult from '../components/TakeResult'

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

export default function TakeQuiz(props) {
	
	return (
					<View
				      onLayout={event => {
					        const layout = event.nativeEvent.layout;
					        if (props.scrollIndexHelper) props.scrollIndexHelper();
					        if (props.scrollToNext) props.scrollToNext();
					      }}>
						{
							props.resultOfQuiz &&
								(
									<TakeResult result={props.resultOfQuiz} />	
								)
						}
						
						<View style={[allStyles.section, {paddingBottom: 40}]}>
							{
								props.viewMyResult ? (
									<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton, styles.shareButton, styles.topShareButton ]}
						                onPress={props.retakeQuiz}>
										<TabBarIcon name="md-happy" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
										<Text style={[ allStyles.whiteText ]}>Retake the kwiz</Text>
									</TouchableOpacity>
								) : (
									<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton, styles.shareButton, styles.topShareButton ]}
						                onPress={props.takeQuiz}>
										<TabBarIcon name="md-happy" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
										<Text style={[ allStyles.whiteText ]}>View your own result</Text>
									</TouchableOpacity>
								)
							}
							<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.blackButton, styles.shareButton, styles.bottomShareButton ]}
						        onPress={() => props.navigation.push("Kwiz Results", {quiz_id: props.quiz.id})}>
								<TabBarIcon name="md-trophy" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
								<Text style={[ allStyles.whiteText ]}>See how your friends did!</Text>
							</TouchableOpacity>
						</View>

					      <View style={allStyles.section}>
					      {
					    	  props.viewMyResult ? (
					    			  <Text style={allStyles.sectionTitle}>Recommended</Text>
					    	  ) : (
					    			  <Text style={allStyles.sectionTitle}>{props.user.name} took these kwizzes:</Text>
					    	  )
					      }
					    	
					      	<Text style={allStyles.sectionSubtitle}>Take another one! We promise it's not an addiction. ;)</Text>
					    	<ScrollView contentContainerStyle={allStyles.quizThumbnailContainer} showsHorizontalScrollIndicator={false} horizontal= {true} decelerationRate={0} snapToInterval={150} snapToAlignment={"center"}>
					  			{
					  				props.recommended.map(( item, key ) =>
					  				{
					  					return item != undefined && (
					  							<QuizThumbnail 
					  									quiz={item}
					  									key={key}
					  									type={"thumbnail"}
					  									navigation={props.navigation}/>
					  						)
					  				})
					  			}
					  		</ScrollView>
					      </View>
						{
							props.viewMyResult && (
								<View style={[allStyles.section]}>
									<Text style={allStyles.sectionTitle}>Share your results!</Text>
									<Text style={allStyles.sectionSubtitle}>Share the fun by sending the Kwiz to your friends or posting on social media.</Text>
									<ShareForm 
									navigation={ props.navigation }
									quiz={ props.quiz }
									user={ props.user }/>
								</View>	
							)
						}
						
					</View>
			)
}
