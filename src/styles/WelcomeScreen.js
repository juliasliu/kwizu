import { Platform, StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
	logoContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: "100%",
	},
	logo: {
		color: '#ccc',
	},
	welcomeButtonsContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: '100%',
	},
})

export default styles;