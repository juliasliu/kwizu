import React, { PropTypes } from 'react'
import {
	ScrollView,
	TextInput,
	Button,
	Text,
	View,
	Image,
	ActivityIndicator,
	TouchableOpacity
} from 'react-native';

import TabBarIcon from '../components/TabBarIcon';

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

export default function NewResultForm(props) {
	
		return (
				<View style={[ styles.quizForm ]}>
					<View style={[ styles.quizFormHeader, styles.resultHeader ]}>
						<Text style={[ styles.quizFormNumber, allStyles.whiteText ]}>Result {props.result.index + 1}</Text>
					</View>
					<View style={[ allStyles.card ]}>
						
						<TextInput
							returnKeyType='next' 
							style={ allStyles.input } 
							onChangeText={(value) => props.setTitleValue(props.result.index, value)} 
							value={props.result.title} 
							placeholder='Result title (150 chars max)'
						/>
						<TextInput 
							returnKeyType='next' 
							style={[ allStyles.input, allStyles.textarea ]} 
							onChangeText={(value) => props.setDescriptionValue(props.result.index, value)} 
							returnKeyType='next' 
							value={props.result.description} 
							multiline={true}
					    	numberOfLines={5}
							placeholder='Result description (1000 chars max)'
						/>
							
						{props.showPickedImage("result", props.result.index)}

				          	{
				          		props.busy ? 
									<ActivityIndicator/> :
										(
												props.getPickedImage("result", props.result.index) ? (
														<View style={[ styles.imageButtonContainer ]}>
															<TouchableOpacity style={[ styles.imageButtonEdit, allStyles.button, allStyles.grayButton ]}
												                onPress={() => props.getPhotoFromGallery("result", props.result.index)}>
																<TabBarIcon name="md-image" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
																<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Edit Image</Text>
															</TouchableOpacity>
															<TouchableOpacity style={[ styles.imageButtonDelete, allStyles.button, allStyles.redButton ]}
												                onPress={() => props.deletePhoto("result", props.result.index)}>
																<TabBarIcon name="md-trash" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
																<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Delete</Text>
															</TouchableOpacity>
														</View>
													) : (
														<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.grayButton ]}
												            onPress={() => props.getPhotoFromGallery("result", props.result.index)}>
															<TabBarIcon name="md-image" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
															<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Add image</Text>
														</TouchableOpacity>
													)
										)
				          	}
					</View>
					
					<View style={ styles.quizFormAdd }>
						<TouchableOpacity style={[ allStyles.button, allStyles.redButton, styles.quizFormAddButton ]}
			                onPress={() => props.onPressDelete(props.result.index)}>
							<TabBarIcon name="md-trash" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Delete result</Text>
						</TouchableOpacity>
					</View>
			</View>
		)
}
