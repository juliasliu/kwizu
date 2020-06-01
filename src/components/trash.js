<View style={[ allStyles.checkbox, allStyles.grayButton, {width: '33.333%', marginLeft: 'auto'} ]}>
							<CheckBox
							    onClick={()=>{
							      this.setState({
							          isChecked:!this.state.isChecked
							      })
							    }}
							    isChecked={this.state.isChecked}
								checkBoxColor="#fff"
							    rightText={"Public"}
								rightTextStyle={allStyles.whiteText}
							/>
						</View>
							
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