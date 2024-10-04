  // App.js
  import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
  import LoginScreen from './screens/LoginScreen';
  import RegisterScreen from './screens/RegisterScreen';
  import AppNavigator from './navigation/AppNavigator';

  const Stack = createStackNavigator();

  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} // Hide header for Login screen
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ headerShown: false }} // Hide header for Register screen
          />
          <Stack.Screen 
            name="Home" 
            component={AppNavigator} 
            options={{ headerShown: false }} // Hide header for AppNavigator
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
