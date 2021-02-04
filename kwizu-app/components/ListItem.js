import React, { PropTypes } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native' 
import Icon from 'react-native-vector-icons/FontAwesome'

import allStyles from '../styles/AllScreens';
import styles from '../styles/ProfileScreen';

const ListItem = (props) => { 
	return (
			<TouchableOpacity onPress={props.onPress}>
				<View style={[allStyles.listItem, props.style]}>
					<View style={[allStyles.listItemLeft]}>
						{
							props.image && 
							<Image source={{uri: props.image}} style={{width: 40,
								height: 40,
								borderRadius: 20, resizeMode: 'cover'}}/>
						}
						{
							props.icon && 
							<Icon name={props.icon} style={[allStyles.icon, allStyles.listItemIcon]}/>
						}
					</View>
					<View style={[allStyles.listItemRight]}>
						<Text style={[allStyles.listItemTitle]}>{ props.text }</Text>
					</View>
					<Icon name="angle-right" size={20} color="#B2BECF" style={{position: 'absolute', right: 20, top: 20}}/>
				</View>
			</TouchableOpacity>
	) }
export default ListItem