import { Platform, StyleSheet, StatusBar } from 'react-native';
import * as Colors from '../constants/Colors.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2F6',
	  padding: 10,
  },
  contentContainer: {
		flex: 1,
	    flexDirection: 'column',
	    alignItems: 'center',
	  },
  flexContainer: {
	  flexWrap: 'wrap', 
      alignItems: 'flex-start',
      flexDirection:'row',  
      justifyContent: 'space-between',
  },
  modal: {
	  justifyContent: 'flex-start',
	  marginTop: 100,
  },
  modalView: {
	  flex: 0,
	  borderRadius: 20,
	  alignItems: 'center',
	  shadowColor: "#e1e7ed",
	  shadowOffset: {
		  width: 0,
		  height: 5,
	  },
	  shadowOpacity: 1,
	  shadowRadius: 0,
	  elevation: 1,
  },
  modalTitle: {
	color: '#fff',
	fontWeight: 'bold',
	fontSize: 16,
	marginVertical: 10,
	textAlign: 'center',
  },
  modalViewDark: {
	  backgroundColor: "#515d6e",
		shadowColor: "#2F3542",
  },
  modalViewDanger: {
	  backgroundColor: '#E94E4E',
	  shadowColor: "#BA3E3E",
  },
  tabBar: {
	  backgroundColor: '#515d6e',
  },
  tabBarContainer: {
	  display: 'flex',
	  flexDirection: 'row',
	  alignItems: 'center',
  },
  tabIndicator: {
	  backgroundColor: '#fff',
  },
  tabBarIcon: {
	 paddingRight: 10,
  },
  tabBarLabel: {
	  fontSize: 16,
  },
  section: {
      alignSelf: 'stretch',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#B2BECF',
      paddingVertical: 20,
  },
  sectionClear: {
	borderBottomWidth: 0,  
  },
    sectionTitle: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 10,
  },
    sectionSubtitle: {
        fontWeight: 'bold',
      marginBottom: 10,
      color: '#8393a8',
  },
  sectionMessage: {
	  textAlign: 'center',
	  paddingVertical: 20,
      fontWeight: 'bold',
	  color: '#8393a8',
  },
  link: {
	color: 'blue',  
  },
  title: {
	fontSize: 32,  
    fontWeight: 'bold',
    marginVertical: 10,
  },
  heading: {
		fontSize: 28,  
	    fontWeight: 'bold',
	    marginVertical: 10,
	  },
  headerIcon: {
	  color: '#B2BECF',
	  paddingHorizontal: 25,
  },
  success: {
	  backgroundColor: '#B2DBBF', 
	  borderRadius: 5, 
	  alignItems: 'center', 
	  marginBottom: 10,
	  padding: 20,
  },
  error: {
	  backgroundColor: '#fcc', 
	  borderRadius: 5, 
	  alignItems: 'center', 
	  marginBottom: 10,
	  padding: 20,
  },
  input: {
	backgroundColor: '#fff',
	height: 50,
	  marginVertical: 10,
	  padding: 10,
	  borderRadius: 20,
	  borderColor: "#e1e7ed",
	  borderWidth: 1,
	  shadowColor: "#e1e7ed",
	  shadowOffset: {
		  width: 0,
		  height: 5,
	  },
	  shadowOpacity: 1,
	  shadowRadius: 0,
	  elevation: 1,
  },
  textarea: {
		height: 100,
	    justifyContent: "flex-start",
	    textAlignVertical: 'top',
	    borderRadius: 20,
	  },
	  dropdown: {
		  flex: 1, 
		  width: 'auto',
	  },
	  dropdownInput: {
		borderBottomWidth: 0,
	  },
	  dropdownPicker: {
		  width: 'auto',
		  padding: 0,
		  borderWidth: 1,
		  borderColor: '#e1e7ed',
	  },
  button: {
	  display: 'flex',
	  flexDirection: 'row',
	  justifyContent: "center",
	  alignItems: "center",
	  backgroundColor: "#fff",
	  fontSize: 20,
	  marginVertical: 10,
	  padding: 10,
	  borderWidth: 1,
	  borderRadius: 20,
	  shadowColor: "#e1e7ed",
	  shadowOffset: {
		  width: 0,
		  height: 5,
	  },
	  shadowOpacity: 1,
	  shadowRadius: 0,
	  elevation: 1,
  },
  buttonIcon: {
	color: '#515d6e',
	paddingHorizontal: 5,
	fontSize: 18,
  },
  whiteText: {
	color: "#fff",
  },
	fullWidthButton: {
		width: '100%',
	},
	fullWidthButtonText: {
		fontSize: 16,
	},
	halfWidthButton: {
		width: '47.5%',
	},
	clearButton: {
		backgroundColor: 'transparent',
		shadowColor: 'transparent',
		padding: 0,
		borderWidth: 0,
	},
  greenButton: {
	  backgroundColor: '#2ED673',
	  shadowColor: "#1CC15F",
	  borderColor: "#1CC15F",
  },
  blueButton: {
	  backgroundColor: '#4d70bd',
	  shadowColor: "#3C5999",
	  borderColor: '#3C5999',
  },
  redButton: {
	  backgroundColor: '#E94E4E',
	  shadowColor: "#BA3E3E",
	  borderColor: "#BA3E3E",
  },
  whiteButton: {
	  backgroundColor: '#fff',
	  shadowColor: "#e1e7ed",
	  borderColor: "#e1e7ed",
  },
  yellowButton: {
	  backgroundColor: '#FFD660',
	  shadowColor: '#e6be4c',
	  borderColor: '#e6be4c',
  },
  blackButton: {
	backgroundColor: "#485061",
	shadowColor: "#2F3542",
	borderColor: "#2F3542",
  },
  grayButton: {
		backgroundColor: "#a0acba",
		shadowColor: "#8b9db0",
		borderColor: "#8b9db0",
	  },
	  facebookButton: {
		  backgroundColor: '#4d70bd',
		  shadowColor: "#3C5999",
		  borderColor: '#3C5999',
	  },
	  messengerButton: {
		  backgroundColor: '#00C6FF',
		  shadowColor: "#0078FF",
		  borderColor: '#0078FF',
	  },
	  snapchatButton: {
		  backgroundColor: '#d6d427',
		  shadowColor: "#ccc90c",
		  borderColor: '#ccc90c',
	  },
	  whatsappButton: {
		  backgroundColor: '#25D366',
		  shadowColor: "#075E54",
		  borderColor: '#075E54',
	  },
	  instagramButton: {
		  backgroundColor: '#E1306C',
		  shadowColor: "#C13584",
		  borderColor: '#C13584',
	  },
	  twitterButton: {
		  backgroundColor: '#1DA1F2',
		  shadowColor: "#0c85cf",
		  borderColor: '#0c85cf',
	  },
  card: {
	  padding: 10,
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
	  width: '100%',  
  },
  quizThumbnailContainer: {
	  display: 'flex',
	  flexDirection: 'row',
	  alignItems: 'center',
	  paddingTop: 10,
  },
  quizResult: {
	  alignItems: 'center',
	  marginVertical: 10,
	  backgroundColor: "#fff",
	  display: 'flex',
	  flexDirection: 'row',
	  alignItems: 'flex-start',
		height: 200,
  },
  quizResultContainer: {
	  width: '100%',
	  height: '100%',
	  display: 'flex',
	  flexDirection: 'column',
	  justifyContent: 'flex-end',
	  paddingVertical: 5,
  },
  quizResultImageContainer: {
	  padding: 0,
  },
  quizResultImage: {
	  aspectRatio: 250/150,
		resizeMode: 'cover',
		borderRadius: 20,
  },
  quizResultTitle: {
	  fontSize: 18,
	  fontWeight: 'bold',
	  color: '#515d6e',
	  marginTop: 20,
	  textAlign: 'center',
  },
  quizResultDescription: {
	  fontSize: 14,
	  color: '#8393a8',
	  fontWeight: 'bold',
	  marginVertical: 10,
	  textAlign: 'center',
  },
  quizResultDropdownButton: {
	  fontSize: 32,
	  marginRight: 10,
	  color: '#fff',
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
	  leaderboardResult: {
		  marginBottom: 20,
	  },
	  leaderboardResultNone: {
		  fontSize: 16,
		  color: '#515d6e',
		  textAlign: 'center',
	  },
	  searchInputContainer: {
		  paddingHorizontal: 20,
		  paddingTop: 10,
		  backgroundColor: "#F1F2F6",
	  },
	  blackInputContainer: {
		  backgroundColor: "#515d6e",
	  },
	  searchInput: {
		  display: 'flex',
		  flexDirection: 'row',
		  alignItems: 'center',
		  shadowColor: 'transparent',
	  },
	  searchIcon: {
		  color: '#8393a8',
		  paddingHorizontal: 10,
	  },
	  searchDeleteIcon: {
		  fontSize: 20,
	  },
	  searchInputText: {
		  fontSize: 16,
		  width: '80%',
	  },
	  showPointsOverlayContainer: {
		  position: 'absolute',
		  left: 0,
		  right: 0,
		  top: 0,
		  bottom: 0,
		  height: '100%',
		  width: '100%',
		  display: 'flex',
		  flexDirection: 'column',
		  alignItems: 'center',
		  justifyContent: 'center',
			zIndex: 100,
	  },
	  showPointsContainer: {
			alignItems: 'center',
			backgroundColor: "#fff",
			borderRadius: 100,
			width: '50%',
			aspectRatio: 1,
			padding: 20,
	  },
	  showPointsIcon: {
		  height: 100,
		  width: 100,
	  },
	  showPointsCaption: {
		  fontSize: 24,
		  fontWeight: 'bold',
		  color: "#515d6e",
	  },
});

export default styles;