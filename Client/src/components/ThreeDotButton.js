import { TouchableOpacity, StyleSheet, View } from "react-native";
import EntypoIcons from 'react-native-vector-icons/Entypo'

function ThreeDotButton({ style, onButtonPress, isDisable }) {

  return (
    <View style={style}>
      <TouchableOpacity 
        style={styles.container} 
        onPress={onButtonPress}
        disabled={isDisable}
      >
        <EntypoIcons 
          name="dots-three-vertical"
          size={25}
          color={isDisable ? '#ddd' : '#000'}
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