import { Platform, StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
	  contentContainer: {
		flex: 1,
	    flexDirection: 'column',
	    alignItems: 'center',
	  },
	  matchProfileContainer: {
		  alignSelf: 'stretch',
		  flexGrow: 3,
//		  backgroundColor: 'gray',
	      justifyContent: 'center',
		  padding: 50,
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
		    borderWidth: 1,
		    borderStyle: 'dashed',
		    borderColor: 'darkslategray',
	  },
	  profilePreviewPhoto: {
		  
	  },
	  profilePreviewTitle: {
		  
	  },
	  profilePreviewCaption: {
		  
	  },
});

export default styles;