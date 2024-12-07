import React, {useContext, useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {UserContext} from '../../../context/userContextAPI';
import {IP} from '../../../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {setUser} = useContext(UserContext);

  const handleLoginOrCreateUser = async () => {
    if (!username.trim()) {
      alert('Username is required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `http://${IP}:3000/api/social/v1/user/create`,
        {
          username: username.trim(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 201) {
        const user = response.data;

        // Save user to context
        setUser(user);

        // Save user ID in AsyncStorage
        await AsyncStorage.setItem('userId', user._id);

        // Navigate to the onboarding screen
        navigation.navigate('OnBoarding');
      } else {
        alert('Failed to create user');
      }
    } catch (error) {
      console.error(
        'Error creating user:',
        error.response?.data || error.message,
      );
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#101010', '#4A0613']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <Text style={styles.title}>Welcome to Social Networking</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={handleLoginOrCreateUser}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: '#F51F46',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: '10%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default LoginScreen;
