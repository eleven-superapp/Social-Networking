import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import  MainScreen  from './src/screens/MainScreen';
import { Home, Bell, MessageCircle, User } from 'lucide-react-native';
const Tab = createBottomTabNavigator();
export default function App(){
  return(
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let IconComponent;

          if (route.name === 'Home') {
            IconComponent = Home;
          } else if (route.name === 'Updates') {
            IconComponent = Bell;
          } else if (route.name === 'Chats') {
            IconComponent = MessageCircle;
          } else if (route.name === 'Profile') {
            IconComponent = User;
          }

          return <IconComponent color={color} size={size} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#000' },
      })}
    >
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Updates" component={MainScreen} />
      <Tab.Screen name="Chats" component={MainScreen} />
      <Tab.Screen name="Profile" component={MainScreen} />
    </Tab.Navigator>
  </NavigationContainer>
  )
}