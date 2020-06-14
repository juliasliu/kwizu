import { Platform, StyleSheet, StatusBar, Dimensions } from 'react-native';
import * as Colors from '../constants/Colors.js';

const styles = StyleSheet.create({
	welcomeContainer: {
		flex: 1,
	},
	welcomeBackgroundContainer: {
		flex: 1,
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	welcomeBackground: {
		flex: 1,
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	welcomeButtonsContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: 50,
		paddingHorizontal: 50,
		backgroundColor: 'transparent',
	},
	welcomeButtons: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: '100%',
		height: '50%',
		backgroundColor: 'transparent',
	},
	welcomeFormContainer: {
		flex: 1,
		display: 'flex',
		backgroundColor: 'transparent',
		paddingTop: 50,
	},
	welcomeForm: {
		flex: 1,
		display: 'flex',
		padding: 50,
	},
})

export default styles;