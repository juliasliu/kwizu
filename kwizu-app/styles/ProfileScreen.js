import { Platform, StyleSheet, StatusBar } from 'react-native';
import * as Colors from '../constants/Colors.js';

const styles = StyleSheet.create({
	  profileCard: {
		  width: '100%',
	  },
	  profileThumbnailCard: {
		  borderRadius: 0,
		  borderWidth: 1,
		  borderColor: "#e1e7ed",
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
		  borderColor: "#e1e7ed",
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
		  shadowColor: "#e1e7ed",
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
		  width: 50,
		  height: 50,
	  },
	  profileResultPicture: {
		  width: 50,
		  height: 50,
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
	  profileResultDescriptionContainer: {
		  width: '100%',
	  },
	  chatThumbnailDescriptionContainer: {
		  width: '75%',
		  marginVertical: 10,
		  paddingLeft: 10,
	  },
	  profileChatThumbnailDescriptionContainer: {
		  display: 'flex',
		  flexDirection: 'row',
		  alignItems: 'center',
	  },
	  profileThumbnailDescription: {
		  display: 'flex',
		  flexDirection: 'row',
		  alignItems: 'center',
	  },
	  profileName: {
		  fontSize: 20,
		  fontWeight: 'bold',
	  },
	  profileThumbnailName: {
		  fontSize: 18,
		  maxWidth: '50%',
	  },
	  profileThumbnailUserName: {
		  marginLeft: 10,
		  maxWidth: '50%',
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
		  minWidth: 60,
		  color: '#515d6e',
	  },
	  profileChatThumbnailCheckbox: {
		  display: 'flex',
		  flexDirection: 'row',
		  justifyContent: 'flex-end',
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
	  profileSocialButtonBadge: {
		  flex: 1,
	  },
	  profileSocialButton: {
		  flex: 1,
	  },
	  tabViewBadge: {
		  top: -20,
		  right: -25,
	  },
	  customizeButton: {
		  position: 'absolute',
		  right: 0,
		  fontSize: 24,
		  color: "#a0acba",
		  paddingLeft: 10,
	  },
	  chatContainer: { 
		  flex: 1, 
		  justifyContent: 'space-around', 
		  flexDirection: 'column',
	  },
	  chatMessagesContainer: {
		  flex: 1,
		  justifyContent: 'flex-start',
	  },
	  chatBottomContainer: {
		  flex: 0,
	  },
	  chatInputContainer: {
		  width: '100%',
		  display: 'flex',
		  flexDirection: 'row',
		  padding: 10,
	  },
	  chatInput: {
		  width: '90%',
	  },
	  chatInputIconContainer: {
		  justifyContent: 'center',
		  alignItems: 'center',
		  width: '10%',
	  },
	  chatMessageContainer: {
		  display: 'flex',
		  flexDirection: 'row',
		  alignItems: 'flex-end',
		  justifyContent: 'flex-start',
		  width: '75%',
		  marginVertical: 5,
	  },
	  chatMessageContainerRight: {
		  alignSelf: 'flex-end',
		  flexDirection: 'row-reverse',
	  },
	  chatMessagePictureContainer: {
		  width: '25%',
		  marginVertical: 5,
	  },
	  chatMessagePicture: {
		  width: 40,
		  height: 40,
	  },
	  chatMessageDescriptionContainer: {
		  maxWidth: '75%',
		  marginBottom: 5,
		  paddingHorizontal: 20,
		  paddingVertical: 10,
		  borderRadius: 20,
		  backgroundColor: "#fff",
		  shadowColor: "#e1e7ed",
		  shadowOffset: {
			  width: 0,
			  height: 5,
		  },
		  shadowOpacity: 1,
		  shadowRadius: 0,
		  elevation: 1,
	  },
	  chatQuizMessageContainer: {
		  backgroundColor: "#2ED673",
		  shadowColor: "#1CC15F",
	  },
	  chatQuizMessageDescriptionContainer: {
		  flex: 1,
		  maxWidth: '75%',
		  paddingVertical: 20,
	  },
	  chatMessageDescriptionContainerRight: {
		  backgroundColor: "#8393a8",
		  shadowColor: "#515d6e",
	  },
	  chatMessageDescription: {
		  width: 'auto',
		  fontSize: 16,
	  },
	  chatMessageDescriptionRight: {
		  color: "#fff",
	  },
	  profilePictureEditContainer: {
		  display: 'flex',
		  flexDirection: 'column',
		  alignItems: 'center',
		  marginVertical: 10,
	  },
	  chatQuizImageContainer: {
		  maxWidth: '100%',
		  aspectRatio: 250/150,
	  },
	  chatMessageImageContainerRight: {
		  shadowColor: "#515d6e",
	  },
	  chatQuizImage: {
		  width: '100%',
		  height: '100%',
	  },
	  chatQuizTitle: {
		  marginVertical: 5,
	  },
});

export default styles;