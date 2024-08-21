import React from 'react';
import { View, Text, Image, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Bell, MessageCircle, User } from 'lucide-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const DATA = [
  {
    id: '1',
    user: 'Siber Koza',
    time: '15 hours ago',
    text: 'Have a great day with my amazing client all the way from New York',
    imageUrl: 'https://example.com/image1.jpg',
    likes: '56.9k',
    comments: '4682',
    shares: '62',
  },
  // More data objects
];

const Post = ({ post }) => (
  <View style={styles.postContainer}>
    <View style={styles.postHeader}>
      <Image source={{ uri: 'https://example.com/profile-pic.jpg' }} style={styles.profilePic} />
      <View>
        <Text style={styles.userName}>{post.user}</Text>
        <Text style={styles.timeText}>{post.time}</Text>
      </View>
    </View>
    <Text style={styles.postText}>{post.text}</Text>
    <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
    <View style={styles.postFooter}>
      <Text style={styles.postFooterText}>{post.likes}</Text>
      <Text style={styles.postFooterText}>{post.comments}</Text>
      <Text style={styles.postFooterText}>{post.shares}</Text>
    </View>
  </View>
);

export default function MainScreen () {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chatterbox</Text>
        <Bell color="white" size={30} />
      </View>
      <TextInput
        style={styles.searchBox}
        placeholder="Search ‘your thought’"
        placeholderTextColor="#888"
      />
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBox: {
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: 'white',
    marginVertical: 10,
  },
  postContainer: {
    marginBottom: 20,
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeText: {
    color: 'gray',
    fontSize: 12,
  },
  postText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  postFooterText: {
    color: 'gray',
  },
});
