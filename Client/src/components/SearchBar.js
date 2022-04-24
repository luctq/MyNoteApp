import { StyleSheet, Text, View, TextInput } from "react-native";
import React, {useState} from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";


export default function SearchBar() {
    const [textSearch, setTextSearch] = useState("");
  return (
    <View style={styles.searchBar}>
      <Ionicons name="search" size={25} color="black" style={styles.icon} />
      <TextInput
        value={textSearch}
        placeholder="Tìm kiếm ghi chú"
        onChangeText={(text) => setTextSearch(text)}
        placeholderTextColor={"gray"}
        style={styles.searchInput}
        clearTextOnFocus={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 25,
    width: "80%",
  },
  searchInput: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    color: "gray",
    borderWidth: 0,
    outlineWidth: 0,
    width: "80%",
    fontSize: 18,
  },
  icon: {
    paddingLeft: 0,
  },
});