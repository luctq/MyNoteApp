import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function AddNewNoteButton({ style }) {
  return (
    <TouchableOpacity style={style}>
      <AntDesign
        name="pluscircle"
        color="#FCC105"
        size={80}
        onPress={() => alert("add new Note")}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 11.3,

    elevation: 13,
  },
});
