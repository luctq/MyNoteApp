import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function DateTime() {
  function formatTime(time) {
      return new Date(time);
  }
  return (
      <Text style={styles.time}>{Date.now()}</Text>
  );
}

const styles = StyleSheet.create({
  time: {
    color: "#B9B9B9",
    fontSize: 15,
  },
});
