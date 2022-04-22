import React from "react"
import { View, Text, CheckBox, StyleSheet } from "react-native"

function TodoListItem() {

  const [isSelected, setSelection] = React.useState(false);

  return (
    <View style={styles.container}>
      <CheckBox
        value={isSelected}
        onValueChange={setSelection}
        style={styles.checkbox}
      />
      <Text style={styles.text}>Todo List Item</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginHorizontal: 8,
    alignItems: "center",
    borderRadius: 14,
    marginBottom: 6
  },
  checkbox: {
    marginRight: 8
  },
  text: {
    fontWeight: "bold",
    fontSize: 16
  }
})

export default TodoListItem