import React from "react"
import { View, Text, StyleSheet } from "react-native"
import CheckBox from '@react-native-community/checkbox'

function TodoListItem({ style }) {

  const [isSelected, setSelection] = React.useState(false);

  return (
    <View style={style}>
      <View style={styles.container}>
        {/* <CheckBox
          disabled={false}
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        /> */}
        <Text style={styles.text}>Todo List Item</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    // marginHorizontal: 8,
    alignItems: "center",
    borderRadius: 14,
    // marginBottom: 6
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