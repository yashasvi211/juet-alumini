// navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import CustomHeader from '../components/CustomHeader';
import HomeScreen from '../screens/HomeScreen';
import NetworkScreen from '../screens/NetworkScreen';
import MessagesScreen from '../screens/MessagesScreen';
import EventsScreen from '../screens/EventsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Dimensions, View, Text, StyleSheet } from 'react-native';

// Get the width of the screen for the indicator
const { width } = Dimensions.get('window');

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const activeTabIndex = useSharedValue(0); // Index of the active tab
  const tabNames = ['Home', 'Network', 'Messages', 'Events', 'Profile'];

  const indicatorStyle = useAnimatedStyle(() => {
    // Calculate the width of each tab based on the screen width
    const tabWidth = width / tabNames.length;
    return {
      transform: [
        {
          translateX: withTiming(activeTabIndex.value * tabWidth, { duration: 300 }),
        },
      ],
    };
  });

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
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
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#dddddd',
            height: 60,
          },
          tabBarButton: (props) => {
            const index = tabNames.indexOf(route.name);
            return (
              <View
                onTouchEnd={() => {
                  activeTabIndex.value = index; // Update the active tab index
                  props.onPress(); // Call the default onPress
                }}
                style={styles.tabButton}
              >
                {props.children}
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ header: () => <CustomHeader /> }} />
        <Tab.Screen name="Network" component={NetworkScreen} options={{ header: () => <CustomHeader /> }} />
        <Tab.Screen name="Messages" component={MessagesScreen} options={{ header: () => <CustomHeader /> }} />
        <Tab.Screen name="Events" component={EventsScreen} options={{ header: () => <CustomHeader /> }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ header: () => <CustomHeader /> }} />
      </Tab.Navigator>

      {/* Indicator Box */}
      <Animated.View style={[styles.indicator, indicatorStyle]} />
    </>
  );
};

// Styles for AppNavigator
const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    bottom: 60, // Align with the tab bar
    height: 4,
    width: `${100 / 5}%`, // Width for each tab
    backgroundColor: '#0A66C2', // LinkedIn blue color
    borderRadius: 2, // Slightly rounded corners for the indicator
  },
  iconContainer: {
    alignItems: 'center', // Centering icon and label
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppNavigator;
