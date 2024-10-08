import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import CustomTabBar from './CustomTabBar';
import MessageNavigation from '../../navigations/MessageNavigator';
import Profile from '../../screens/profile/Profile';
import Updates from '../../screens/updates/Updates';
import LeaderBoard from '../../screens/leaderboard/LeaderBoard';
import MainScreensNavigator from '../../navigations/MainScreensNavigator';

const Tab = createBottomTabNavigator();

const CustomBottomNavBar = () => {
  const navigation = useNavigation();
  const handleAddButtonPress = () => {
    navigation.navigate('AddScreen');
  };

  return (

    <>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#6A7ADA',
          tabBarInactiveTintColor: 'black',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Leaderboard" component={LeaderBoard} />
        <Tab.Screen name="Updates" component={Updates} />
        <Tab.Screen name="Chats" component={MessageNavigation} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Home" component={MainScreensNavigator} />
      </Tab.Navigator>
     
    </>
    
      // <Tab.Navigator
      //   initialRouteName="Home Screen"
      //   tabBar={(props) => <CustomTabBar {...props} />}
      //   screenOptions={({ route }) => ({
      //     tabBarActiveTintColor: '#6A7ADA',
      //     tabBarInactiveTintColor: 'black',
      //     headerShown: false,
      //   })}
      // >
      //   <Tab.Screen name="Leaderboard" component={HomeScreen} />
      //   <Tab.Screen name="Updates" component={HomeScreen} />
      //   <Tab.Screen name="Chats" component={HomeScreen} />
      //   <Tab.Screen name='Profile' component={HomeScreen} />
      // </Tab.Navigator>
     
    
  );
};

export default CustomBottomNavBar;