import React from 'react';

import 'react-native-reanimated'; // Add this as the first import


import AppNavigator from './src/navigations/AppNavigator';
import HomeScreen from './src/screens/mainScreens/HomeScreen';
export default function App(){
  return(
    <AppNavigator />
  )
}