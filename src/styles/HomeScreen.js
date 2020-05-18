import { Platform, StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  quizThumbnailContainer: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  paddingVertical: 10,
  },
  quizCard: {
		backgroundColor: '#fff',
	    padding: 10,
	    marginRight: 20,
	    display: 'flex',
	    flexDirection: 'row',
	    alignItems: 'flex-end',
  },
  quizPreview: {
	width: 250,
	height: 150,
  },
  quizThumbnail: {
	width: 150,
	height: 150,
  },
  quizThumbnailTitle: {
    paddingVertical: 10,
	  fontWeight: 'bold',
	  color: '#515d6e',
  },
  quizThumbnailDescription: {
    fontSize: 14,
    color: '#2F3542',
  },
  quizFormContainer: {
	  paddingHorizontal: 20,
  },
  quizForm: {
		marginTop: 20,  
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
  },
  quizFormAdd: {
	  width: 'auto',
	  display: 'flex',
	  flexDirection: 'row',
	  justifyContent: 'space-between',
  },
  quizFormAddButton: {
	  marginHorizontal: '5%',
	  marginVertical: 0,
	  borderTopLeftRadius: 0,
	  borderTopRightRadius: 0,
	  borderWidth: 0,
	  padding: 10,
	  shadowOffset: {
		  width: 0,
		  height: 5,
	  },
	  shadowOpacity: 1,
	  shadowRadius: 0,
	  elevation: 1,
  }, 
  choiceContainer: {
	  
  },
  choiceInput: {
	display: 'flex',
	flexDirection: 'row',
	  alignItems: 'center',
  },
  choiceInputField: {
	  width: '75%',
	  borderRadius: 0,
  },
  choiceInputSelect: {
	  borderTopRightRadius: 0,
	  borderBottomRightRadius: 0,
	  height: 50,
  },
  choiceInputDelete: {
	  borderTopLeftRadius: 0,
	  borderBottomLeftRadius: 0,
	  height: 50,
  },
  quizSaveText: {
	  textAlign: 'center', 
	  marginTop: 10,
  },
  shareLinkCard: {
	  display: 'flex',
	  flexDirection: 'row',
	  justifyContent: 'space-between',
  },
  shareLink: {
	  padding: 20,
	  fontSize: 16,
  },
  shareButton: {
	  borderRadius: 0,
	  borderWidth: 0,
	  marginVertical: 0,
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
		  alignItems: 'center',
		  marginVertical: 10,
		  borderColor: '#e1e7ed',
		  borderWidth: 1,
  },
  choiceText: {
	  width: '75%',
	  paddingLeft: 10,
  },
});


export default styles;