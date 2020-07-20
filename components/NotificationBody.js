import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StatusBar, View, Text, Image, Vibration } from 'react-native';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/FontAwesome'

import allStyles from '../styles/AllScreens';

const styles = {
		root: {
			flex: 1,
		},
		container: {
			position: 'absolute',
		    top: isIphoneX() && getStatusBarHeight(),
		    bottom: 0,
		    left: 0,
		    right: 0,
		},
		content: {
			flex: 1,
			flexDirection: 'row',
			padding: 20,
			borderRadius: 20,
			backgroundColor: "#fff",
//			shadowColor: "#e1e7ed",
//			shadowOffset: {
//				width: 0,
//				height: 5,
//			},
//			shadowOpacity: 1,
//			shadowRadius: 0,
//			elevation: 1,
			height: '100%',
			width: '100%',
		},
		iconApp: {
			marginTop: 10,
			marginLeft: 20,
			resizeMode: 'contain',
			width: 24,
			height: 24,
			borderRadius: 5,
		},
		icon: {
			marginLeft: 20,
			marginVertical: 20,
			color: "#515d6e",
			fontSize: 20,
		},
		textContainer: {
			alignSelf: 'center',
			marginLeft: 20,
			marginVertical: 0,
		},
		title: {
			color: '#485061',
			fontWeight: 'bold',
			marginTop: 10,
		},
		message: {
			color: '#515d6e',
			marginTop: 5,
		},
		footer: {
			backgroundColor: '#696969',
			borderRadius: 5,
			alignSelf: 'center',
			height: 5,
			width: 35,
			margin: 5,
		},
};

class DefaultNotificationBody extends React.Component {
	constructor() {
		super();

		this.onNotificationPress = this.onNotificationPress.bind(this);
		this.onSwipe = this.onSwipe.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (this.props.isOpen !== prevProps.isOpen) {
//			StatusBar.setHidden(this.props.isOpen);
		}

		if ((prevProps.vibrate || this.props.vibrate) && this.props.isOpen && !prevProps.isOpen) {
			Vibration.vibrate();
		}
	}

  onNotificationPress() {
	  const {
		  onPress,
		  onClose,
	  } = this.props;

	  onClose();
	  onPress();
  }

  onSwipe(direction) {
	  const { SWIPE_UP } = swipeDirections;

	  if (direction === SWIPE_UP) {
		  this.props.onClose();
	  }
  }

  renderIcon() {
	  const { title } = this.props;

	  if (title.includes("chat")) {
		  return <Icon
		    name={'comments'}
		    style={[ styles.icon ]}
		    />
	  } else if (title.includes("friend")) {
		  return <Icon
		    name={'user'}
		  	style={[ styles.icon ]}
		    />
	  } else if (title.includes("kwiz")) {
		  return <Icon
		    name={'sticky-note'}
		  	style={[ styles.icon ]}
		    />
	  }

	  //    return null;
  }

  render() {
    const {
      title,
      message,
    } = this.props;

    return (
      <View style={[styles.root]}>
        <GestureRecognizer onSwipe={this.onSwipe} style={styles.container}>
          <TouchableOpacity
            style={styles.content}
            onPress={this.onNotificationPress}
          >
            {this.renderIcon()}
            <View style={styles.textContainer}>
              <Text numberOfLines={1} style={styles.title}>{title}</Text>
              <Text numberOfLines={1} style={styles.message}>{message}</Text>
            </View>
          </TouchableOpacity>

          
        </GestureRecognizer>
      </View>
    );
  }
}

DefaultNotificationBody.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  vibrate: PropTypes.bool,
  isOpen: PropTypes.bool,
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  iconApp: Image.propTypes.source,
  icon: Image.propTypes.source,
};

DefaultNotificationBody.defaultProps = {
  title: 'Notification',
  message: 'This is a test notification',
  vibrate: true,
  isOpen: false,
  iconApp: null,
  icon: null,
  onPress: () => null,
  onClose: () => null,
};

export default DefaultNotificationBody;