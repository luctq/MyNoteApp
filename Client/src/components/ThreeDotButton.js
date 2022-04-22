import { Pressable, StyleSheet } from "react-native";
import EntypoIcons from 'react-native-vector-icons/Entypo'

function ThreeDotButton() {

  return (
    <Pressable style={styles.container}>
      <EntypoIcons 
        name="dots-three-vertical"
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

export default ThreeDotButton;