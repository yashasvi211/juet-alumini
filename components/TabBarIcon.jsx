import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/styles';

const TabBarIcon = ({ route, focused }) => {
  let iconName;
  switch (route.name) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Network':
      iconName = 'people';
      break;
    case 'Messages':
      iconName = 'chat';
      break;
    case 'Events':
      iconName = 'event';
      break;
    case 'Profile':
      iconName = 'person';
      break;
    default:
      iconName = 'home';
  }
  return (
    <View style={styles.iconContainer}>
      <Icon name={iconName} size={24} color={focused ? '#0A66C2' : '#8e8e93'} />
      <Text style={[styles.iconLabel, { color: focused ? '#0A66C2' : '#8e8e93' }]}>
        {route.name}
      </Text>
    </View>
  );
};

export default TabBarIcon;
