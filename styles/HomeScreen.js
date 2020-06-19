import { Platform, StyleSheet, StatusBar, Dimensions } from 'react-native';
import * as Colors from '../constants/Colors.js';

const styles = StyleSheet.create({
  quizCard: {
		backgroundColor: '#fff',
	    marginRight: 20,
	    marginBottom: 20,
	    padding: 0,
	    display: 'flex',
	    flexDirection: 'row',
	    alignItems: 'flex-end',
  },
  quizPreview: {
	  maxWidth: (Dimensions.get('window').width - 80) * 3 / 4,
	  width: (Dimensions.get('window').width - 80) * 3 / 4,
	  minHeight: 150,
	  aspectRatio: 250/150,
  },
  quizThumbnail: {
	  maxWidth: (Dimensions.get('window').width - 80) / 2,
	  width: (Dimensions.get('window').width - 80) / 2,
	  minHeight: 150,
	  aspectRatio: 150/150,
  },
  quizImageContainer: {
	  flex: 1,
		position: 'absolute',
		width: '100%',
		height: '100%',
  },
  quizImage: {
	  resizeMode: 'cover',
		width: '100%',
		height: '100%',
		borderRadius: 20,
  },
  quizImageOverlay: {
	  flex: 1,
	    position: 'absolute',
		width: '100%',
		height: '100%',
		borderRadius: 20,
	    opacity: 0.15,
	    backgroundColor: '#000',
  },
  quizDraftOverlay: {
	  opacity: 0.5,
  },
  quizThumbnailTitle: {
    padding: 10,
    fontSize: 16,
	  fontWeight: 'bold',
	  color: '#fff',
  },
  quizThumbnailDescription: {
    fontSize: 14,
    color: '#2F3542',
  },
  quizForm: {
		marginVertical: 20,  
	  },
	  quizFormHeaderContainer: {
		  display: 'flex',
		  flexDirection: 'row',
		  justifyContent: 'space-between',
	  },
  quizFormHeader: {
	  marginLeft: 'auto',
	  marginRight: 'auto',
	  backgroundColor: '#485061',
	  borderTopLeftRadius: 20,
	  borderTopRightRadius: 20,
	  padding: 10,
  },
  resultHeader: {
	  width: '90%',
  },
  questionHeader: {
	  width: '33.333%',
	  marginLeft: '5%',
	  marginRight: 'auto',
  },
  quizFormNumber: {
	  textAlign: 'center',
	  fontWeight: 'bold',
	  fontSize: 16,
  },
  quizFormAdd: {
	  width: 'auto',
	  display: 'flex',
	  flexDirection: 'row',
	  justifyContent: 'space-between',
  },
  quizFormAddButton: {
	  marginRight: '5%',
	  marginLeft: 'auto',
	  marginVertical: 0,
	  borderTopLeftRadius: 0,
	  borderTopRightRadius: 0,
	  paddingHorizontal: 20,
  }, 
  imageButtonContainer: {
	  display: 'flex',
		flexDirection: 'row',
		  alignItems: 'center',
		width: '100%',
  },
  imageButtonEdit: {
	  width: '66.666%',
	  marginVertical: 0,
	  borderTopRightRadius: 0,
	  borderBottomRightRadius: 0,
  },
  imageButtonDelete: {
	  width: '33.333%',
	  marginVertical: 0,
	  borderTopLeftRadius: 0,
	  borderBottomLeftRadius: 0,
  },
  choiceContainer: {
	  marginVertical: 10,
  },
  choiceInput: {
		display: 'flex',
		flexDirection: 'row',
		  alignItems: 'center',
		width: '100%',
  },
  choiceInputSelect: {
	  flex: 3,
	  height: 45,
	  marginVertical: 0,
	  borderTopRightRadius: 0,
	  borderBottomRightRadius: 0,
	  zIndex: 2,
  },
  choiceInputField: {
	  flex: 5,
	  marginVertical: 0,
	  borderRadius: 0,
  },
  choiceInputDelete: {
	  flex: 1,
	  height: 45,
	  marginVertical: 0,
	  borderTopLeftRadius: 0,
	  borderBottomLeftRadius: 0,
  },
  quizSaveText: {
	  textAlign: 'center', 
	  marginTop: 10,
  },
  imagePreview: {
	  marginVertical: 10,
	  width: '100%',
	  aspectRatio: 250/150,
		borderRadius: 20,
  },
  shareLinkCard: {
	  display: 'flex',
	  flexDirection: 'row',
	  justifyContent: 'space-between',
  },
  shareFormHeader: {
	  marginLeft: '5%',
	  marginRight: 'auto',
  },
  shareLink: {
	  padding: 20,
	  fontSize: 16,
  },
  shareButton: {
	  borderRadius: 0,
	  borderWidth: 0,
	  marginVertical: 0,
	  height: 50,
  },
  topShareButton: {
	  borderTopLeftRadius: 20,
	  borderTopRightRadius: 20,
  },
  bottomShareButton: {
	  borderBottomLeftRadius: 20,
	  borderBottomRightRadius: 20,
  },
  takeResult: {
	  height: 'auto',
  },
  takeResultContainer: {
	  justifyContent: 'center',
	  height: 'auto',
  },
  resultLeaderboardTitle: {
	  marginTop: 0,
  },
  question: {
	  fontSize: 18,
	  fontWeight: 'bold',
	  color: '#515d6e',
	  padding: 10,
  },
  choice: {
		display: 'flex',
		flexDirection: 'row',
		  borderColor: '#e1e7ed',
		  borderWidth: 1,
		  marginVertical: 0,
  },
  choiceText: {
	  width: '90%',
	  paddingLeft: '10%',
  },
  searchQuizContainer: {
	  display: 'flex',
	  flexDirection: 'row',
	  flexWrap: 'wrap',
  },
});


export default styles;