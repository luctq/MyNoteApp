import { TouchableOpacity, StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function BackButton({ style, onBackPress }) {

  return (
    <View style={style}>
      <TouchableOpacity 
        style={styles.container} 
        onPress={onBackPress}
      >
        <Ionicons 
          name="arrow-back"
          size={30}
          color="#000"
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