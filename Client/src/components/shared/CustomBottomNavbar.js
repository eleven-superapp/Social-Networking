import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import CustomTabBar from './CustomTabBar';
import MessageNavigation from '../../navigations/MessageNavigator';
import MainScreensNavigator from '../../navigations/MainScreensNavigator';
import AwardScreen from '../../screens/award/Award';
import Leaderboard from '../../screens/leaderboard/Leaderboard';
import UpdateScreen from '../../screens/updates/Updates';
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
        <Tab.Screen name="Leaderboard" component={Leaderboard} />
        <Tab.Screen name="Updates" component={UpdateScreen} />
        <Tab.Screen name="Chats" component={MessageNavigation} />
        <Tab.Screen name="Awards" component={AwardScreen} />
        <Tab.Screen name="Home" component={MainScreensNavigator} />
      </Tab.Navigator>
     
    </>
    
  );
};

export default CustomBottomNavBar;