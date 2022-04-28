import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Constants from 'expo-constants'

import BackButton from "../components/BackButton";

var screen = Dimensions.get("window");
export default function Login({ login, navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    // check email, password code before call login().... 

    // login(email, password);
    // navigation.navigate(....)
  }

  const handleBackPress = () => {
    navigation.goBack()
  }
  const handleRegisterPress = () => {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <BackButton style={styles.backButton} onBackPress={handleBackPress}/>
      <Image style={styles.image} source={require("../../assets/logo.png")} />

      <StatusBar style="auto" />
      <Text style={styles.title}>Welcome Back</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          width: screen.width - 50,
          justifyContent: "space-between",
        }}
      >
        <Text></Text>
        <Text style={styles.forgot_button}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row'}}>
        <Text style={{ fontSize: 16}}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={handleRegisterPress}>
          <Text style={{ fontSize: 16, color: 'blue'}}>  Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 30,
    fontSize: 35,
    fontWeight: "bold",
  },
  image: {
    marginBottom: 40,
    height: 120,
    width: 120,
  },
  inputView: {
    backgroundColor: "#F0F0F0",
    borderRadius: 30,
    width: screen.width - 50,
    height: 50,
    marginBottom: 10,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    alignContent: "flex-end",
  },
  loginBtn: {
    width: screen.width - 50,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#121330",
    marginBottom: 40,
  },
  loginText: {
    color: "white",
  },
  backButton: {
    position: 'absolute',
    top: Constants.statusBarHeight + 5,
    left: 15
  },
});
