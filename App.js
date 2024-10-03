import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

// Get the width of the screen for the indicator
const { width } = Dimensions.get('window');

// Screen Components
const HomeScreen = () => <ScreenContent title="Home" />;
const NetworkScreen = () => <ScreenContent title="Network" />;
const MessagesScreen = () => <ScreenContent title="Messages" />;
const EventsScreen = () => <ScreenContent title="Events" />;
const ProfileScreen = () => <ScreenContent title="Profile" />;

// Content Component
const ScreenContent = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.screenText}>{title}</Text>
  </View>
);

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Main App Component
export default function App() {
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
    <NavigationContainer>
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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Network" component={NetworkScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>

      {/* Indicator Box */}
      <Animated.View style={[styles.indicator, indicatorStyle]} />
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
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
