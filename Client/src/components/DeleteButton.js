import { Pressable, StyleSheet, View } from "react-native";
import AntIcons from 'react-native-vector-icons/AntDesign'

function DeleteButton({ style }) {

  return (
    <View style={style}>
      <Pressable style={styles.container}>
        <AntIcons 
          name="delete"
          size={25}
          color="#fff"
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fb4039",
    padding: 20,
    borderRadius: 50,
    maxWidth: 150,
  }
})

export default DeleteButton;