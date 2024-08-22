import React from 'react';
import {View,Text} from 'react-native';
import MainScreen from './src/screens/MainScreen';
import OnBoarding from './src/screens/onBoardingScreens/onBoarding';
import OnBoardingProfile from './src/screens/onBoardingScreens/onBoardingProfile';

export default function App(){
  return(
    // <MainScreen />
    // <OnBoarding/>
    <OnBoardingProfile/>
  )
}