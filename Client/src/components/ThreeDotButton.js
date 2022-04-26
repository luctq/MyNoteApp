import { Pressable, StyleSheet, View } from "react-native";
import EntypoIcons from 'react-native-vector-icons/Entypo'

function ThreeDotButton({ style }) {

  return (
    <View style={style}>
      <Pressable style={styles.container}>
        <EntypoIcons 
          name="dots-three-vertical"
          size={25}
          color="#000"
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
  }
})

export default ThreeDotButton;