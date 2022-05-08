import { StyleSheet, Text } from "react-native";
import React from "react";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

export default function DateTime({time}) {
  return (
    <Text style={styles.time}>{moment(time, "YYYYMMDDHHmmss").fromNow()}</Text>
  );
}

const styles = StyleSheet.create({
  time: {
    color: "#B9B9B9",
    fontSize: 15,
  },
});
