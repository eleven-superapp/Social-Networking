import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChatsScreen from '../screens/messageFlows/ChatsScreen';
import GroupsScreen from '../screens/messageFlows/GroupsScreen';
import Header from '../components/shared/Header';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Search } from 'lucide-react-native';

const TopTab = createMaterialTopTabNavigator();

const MessageNavigator = () => {
    return (
        <TopTab.Navigator
            initialRouteName="Chats Screen"
            screenOptions={({ route }) => ({
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    textAlign: 'center', // Center the text
                    flex: 1,
                },
                tabBarItemStyle: {
                    justifyContent: 'center', // Center content vertically
                    alignItems: 'center', // Center content horizontally

                },
                tabBarActiveTintColor: '#f4511e',
                tabBarInactiveTintColor: '#888',
                tabBarIndicatorStyle: {
                    backgroundColor: '#f4511e',
                    height: 2, // Smaller indicator height
                    width: '20%', // Make the indicator smaller to center it under the text
                    marginHorizontal: '15%', // Adjust to center the indicator
                },
                tabBarStyle: {
                    backgroundColor: 'black',
                    height: 50, // Adjust height if needed to make the tabs visually appealing
                },
                tabBarLabel: ({ focused, color }) => (
                    <Text style={{ color: focused ? '#f4511e' : '#888', fontSize: 14, fontWeight: 'bold' }}>
                        {route.name}
                    </Text>
                ),
            })}
        >
            <TopTab.Screen name="Chats Screen" component={ChatsScreen}
                options={{
                    tabBarLabel: "Chats"
                }}
            />
            <TopTab.Screen name="Groups Screen" component={GroupsScreen}
                options={{
                    tabBarLabel: "Groups"
                }}
            />
        </TopTab.Navigator>
    );
};

const MessageNavigation = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'black'}}>
            <Header />
            <View style={styles.searchBar}>
                <TextInput style={styles.input} placeholder="Search contacts" placeholderTextColor="#888" />
                <Search color={'#FFDDC9'} size={20} />
            </View>
            <MessageNavigator />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        padding: 10,
    },
    searchBar: {
        borderRadius: 10,
        borderColor: '#575757',
        borderWidth: 1,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10
    },
    input: {
        flex: 1
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3b3b3b',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    chatInfo: {
        flex: 1,
    },
    name: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    message: {
        color: '#888',
        fontSize: 14,
    },
    time: {
        color: '#888',
        fontSize: 12,
    },
});

export default MessageNavigation;
