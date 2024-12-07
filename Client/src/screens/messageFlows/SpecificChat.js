import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Send as SendIcon} from 'lucide-react-native';
import axios from 'axios';

const SpecificChat = ({route}) => {
  const {chatId} = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [userId] = useState('your-user-id'); // Replace with the actual logged-in user ID

  useEffect(() => {
    // Fetch messages for the specific chat from the backend
    axios
      .get(`https://your-backend-url/api/social/v1/chats/${chatId}`)
      .then(response => {
        setMessages(response.data.messages);
      })
      .catch(error => {
        console.error('Error fetching chat messages:', error);
      });
  }, [chatId]);

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      text: inputText,
      sender: userId,
      chatId,
    };

    // Optimistically add the message to the UI
    setMessages(prevMessages => [
      ...prevMessages,
      {
        ...newMessage,
        createdAt: new Date().toISOString(),
        senderId: userId,
      },
    ]);

    // Send the message to the backend
    axios
      .post('https://your-backend-url/api/social/v1/messages', newMessage)
      .then(response => {
        console.log('Message sent:', response.data);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });

    setInputText('');
  };

  const renderMessage = ({item}) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === userId ? styles.sent : styles.received,
      ]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>
        {new Date(item.createdAt).toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessage}
        inverted
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <SendIcon size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  messageList: {
    padding: 10,
  },
  messageBubble: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#216BC5',
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#D9DADB',
  },
  messageText: {
    color: '#fff',
  },
  messageTime: {
    color: '#888',
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#1F1E1E',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: 'white',
    padding: 10,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
  },
});

export default SpecificChat;
