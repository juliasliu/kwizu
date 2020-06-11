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
	Animated
} from 'react-native';
import { observer, inject } from 'mobx-react'

import TabBarIcon from '../components/TabBarIcon';

import allStyles from '../styles/AllScreens';

@inject('users') @observer
export default class PointsAnimation extends React.Component {
	
	state = {
			animatedValue: new Animated.Value(0),
			showPoints: false,
	}
	
	startAnimation() {
		Animated.sequence([
			Animated.spring(this.state.animatedValue, { toValue: 1, speed: 1 }),
			Animated.spring(this.state.animatedValue, { toValue: 0, speed: 1 }),
		]).start();
		this.props.users.togglePoints();
	}

	render() {
		console.log("hi should i show points " + this.props.users.showPoints)
		if (this.props.users.showPoints) {
			this.startAnimation();
		}
		
		const animationStyles = [
			{
				opacity: this.state.animatedValue,
				transform: [
					{
						scale: this.state.animatedValue.interpolate({
							inputRange: [0, 1],
							outputRange: [0.7, 1.5],
						}),
					},
					],
			},
		];
		
		return (
				<Animated.View style={[animationStyles, allStyles.showPointsOverlayContainer]}>
					<View style={allStyles.showPointsContainer}>
						<Image source={require('../assets/images/celebration.png')} style={allStyles.showPointsIcon} />
						<Text style={allStyles.showPointsCaption}>+{this.props.users.pointsAdded} points!</Text>
					</View>
				</Animated.View>
			)
	}
	
}

