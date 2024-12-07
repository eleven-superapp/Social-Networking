import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {IP} from '../../../constants/constants';
import {UserContext} from '../../../context/userContextAPI';
const AddPostScreen = ({route, navigation}) => {
  const {forumId} = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useContext(UserContext);

  const handleAddPost = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required');
      return;
    }

    const author = user._id; // Get the current user ID from context or props
    const media = '';

    setLoading(true);
    try {
      console.log('Request Payload:', {title, content, forumId, author});

      await axios.post(`http://${IP}:3000/api/social/v1/post`, {
        title,
        content,
        forumId,
        author, // Pass the author's ID
        media,
      });

      navigation.goBack();
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert(
        `Failed to add post: ${
          err.response?.data?.message || 'Unknown error occurred'
        }`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter post title"
        placeholderTextColor="#AAA"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Content</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter post content"
        placeholderTextColor="#AAA"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleAddPost}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Post</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  label: {
    color: '#FFF',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: '#FFF',
  },
  button: {
    backgroundColor: '#F51F46',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddPostScreen;
