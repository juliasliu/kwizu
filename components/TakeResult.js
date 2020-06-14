import React, { PropTypes } from 'react'
import {
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

import allStyles from '../styles/AllScreens';
import styles from '../styles/HomeScreen';

export default function TakeResult(props) {
		
	showPickedImage = () => {
		const { image_url } = props.result;

		if (image_url != null && image_url != undefined) {
			return (
					<Image source={{ uri: image_url }} style={[allStyles.quizResultImage]} />
			);
		} else {
			return null;
		}
	}
	
		return (
			<View style={{ marginTop: 20, }}>
				<View style={[ allStyles.card, allStyles.quizResult, styles.takeResult ]}>
						<View style={[ allStyles.quizResultContainer, styles.takeResultContainer ]}>
							<View style={[ allStyles.card, allStyles.quizResultImageContainer ]}>
								{
									this.showPickedImage()
								}
							</View>
							<Text style={ allStyles.quizResultTitle }>{ props.result.title }</Text>
							<Text style={ allStyles.quizResultDescription }>{ props.result.description }</Text>
						</View>
				</View>
			</View>
		)
}
