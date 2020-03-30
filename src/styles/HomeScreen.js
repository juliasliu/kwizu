import { Platform, StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
	flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  box: {
      padding: 20,
      alignSelf: 'stretch',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
  },
    boxTitle: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 10,
  },
  quizThumbnailContainer: {
	  flexDirection: 'row',
	  alignItems: 'center',
  },
  quizPreview: {
	width: 250,
	height: 150,
	backgroundColor: 'white',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'darkslategray',
    padding: 10,
    marginRight: 10,
  },
  quizThumbnail: {
	width: 150,
	height: 150,
	backgroundColor: 'white',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'darkslategray',
    padding: 10,
    marginRight: 10,
  },
  quizThumbnailTitle: {
    paddingVertical: 15,
  },
  quizThumbnailDescription: {
    fontSize: 14,
    color: '#2e78b7',
  },
});


export default styles;