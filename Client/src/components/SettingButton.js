import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";


export default function SettingButton({style}) {
  return (
      <View style={style}>
        <Ionicons
          name="settings-outline"
          size={30}
          color="black"
          style={styles.icon}
          onPress={() => alert('opening settings')}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  
});