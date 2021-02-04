<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.facebookButton ]}
				                onPress={() => this.props.navigation.push("FBImport")}>
								<Icon name="facebook" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
								<Text style={[ allStyles.whiteText ]}>Add from Facebook</Text>
							</TouchableOpacity>

<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.messengerButton, styles.shareButton ]}
			                onPress={() => shareToMedia("messenger")}>
							<Icon5 name="facebook-messenger" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Send via Messenger</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.whatsappButton, styles.shareButton ]}
				            onPress={() => shareToMedia("whatsapp")}>
							<Icon name="whatsapp" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Share on WhatsApp</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.snapchatButton, styles.shareButton ]}
			                onPress={() => shareToMedia("snapchat")}>
							<Icon5 name="snapchat-ghost" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Share on Snapchat</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.instagramButton, styles.shareButton ]}
					        onPress={() => shareToMedia("instagram")}>
							<Icon name="instagram" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Share on Instagram story</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.twitterButton, styles.shareButton, styles.bottomShareButton ]}
					        onPress={() => shareToMedia("twitter")}>
							<Icon name="twitter" style={[ allStyles.buttonIcon, allStyles.whiteText ]}/>
							<Text style={[ allStyles.fullWidthButtonText, allStyles.whiteText ]}>Share on Twitter feed</Text>
						</TouchableOpacity>
						
					<View style={[ allStyles.card, allStyles.quizResult ]}>
						<View style={[allStyles.quizResultImageContainer]}>
							<Image style={[allStyles.quizResultImage]} source={{uri: 'https://img1.looper.com/img/gallery/things-that-make-no-sense-about-harry-potter/intro-1550086067.jpg' }}/>
					        <View style={[allStyles.quizResultImageOverlay]} />
						</View>
						<View style={allStyles.quizResultContainer}>
							<Text style={[ allStyles.quizResultTitle, allStyles.whiteText ]}>Which Harry Potter villain are you?</Text>
							<Text style={[ allStyles.quizResultDescription, {color: "#e1e7ed"} ]}>Result title here. You can only see this if you also took the kwiz.</Text>
							<TouchableOpacity style={[ allStyles.fullWidthButton, allStyles.button, allStyles.greenButton ]}
								onPress={() => this.props.navigation.navigate("Take Kwiz")}>
								<Text style={ allStyles.whiteText }>Take Kwiz</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity onPress={() => alert('')}>
							<TabBarIcon name="md-arrow-dropdown" style={[ styles.settingsButton, allStyles.quizResultDropdownButton ]}/>
						</TouchableOpacity>
				</View>