import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../../screens/mainScreens/HomeScreen';
import CustomTabBar from './CustomTabBar';
// import { Home } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

const CustomBottomNavBar = () => {
  const navigation = useNavigation();
  const handleAddButtonPress = () => {
    navigation.navigate('AddScreen');
  };

  return (
    
      <Tab.Navigator
        initialRouteName="Home Screen"
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#6A7ADA',
          tabBarInactiveTintColor: 'black',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home Screen" component={HomeScreen} />
        <Tab.Screen name="Leaderboard" component={HomeScreen} />
        <Tab.Screen name="Updates" component={HomeScreen} />
        <Tab.Screen name="Chats" component={HomeScreen} />
        <Tab.Screen name='Profile' component={HomeScreen} />
      </Tab.Navigator>
     
    
  );
};

export default CustomBottomNavBar;