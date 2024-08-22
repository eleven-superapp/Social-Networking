import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/mainScreens/HomeScreen';
import CommentScreen from '../screens/mainScreens/CommentScreen';
import CustomBottomNavBar from '../components/shared/CustomBottomNavbar';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CommentScreen" component={CommentScreen} />
      {/* Add more screens that should be part of this stack */}
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomBottomNavBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      {/* Add other tabs if needed */}
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
