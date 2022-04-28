import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function FolderListItem({ style, onFolderListItemPress }) {

  const [title, setTitle] = useState("Tiêu đề");
  const [count, setCount] = useState(0);
  
  return (
    <View style={style}>
      <Pressable style={styles.container} onPress={onFolderListItemPress}>
        <Ionicons
          name="folder-open-sharp"
          size={40}
          color="orange"
          style={styles.icon}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{count}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    // width: "80%",
    height: 80,
    paddingLeft: 10,
    paddingRight: 10,
    // marginTop: 20,
  },
  icon: {
    margin: 10,
    marginTop: 20,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 5,
    marginTop: 24,
    flex: 8,
  },
  count: {
    fontSize: 20,
    color: "#B9B9B9",
    marginTop: 28,
    flex: 1,
    marginLeft: 10,
  },
});
