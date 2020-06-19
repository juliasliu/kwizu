import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Image, Platform, StyleSheet, Text,
	ActivityIndicator, TouchableOpacity, View, Button, TextInput, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import ImagePicker from 'react-native-image-picker';

import TabBarIcon from '../../components/TabBarIcon';

import allStyles from '../../styles/AllScreens';
import styles from '../../styles/ProfileScreen';

@inject('users') @observer
class Settings extends React.Component {
	state= {
			
	}

	componentDidMount() {
		
	}

	render () {
		return (
			    <ScrollView
					ref={ref => {
					    this.scrollview_ref = ref;
					  }}>
					<View style={allStyles.container}>
					      <View style={[allStyles.card, allStyles.center]}>
							<Text style={allStyles.heading}>Privacy Policy</Text>
							
							<Text style={[allStyles.text, allStyles.center]}>At Kwizu, accessible from http://kwizu.app, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Kwizu and how we use it.</Text>

								<Text style={[allStyles.text, allStyles.center]}>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</Text>

								<Text style={[allStyles.text, allStyles.center]}>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Kwizu. This policy is not applicable to any information collected offline or via channels other than this website.</Text>

								<Text style={[allStyles.subheading, allStyles.center]}>Consent</Text>

								<Text style={[allStyles.text, allStyles.center]}>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</Text>

								<Text style={[allStyles.subheading, allStyles.center]}>Information we collect</Text>

								<Text style={[allStyles.text, allStyles.center]}>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</Text>
								<Text style={[allStyles.text, allStyles.center]}>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</Text>
								<Text style={[allStyles.text, allStyles.center]}>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</Text>

								<Text style={[allStyles.subheading, allStyles.center]}>How we use your information</Text>

								<Text style={[allStyles.text, allStyles.center]}>We use the information we collect in various ways, including to:</Text>

								<View>
								<Text style={[allStyles.text, allStyles.center]}>• Provide, operate, and maintain our webste</Text>
								<Text style={[allStyles.text, allStyles.center]}>• Improve, personalize, and expand our webste</Text>
								<Text style={[allStyles.text, allStyles.center]}>• Understand and analyze how you use our webste</Text>
								<Text style={[allStyles.text, allStyles.center]}>• Develop new products, services, features, and functionality</Text>
								<Text style={[allStyles.text, allStyles.center]}>• Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the webste, and for marketing and promotional purposes</Text>
								<Text style={[allStyles.text, allStyles.center]}>• Send you emails</Text>
								<Text style={[allStyles.text, allStyles.center]}>• Find and prevent fraud</Text>
								</View>

								<Text style={[allStyles.subheading, allStyles.center]}>Log Files</Text>

								<Text style={[allStyles.text, allStyles.center]}>Kwizu follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information. Our Privacy Policy was created with the help of the <Text style={ allStyles.link } onPress={() => Linking.openURL("https://www.privacypolicygenerator.info")}>Privacy Policy Generator</Text> and the <Text style={ allStyles.link } onPress={() => Linking.openURL("https://www.privacypolicyonline.com/privacy-policy-generator/")}>Online Privacy Policy Generator</Text>.</Text>



								<Text style={[allStyles.subheading, allStyles.center]}>Our Advertising Partners</Text>

								<Text style={[allStyles.text, allStyles.center]}>Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.</Text>

								<View>
								    <Text style={[allStyles.text, allStyles.center]}>• Google: <Text style={ allStyles.link } onPress={() => Linking.openURL("https://policies.google.com/technologies/ads")}>https://policies.google.com/technologies/ads</Text></Text>
								</View>

								<Text style={[allStyles.subheading, allStyles.center]}>Advertising Partners Privacy Policies</Text>

								<Text style={[allStyles.text, allStyles.center]}>You may consult this list to find the Privacy Policy for each of the advertising partners of Kwizu.</Text>

								<Text style={[allStyles.text, allStyles.center]}>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Kwizu, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</Text>

								<Text style={[allStyles.text, allStyles.center]}>Note that Kwizu has no access to or control over these cookies that are used by third-party advertisers.</Text>

								<Text style={[allStyles.subheading, allStyles.center]}>Third Party Privacy Policies</Text>

								<Text style={[allStyles.text, allStyles.center]}>Kwizu's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </Text>

								<Text style={[allStyles.text, allStyles.center]}>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</Text>

								<Text style={[allStyles.subheading, allStyles.center]}>CCPA Privacy Rights (Do Not Sell My Personal Information)</Text>

								<Text style={[allStyles.text, allStyles.center]}>Under the CCPA, among other rights, California consumers have the right to:</Text>
								<Text style={[allStyles.text, allStyles.center]}>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</Text>
								<Text style={[allStyles.text, allStyles.center]}>Request that a business delete any personal data about the consumer that a business has collected.</Text>
								<Text style={[allStyles.text, allStyles.center]}>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</Text>
								<Text style={[allStyles.text, allStyles.center]}>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</Text>

								<Text style={[allStyles.subheading, allStyles.center]}>GDPR Data Protection Rights</Text>

								<Text style={[allStyles.text, allStyles.center]}>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</Text>
								<Text style={[allStyles.text, allStyles.center]}>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</Text>
								<Text style={[allStyles.text, allStyles.center]}>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</Text>
								<Text style={[allStyles.text, allStyles.center]}>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</Text>
								<Text style={[allStyles.text, allStyles.center]}>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</Text>
								<Text style={[allStyles.text, allStyles.center]}>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</Text>
								<Text style={[allStyles.text, allStyles.center]}>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</Text>
								<Text style={[allStyles.text, allStyles.center]}>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</Text>

								<Text style={[allStyles.subheading, allStyles.center]}>Children's Information</Text>

								<Text style={[allStyles.text, allStyles.center]}>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</Text>

								<Text style={[allStyles.text, allStyles.center]}>Kwizu does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</Text>
					      </View>
					</View>
				</ScrollView>
		)
	}
}
export default Settings;
