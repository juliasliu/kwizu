import React, { PropTypes } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native' 
import Icon from 'react-native-vector-icons/FontAwesome'

import allStyles from '../styles/AllScreens';

const Loading = (props) => { 
	return (
			<View style={{flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
				<Text style={allStyles.sectionMessage}>Loading...</Text>
			</View>
	) 
}
export default Loading