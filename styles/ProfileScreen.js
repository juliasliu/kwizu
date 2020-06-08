import { Platform, StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
	  profileCard: {
		  width: '100%',
	  },
	  profileThumbnailCard: {
//		marginBottom: 20,  
		  borderRadius: 0,
		  borderWidth: 1,
		  borderColor: "#e6e6e6",
	  },
	  topProfileThumbnailCard: {
		  borderTopLeftRadius: 20,
		  borderTopRightRadius: 20,
	  },
	  bottomProfileThumbnailCard: {
		  borderBottomLeftRadius: 20,
		  borderBottomRightRadius: 20,
	  },
	  chatThumbnailCard: {
		  borderRadius: 0,
		  borderWidth: 1,
		  borderColor: "#e6e6e6",
		  },
		  topChatThumbnailCard: {
			  borderTopLeftRadius: 20,
			  borderTopRightRadius: 20,
		  },
		  bottomChatThumbnailCard: {
			  borderBottomLeftRadius: 20,
			  borderBottomRightRadius: 20,
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
		  marginVertical: 20,
		  shadowColor: "#e6e6e6",
		  shadowOffset: {
			  width: 0,
			  height: 5,
		  },
		  shadowOpacity: 1,
		  shadowRadius: 0,
		  elevation: 1,
	  },
	  profileThumbnailPictureContainer: {
		  width: '25%',
		  marginVertical: 10,
	  },
	  chatThumbnailPictureContainer: {
		  width: '25%',
		  marginVertical: 10,
	  },
	  profilePicture: {
		  width: 125,
		  height: 125,
			borderRadius: 100,
			resizeMode: 'cover',
	  },
	  profileThumbnailPicture: {
		  width: 75,
		  height: 75,
	  },
	  chatThumbnailPicture: {
		  width: 75,
		  height: 75,
	  },
	  profileDescriptionContainer: {
		  width: '50%',
		  marginVertical: 20,
		  paddingRight: 10,
		  display: 'flex',
		  flexDirection: 'column',
		  justifyContent: 'center',
	  },
	  profileThumbnailDescriptionContainer: {
		  width: '75%',
		  marginVertical: 10,
		  paddingLeft: 10,
	  },
	  chatThumbnailDescriptionContainer: {
		  width: '75%',
		  marginVertical: 20,
		  paddingLeft: 10,
	  },
	  profileName: {
		  fontSize: 20,
		  fontWeight: 'bold',
	  },
	  profileThumbnailName: {
		  fontSize: 18,
	  },
	  chatThumbnailName: {
		  fontSize: 18,
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
	  chatThumbnailCaption: {
		  marginTop: 10,
		  color: '#515d6e',
		  display: 'flex',
		  flexDirection: 'row',
		  flex: 1,
	  },
	  chatThumbnailText: {
		  width: '75%',
	  },
	  chatThumbnailTime: {
		  width: '25%',
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
	  },
	  settingsButton: {
		  position: 'absolute',
		  right: 0,
		  fontSize: 24,
		  color: "#B2BECF",
	  },
	  friendsList: {
		  marginTop: 20,
	  },
	  chatContainer: { 
		  flexGrow: 1, 
		  justifyContent: 'space-between', 
		  flexDirection: 'column' 
	  },
	  chatInputContainer: {
		  width: '100%',
		  display: 'flex',
		  flexDirection: 'row',
		  justifyContent: 'flex-start',
		  padding: 10,
		  backgroundColor: "#515d6e",
	  },
	  chatInput: {
		  width: '90%',
	  },
	  chatInputIconContainer: {
		  justifyContent: 'center',
		  alignItems: 'center',
		  paddingLeft: 10,
		  width: '10%',
	  },
	  chatMessageContainer: {
		  display: 'flex',
		  flexDirection: 'row',
		  alignItems: 'flex-end',
		  justifyContent: 'flex-start',
		  width: '75%',
	  },
	  chatMessageContainerRight: {
		  alignSelf: 'flex-end',
		  flexDirection: 'row-reverse',
	  },
	  chatMessagePictureContainer: {
		  width: '25%',
		  marginVertical: 10,
	  },
	  chatMessagePicture: {
		  width: 50,
		  height: 50,
	  },
	  chatMessageDescriptionContainer: {
		  maxWidth: '75%',
		  marginBottom: 10,
		  paddingHorizontal: 20,
		  paddingVertical: 10,
		  borderRadius: 20,
		  backgroundColor: "#fff",
		  shadowColor: "#e6e6e6",
		  shadowOffset: {
			  width: 0,
			  height: 5,
		  },
		  shadowOpacity: 1,
		  shadowRadius: 0,
		  elevation: 1,
	  },
	  chatMessageDescriptionContainerRight: {
		  backgroundColor: "#8393a8",
		  shadowColor: "#515d6e",
	  },
	  chatMessageDescription: {
		  width: 'auto',
		  fontSize: 18,
	  },
	  chatMessageDescriptionRight: {
		  color: "#fff",
	  },
});

export default styles;