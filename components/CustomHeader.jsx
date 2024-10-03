// components/CustomHeader.js
import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomHeader = () => {
  return (
    <View style={headerStyles.header}>
      <View style={headerStyles.searchContainer}>
        <Icon name="search" size={24} color="#888" style={headerStyles.searchIcon} />
        <TextInput
          style={headerStyles.searchBar}
          placeholder="Search"
          placeholderTextColor="#888"
        />
      </View>
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
    paddingVertical: 5,
    paddingTop: 40, // Add top padding to prevent overlap with the status bar
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    elevation: 2, // Add shadow for better visibility
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 10, // Slightly round edges
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 5, // Reduced padding to bring icon and text closer
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 5, // Reduced padding for text input
    backgroundColor: 'transparent', // Make the background transparent to show parent container's color
  },
  searchIcon: {
    marginRight: 5, // Reduced space between icon and input
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
