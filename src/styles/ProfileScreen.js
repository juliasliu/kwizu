import { Platform, StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
	  profileCard: {
		  width: '100%',
		  marginBottom: 20,
	  },
	  profileTopCard: {
		  display: 'flex',
		  flexDirection: 'row',
	  },
	  profilePictureContainer: {
		  display: 'flex',
		  flexDirection: 'row',
		  justifyContent: 'center',
		  width: '50%',
		  marginTop: 20,
		  shadowColor: "#e6e6e6",
		  shadowOffset: {
			  width: 0,
			  height: 5,
		  },
		  shadowOpacity: 1,
		  shadowRadius: 0,
		  elevation: 1,
	  },
	  profilePicture: {
		  width: 125,
		  height: 125,
			borderRadius: 100,
			resizeMode: 'cover',
	  },
	  profileDescriptionContainer: {
		  width: '50%',
		  marginTop: 20,
	  },
	  profileName: {
		  fontSize: 20,
		  fontWeight: 'bold',
	  },
	  profileUsername: {
		  fontSize: 16,
		  color: '#8393a8',
		  fontWeight: 'bold',
	  },
	  profileCaption: {
		  marginTop: 10,
		  color: '#515d6e',
	  },
	  profileLevel: {
		  marginTop: 10,
		  marginBottom: 5,
		  fontWeight: 'bold',
		  color: '#515d6e',
	  },
	  profileLevelBar: {
		  backgroundColor: '#fff',
		  borderRadius: 50,
		  shadowColor: "#ccded4",
		  shadowOffset: {
			  width: 0,
			  height: 5,
		  },
		  shadowOpacity: 1,
		  shadowRadius: 0,
		  elevation: 1,
	  },
	  profileSocialBar: {
		  display: 'flex',
		  flexDirection: 'row',
		  justifyContent: 'space-between',
		  marginTop: 20,
	  },
	  settingsButton: {
		  position: 'absolute',
		  right: 0,
		  fontSize: 24,
		  color: "#B2BECF",
	  },
});

export default styles;