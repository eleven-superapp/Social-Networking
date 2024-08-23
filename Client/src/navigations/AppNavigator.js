
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { UserProvider } from '../../context/userContextAPI';

import CustomBottomNavBar from '../components/shared/CustomBottomNavbar';
import HomeScreen from '../screens/mainScreens/HomeScreen';
import CommentScreen from '../screens/mainScreens/CommentScreen';
import OnBoarding from '../screens/onBoardingScreens/onBoarding';
import OnBoardingProfile from '../screens/onBoardingScreens/onBoardingProfile';
import LoginScreen from '../screens/AuthScreens/loginScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login"
        screenOptions={{
          headerShown:false
        }}
        >
          <Stack.Screen
            name="Main"
            component={CustomBottomNavBar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home Screen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='OnBoarding'
            component={OnBoarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='OnBoardingProfile'
            component={OnBoardingProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name='Comment Screen' component={CommentScreen} />
        
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default AppNavigator;