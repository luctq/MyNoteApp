import { TouchableOpacity, StyleSheet, View } from "react-native";
import AntIcons from 'react-native-vector-icons/AntDesign'

function ShareButton({ style, handlePress, isDisable, iconColor }) {

  return (
    <View style={style}>
      <TouchableOpacity 
        style={styles.container(isDisable)} 
        onPress={handlePress}
        disabled={isDisable}
      >
        <AntIcons 
          name="sharealt"
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

export default ShareButton;