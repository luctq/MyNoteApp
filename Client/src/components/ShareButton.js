import { TouchableOpacity, StyleSheet, View } from "react-native";
import AntIcons from 'react-native-vector-icons/AntDesign'

function ShareButton({ style, handlePress, isDisable }) {

  return (
    <View style={style}>
      <TouchableOpacity 
        style={styles.container} 
        onPress={handlePress}
        disabled={isDisable}
      >
        <AntIcons 
          name="sharealt"
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

export default ShareButton;