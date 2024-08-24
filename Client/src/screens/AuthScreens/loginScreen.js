import { useNavigation } from "@react-navigation/native";
import { useContext, useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { UserContext } from "../../../context/userContextAPI";
import { IP } from "../../../constants/constants";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("IP address:", IP);
  }, [username, password]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `http://${IP}:6969/login`,
        { username: username, password: password },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          withCredentials: true, // This will allow cookies to be sent and received
        }
      );

      if (res.status === 200) {
        const { token, user } = res.data;
        
        // Store the JWT token in AsyncStorage
        await AsyncStorage.setItem('jwt', token);

        // Fetch user data
        const userRes = await axios.get(`http://${IP}:5000/api/social/v1/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token in the Authorization header
          },
        });

        setUser(userRes.data);
        setLoading(false);
        navigation.navigate("OnBoarding");
      } else {
        console.warn("Failed to login");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#101010', '#4A0613']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>Welcome to Social Networking</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        placeholder="Enter your username"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loading ? <Text style={styles.buttonText}>Logging in...</Text> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    color: "#fff",
  },
  button: {
    backgroundColor: "#6200ee",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LoginScreen;
