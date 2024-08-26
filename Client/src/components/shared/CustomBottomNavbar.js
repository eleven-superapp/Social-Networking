import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../../screens/mainScreens/HomeScreen';
import LeaderboardScreen from '../../screens/Leaderbord';
import ChatsScreen from '../../screens/Chats';
import ProfileScreen from '../../screens/Profile';
import UpdatesScreen from '../../screens/Updates';
import CustomTabBar from './CustomTabBar';
import MessageNavigation from '../../navigations/MessageNavigator';
import Updates from '../../screens/updates/Updates';
import Profile from '../../screens/profile/Profile';
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
        initialRouteName="Home Screen"
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#6A7ADA',
          tabBarInactiveTintColor: 'black',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Tab.Screen name="Updates" component={ChatsScreen} />
        <Tab.Screen name="Chats" component={ProfileScreen} />
        <Tab.Screen name="Profile" component={UpdatesScreen} />
        <Tab.Screen name="Home Screen" component={HomeScreen} />
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