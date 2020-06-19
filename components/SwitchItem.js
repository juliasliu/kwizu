import React, { PropTypes } from 'react'
import { View, Image, Text, TouchableOpacity, Switch } from 'react-native' 
import Icon from 'react-native-vector-icons/FontAwesome'

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

const SwitchItem = (props) => { 
	return (
			<TouchableOpacity>
				<View style={[allStyles.listItem]}>
					<View style={[allStyles.listItemRight, allStyles.switchItemRight]}>
						<Text style={[allStyles.listItemTitle]}>{ props.text }</Text>
							<Switch
						        trackColor={{ false: "#515d6e", true: "#8393a8" }}
						        thumbColor={props.isEnabled ? "#e1e7ed" : "#F1F2F6"}
						        ios_backgroundColor="#2F3542"
						        onValueChange={() => props.setIsEnabled(props.id)}
						        value={props.isEnabled}
						      />
					</View>
				</View>
			</TouchableOpacity>
	) }
export default SwitchItem