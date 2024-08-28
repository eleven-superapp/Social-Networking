import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Flame, MessageCircle, Heart, ThumbsUp } from 'lucide-react-native'; // Importing specific icons
import Header from '../../components/shared/Header';
const NotificationScreen = () => {
  return (
    <View style={styles.container}>
       <Header heading="Notifications" />
      {/* Notifications List */}
      <ScrollView
      style={{padding:20}}
      >
        {notificationsData.map((item, index) => (
          <View key={index} style={styles.notificationItem}>
            <View style={styles.iconContainer}>
              {item.icon}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const notificationsData = [
  {
    icon: <Flame size={24} color="#FFA500" fill={'#FFA500'} />,
    title: 'Trending',
    message: 'Your Post is Trending in the hot Section',
    time: '9.56 AM',
  },
  {
    icon: <Flame size={24} color="#FFA500" fill={'#FFA500'} />,
    title: 'Trending',
    message: 'Your Post is Trending in the hot Section',
    time: '9.56 AM',
  },
  {
    icon: <MessageCircle size={24} color="#6A5ACD" fill={'#6A5ACD'} />,
    title: 'Comment',
    message: 'Someone commented on your post: Around Heavy ball floor these languag....',
    time: '9.56 AM',
  },
  { 
    icon: <Heart size={24} color="#FF4C4C" fill={'#FF4C4C'} />,
    title: 'Trending',
    message: 'Your Post is Trending in the Fun Section',
    time: '9.56 AM',
  },
  {
    icon: <ThumbsUp size={24} color="#32CD32" fill={'#32CD32'} />,
    title: 'Upvote',
    message: 'Someone Upvoted your post: Around Heavy ball floor these languag....',
    time: '9.56 AM',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c', // Dark theme primary color
    // padding: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
  iconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  message: {
    fontSize: 14,
    color: '#A5A5A5', // Text secondary color
  },
  time: {
    fontSize: 12,
    color: '#A5A5A5',
  },
});

export default NotificationScreen;
