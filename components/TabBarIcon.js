import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={30}
      style={[ { marginBottom: -3 }, props.style ]}
      color={props.focused ? Colors.activeTabIcon : Colors.inactiveTabIcon}
      onPress={props.onPress}
    />
  );
}
