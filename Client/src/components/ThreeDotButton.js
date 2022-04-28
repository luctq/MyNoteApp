import { TouchableOpacity, StyleSheet, View } from "react-native";
import EntypoIcons from 'react-native-vector-icons/Entypo'

function ThreeDotButton({ style, onButtonPress }) {

  return (
    <View style={style}>
      <TouchableOpacity style={styles.container} onPress={onButtonPress}>
        <EntypoIcons 
          name="dots-three-vertical"
          size={25}
          color="#000"
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
  }
})

export default ThreeDotButton;