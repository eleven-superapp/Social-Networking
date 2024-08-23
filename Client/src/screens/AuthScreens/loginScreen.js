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


const LoginScreen = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);

  useEffect(()=>{
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("IP address:", IP);
  },[username,password])
  const handleLogin = async () => {
    await axios
      .post(
        `http://${IP}:6969/login`, 
        { username: username, password:password },
        {
            headers: {
              "Content-Type": "application/json; charset=utf-8", // Define the Content-Type header
            },
        }
        )
      .then(async (res) => {
        if (res.status === 200) {
          console.log(res.data.user._id);
          await axios
            .get(`http://${IP}:5000/api/social/v1/${res.data.user._id}`)
            .then((res) => {
              setUser(res.data);
              navigation.navigate("OnBoarding");
            });
        } else {
          console.warn("Failed to login");
        }
      });
  };

  return (
    <View style={styles.container}>
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
        <Text style={styles.buttonText}>Go to Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
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