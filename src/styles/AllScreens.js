import { Platform, StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  flexContainer: {
	  flexWrap: 'wrap', 
      alignItems: 'flex-start',
      flexDirection:'row',  
      justifyContent: 'space-between',
  },
  link: {
	color: 'blue',  
  },
  title: {
	fontSize: 32,  
  },
  headerRightIcon: {
	  paddingRight: 25,
	  color: '#555',
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
	height: 45,
	  marginTop: 10,
	  marginBottom: 10,
	  paddingLeft: 20,
	  paddingRight: 20,
	  paddingTop: 10,
	  paddingBottom: 10,
	  borderRadius: 50,
	  shadowColor: "#ccc",
	  shadowOffset: {
		  width: 0,
		  height: 3,
	  },
	  shadowOpacity: 1,
	  shadowRadius: 0,
	  elevation: 1,
  },
  button: {
	  alignItems: "center",
	  backgroundColor: "#ddd",
	  fontSize: 20,
	  marginTop: 10,
	  marginBottom: 10,
	  padding: 10,
	  borderRadius: 50,
	  shadowColor: "#aaa",
	  shadowOffset: {
		  width: 0,
		  height: 5,
	  },
	  shadowOpacity: 1,
	  shadowRadius: 0,
	  elevation: 1,
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
  greenButton: {
	  backgroundColor: '#2ED673',
	  shadowColor: "#1CC15F",
  },
  blueButton: {
	  backgroundColor: '#4d70bd',
	  shadowColor: "#3C5999",
  },
  redButton: {
	  backgroundColor: '#E94E4E',
	  shadowColor: "#BA3E3E",
  },
  whiteButton: {
	  backgroundColor: '#fff',
	  shadowColor: "#ddd",
  },
  blackButton: {
	backgroundColor: "#2F3542",
	shadowColor: "#000",
  },
});

export default styles;