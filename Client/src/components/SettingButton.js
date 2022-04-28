import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";


export default function SettingButton({ style, onSettingPress}) {
  return (
      <View style={style}>
        <TouchableOpacity onPress={onSettingPress}>
          <Ionicons
            name="settings-outline"
            size={30}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  
});