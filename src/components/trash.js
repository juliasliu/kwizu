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