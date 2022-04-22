import { Pressable, StyleSheet } from "react-native";
import AntIcons from 'react-native-vector-icons/AntDesign'

function DeleteButton() {

  return (
    <Pressable style={styles.container}>
      <AntIcons 
        name="delete"
        size={25}
        color="#fff"
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fb4039",
    padding: 13,
    borderRadius: 50
  }
})

export default DeleteButton;