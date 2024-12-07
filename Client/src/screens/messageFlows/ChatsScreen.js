import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {Check} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const ChatsScreen = () => {
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch chats from backend
    axios
      .get('https://your-backend-url/api/social/v1/chats') // Replace with your backend endpoint
      .then(response => {
        setChats(response.data);
      })
      .catch(error => {
        console.error('Error fetching chats:', error);
      });
  }, []);

  const openChat = chatId => {
    navigation.navigate('SpecificChat', {chatId});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => openChat(item.id)}
            style={styles.chatItem}>
            <Image source={{uri: item.avatar}} style={styles.avatar} />
            <View style={styles.chatInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text numberOfLines={1} style={styles.message}>
                {item.message}
              </Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B2121',
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

export default ChatsScreen;
