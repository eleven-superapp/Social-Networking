import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {IP} from '../../../constants/constants'; // Replace with your backend's base URL

export default function addForum() {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!title || !description) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `http://${IP}:3000/api/social/v1/forum/initalize`,
        {
          title,
          description,
          creator: '67497e796b56e3886d30025b', // Replace with logged-in user's ID
        },
      );
      Alert.alert('Success', response.data.message);
      navigation.goBack(); // Navigate back to HomeScreen
    } catch (error) {
      console.error(
        'Error creating forum:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', 'Failed to create forum. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        placeholderTextColor="#C5C5C5"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.descriptionInput}
        placeholder="Body Text (optional)"
        placeholderTextColor="#C5C5C5"
        value={description}
        onChangeText={setDescription}
        multiline
        textAlignVertical="top"
      />
      <View style={styles.mediaButtonsContainer}>
        <TouchableOpacity style={styles.mediaButton}>
          <Text style={styles.mediaIcon}>📎</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mediaButton}>
          <Text style={styles.mediaIcon}>🖼️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mediaButton}>
          <Text style={styles.mediaIcon}>🎥</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.postButton}
        onPress={handlePost}
        disabled={loading}>
        <Text style={styles.postButtonText}>
          {loading ? 'Posting...' : 'Post'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  titleInput: {
    backgroundColor: '#1E1E1E',
    color: '#FFF',
    fontSize: 18,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  descriptionInput: {
    backgroundColor: '#1E1E1E',
    color: '#FFF',
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    height: 150,
  },
  mediaButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  mediaButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaIcon: {
    color: '#FFF',
    fontSize: 20,
  },
  postButton: {
    backgroundColor: '#F51F46',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
