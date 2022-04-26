import { Pressable, StyleSheet, View } from "react-native";
import AntIcons from 'react-native-vector-icons/AntDesign'

function ShareButton({ style, handlePress }) {

  return (
    <View style={style}>
      <Pressable style={styles.container} onPress={handlePress}>
        <AntIcons 
          name="sharealt"
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

export default ShareButton;