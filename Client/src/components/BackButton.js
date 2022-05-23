import { TouchableOpacity, StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function BackButton({ style, onBackPress, iconColor, isDisable }) {

  return (
    <View style={style}>
      <TouchableOpacity 
        style={styles.container} 
        onPress={onBackPress}
        disabled={isDisable}
      >
        <Ionicons 
          name="arrow-back"
          size={30}
          color={isDisable ? '#ddd' : iconColor}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
  }
})

export default BackButton;