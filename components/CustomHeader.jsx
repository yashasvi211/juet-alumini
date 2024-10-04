// components/CustomHeader.js
import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomHeader = () => {
  return (
    <View style={[headerStyles.header, { paddingTop: StatusBar.currentHeight }]}>
      <TextInput
        style={headerStyles.searchBar}
        placeholder="Search"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={headerStyles.postButton}>
        <Icon name="post-add" size={24} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

// Header Styles
const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 5, // Adjust padding bottom as needed
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    elevation: 2, // Add shadow for better visibility
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#dddddd',
    marginBottom: 9,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  postButton: {
    marginLeft: 10,
    backgroundColor: '#0A66C2', // LinkedIn blue
    width: 40,
    height: 40,
    borderRadius: 20, // Round button
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomHeader;
