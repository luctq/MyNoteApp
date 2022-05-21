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
  KeyboardAvoidingView,
  Platform
} from "react-native";
import Constants from 'expo-constants'
import FlashMessage from 'react-native-flash-message'
import { connect } from 'react-redux'

import BackButton from "../components/BackButton";
import { resetStatus, register } from '../redux/reducers/Auth'

var screen = Dimensions.get("window");


function Register({ navigation, auth, resetStatus, register }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('')

  const registerRefMes = React.useRef()

  const handleBackPress = () => {
    navigation.goBack()
  }

  const handleRegisterPress = () => {
    if (confirmPassword !== password) {
      registerRefMes.current.showMessage({
        message: 'The password and confirm password are not the same',
        type: 'warning',
        duration: 2000
      })
    } else {
      register(username, password)
    }
  }

  React.useEffect(() => {
    if (auth.status === 1) {
      registerRefMes.current.showMessage({
        message: auth.mes,
        type: 'success',
        duration: 2000
      })
      setTimeout(() => {
        navigation.goBack()
      }, 2000)
    } 
    if (auth.status === 0) {
      registerRefMes.current.showMessage({
        message: auth.mes,
        type: 'danger',
        duration: 2000,
      })
    }
  }, [auth.status, auth.randomNumber])

  React.useEffect(() => {
    return () => {
      resetStatus()
    }
  }, [])

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <BackButton style={styles.backButton} onBackPress={handleBackPress}/>
      <Image style={styles.image} source={require("../../assets/logo.png")} />

      <StatusBar style="auto" />
      <Text style={styles.title}>Welcome to MyNote</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username..."
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={password => setConfirmPassword(password)}
        />
      </View>
      
      <TouchableOpacity style={styles.registerBtn} onPress={handleRegisterPress}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
      <FlashMessage position='top' ref={registerRefMes} />
    </KeyboardAvoidingView>
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
    fontWeight: 'bold'
  },
  image: {
    marginBottom: 40,
    height: 120,
    width: 120
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
    alignContent: 'flex-end',
  },

  registerBtn: {
    width: screen.width - 50,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#121330",
  },
  registerText: {
    color: 'white'
  },
  backButton: {
    position: 'absolute',
    top: Constants.statusBarHeight + 5,
    left: 6
  },
});

const mapStateToProps = state => ({
  auth: state.auth
})

const mapActionToProps = {
  resetStatus,
  register
}

export default connect(mapStateToProps, mapActionToProps)(Register)