import { Pressable, StyleSheet } from "react-native";
import AntIcons from 'react-native-vector-icons/AntDesign'

function ShareButton() {

  return (
    <Pressable style={styles.container}>
      <AntIcons 
        name="sharealt"
        size={25}
        color="#000"
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  }
})

export default ShareButton;