import { Platform, StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
	  matchProfileContainer: {
		  alignSelf: 'stretch',
		  flexGrow: 3,
//		  backgroundColor: 'gray',
	      justifyContent: 'center',
	  },
	  matchButtonContainer: {
		  alignSelf: 'stretch',
		  flexGrow: 1,
		  flexDirection: 'row',
		  alignItems: 'center',
	      justifyContent: 'center',
	  },
	  matchButton: {
		  padding: 10,
		  borderRadius: 5,
		  backgroundColor: 'pink',
	  },
	  profilePreview: {
		  padding: 20,
		  backgroundColor: 'white',
	  },
	  profilePreviewPhoto: {
		  
	  },
	  profilePreviewTitle: {
		  
	  },
	  profilePreviewCaption: {
		  
	  },
});

export default styles;