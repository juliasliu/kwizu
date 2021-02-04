import { Platform, StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
	matchContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
	},
	matchProfileContainer: {
	      justifyContent: 'center',
	  },
	  matchButtonContainer: {
		  alignItems: 'center',
	      justifyContent: 'center',
	      padding: 20,
	  },
	  matchButton: {
		  padding: 10,
		  borderRadius: 5,
		  backgroundColor: 'pink',
	  },
});

export default styles;