import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";


export default function SettingButton() {
  return (
      <Ionicons
        name="settings-outline"
        size={30}
        color="black"
        style={styles.icon}
        onPress={() => alert('opening settings')}
      />
  );
}

const styles = StyleSheet.create({
});