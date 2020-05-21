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
	  width: '30%',
	  height: 50,
	  marginVertical: 0,
	  borderTopRightRadius: 0,
	  borderBottomRightRadius: 0,
	  zIndex: 2,
  },
  choiceInputField: {
	  width: '57.5%',
	  marginVertical: 0,
	  borderRadius: 0,
  },
  choiceInputDelete: {
	  width: '12.5%',
	  height: 50,
	  marginVertical: 0,
	  borderTopLeftRadius: 0,
	  borderBottomLeftRadius: 0,
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
		  borderColor: '#e1e7ed',
		  borderWidth: 1,
		  marginVertical: 0,
  },
  choiceText: {
	  width: '90%',
	  paddingLeft: '10%',
  },
});


export default styles;