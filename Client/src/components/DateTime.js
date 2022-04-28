import { StyleSheet, Text } from "react-native";
import React from "react";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

export default function DateTime() {
  return <Text style={styles.time}>{moment("20220423", "YYYYMMDD").fromNow()}</Text>;
}

const styles = StyleSheet.create({
  time: {
    color: "#B9B9B9",
    fontSize: 15,
  },
});
