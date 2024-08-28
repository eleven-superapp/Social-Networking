
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { UserProvider } from '../../context/userContextAPI';

import CustomBottomNavBar from '../components/shared/CustomBottomNavbar';
import OnBoarding from '../screens/onBoardingScreens/onBoarding';
import OnBoardingProfile from '../screens/onBoardingScreens/onBoardingProfile';
import LoginScreen from '../screens/AuthScreens/loginScreen';
import SpecificChat from '../screens/messageFlows/SpecificChat';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Specific Chat"
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

          <Stack.Screen component={SpecificChat} name='Specific Chat'  options={{
            headerTitle:'Chats'
          }} />
        
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default AppNavigator;