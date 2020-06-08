import { Platform, StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
	welcomeContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: 50,
	},
	logoContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		height: '50%',
	},
	logo: {
		color: '#ccc',
	},
	welcomeButtonsContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '50%',
	},
})

export default styles;