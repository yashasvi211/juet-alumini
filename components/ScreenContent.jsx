import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

const ScreenContent = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.screenText}>{title}</Text>
  </View>
);

export default ScreenContent;
