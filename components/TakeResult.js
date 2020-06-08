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

class TakeResult extends React.Component {
		
	showPickedImage() {
		const { image_url } = this.props.result;

		if (image_url != null && image_url != undefined) {
			return (
					<Image source={{ uri: image_url }} style={[allStyles.quizResultImage]} />
			);
		} else {
			let imgPlaceholder = 'https://img1.looper.com/img/gallery/things-that-make-no-sense-about-harry-potter/intro-1550086067.jpg';
			return (
					<Image source={{ uri: imgPlaceholder }} style={[allStyles.quizResultImage]} />
			);
		}
	}
	
	render() {
		
		this.state = this.props.result;
		
		return (
			<View style={{ marginTop: 20, }}>
				<View style={[ allStyles.card, allStyles.quizResult, styles.takeResult ]}>
						<View style={[ allStyles.quizResultContainer, styles.takeResultContainer ]}>
							<View style={[ allStyles.card, allStyles.quizResultImageContainer ]}>
								{
									this.showPickedImage()
								}
							</View>
							<Text style={ allStyles.quizResultTitle }>{ this.state.title }</Text>
							<Text style={ allStyles.quizResultDescription }>{ this.state.description }</Text>
						</View>
				</View>
			</View>
		)
	} 
}

export default TakeResult;