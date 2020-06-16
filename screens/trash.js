<View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />

          <Text style={styles.getStartedText}>Open up the code for this screen:</Text>

          <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>screens/HomeScreen.js</MonoText>
          </View>

          <Text style={styles.getStartedText}>
            Change any of the text, save the file, and your app will automatically reload.
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

        <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>navigation/BottomTabNavigator.js</MonoText>
        </View>
      </View>
    </View>
    
    
    //Profile.js
    import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function Profile() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <OptionButton
        icon="md-school"
        label="Read the Expo documentation"
        onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
      />

      <OptionButton
        icon="md-compass"
        label="Read the React Navigation documentation"
        onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      />

      <OptionButton
        icon="ios-chatboxes"
        label="Ask a question on the forums"
        onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
        isLastOption
      />
      
        
    </ScrollView>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

<View style={allStyles.section}>
	<Text style={allStyles.sectionTitle}>Trivia</Text>
	<Text style={allStyles.sectionSubtitle}>See how you measure up to others in your trivia game. Take these kwizzes to find out!</Text>
<ScrollView contentContainerStyle={allStyles.quizThumbnailContainer} horizontal= {true} decelerationRate={0} snapToInterval={150} snapToAlignment={"center"}>
{
		quizzesArray(3)
	}
</ScrollView>
</View>

<View style={[allStyles.searchInputContainer]}>
<View style={[ allStyles.input, allStyles.searchInput ]}>
  <Icon
    name='search'
    style={allStyles.searchIcon}
  />
  <TextInput
  style={[ allStyles.searchInputText ]}
  placeholder={'Find a friend here...'}
  placeholderTextColor={'#8393a8'}
  underlineColorAndroid={'#fff'}
	autoCapitalize='none'
  autoCorrect={false}
  returnKeyType='search'
  value={ this.state.searchKeyword }
  onChangeText={(keyword) => this.setSearchKeyword(keyword)}
  onSubmitEditing={this.searchSubmit.bind(this)}
  />
  <TouchableOpacity onPress={this.deleteSearchKeyword.bind(this)}>
      <TabBarIcon
        name='md-close'
        style={[allStyles.searchIcon, allStyles.searchDeleteIcon]}
      />
  </TouchableOpacity>
</View>
</View>

searchSubmit() {
	if (this.state.searchKeyword == "") {
		this.setState({refreshing: false});
		return;
	}
	this.props.users.search_friends(this.state.searchKeyword)
	.then((res) => {
		var results = res;
		var friendResults = []
//		for (var i = 0; i < results.length; i++) {
//			// dont add yourself
//			if (results[i].id != this.props.users.id) {
//				// if have a chat with this friend already, get actual chat; todo later
//				var chat = this.props.users.user.chats.filter(value => 
//					results[i].chats.findIndex(elem => elem.id == value.id));
//				if (chat.length > 0) {
//					chat = chat[0];
//					console.log("same one")
//				} else {
//					chat = {
//							title: results[i].name,
//							users: [results[i]],
//					}
//				}
//				console.log("push")
//				console.log(chat)
//				console.log('done')
//				friendResults.push(chat);
//			}
//		}
		this.setState({friendResults})
		this.setState({searching: true, refreshing: false});
	})
	.catch((errors) => {
		console.log(errors);
	})
}

setSearchKeyword(searchKeyword) {
	this.setState({searchKeyword})
}

deleteSearchKeyword() {
	this.setState({searchKeyword: "", searching: false});
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
