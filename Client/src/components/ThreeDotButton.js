import { TouchableOpacity, StyleSheet, View } from "react-native";
import EntypoIcons from 'react-native-vector-icons/Entypo'

function ThreeDotButton({ style, onButtonPress, isDisable, iconColor }) {

  return (
    <View style={style}>
      <TouchableOpacity 
        style={styles.container(isDisable)}
        onPress={onButtonPress}
        disabled={isDisable}
      >
        <EntypoIcons 
          name="dots-three-vertical"
          size={25}
          color={iconColor}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: isDisable => ({
    // backgroundColor: "#fff",
    display: isDisable? 'none' : 'flex'
  })
})

export default ThreeDotButton;