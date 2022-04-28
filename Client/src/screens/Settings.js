import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

import BackButton from '../components/BackButton'

export default function Settings({ navigation }) {

  const handleBackPress = () => {
    navigation.goBack()
  }
  const handleLoginPress = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <BackButton style={styles.backButton} onBackPress={handleBackPress}/>
      <Pressable onPress={handleLoginPress}>
        <Text>Login</Text>
      </Pressable>
      <Text>Setting</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 15
  },
})