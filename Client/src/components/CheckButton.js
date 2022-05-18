import { TouchableOpacity, StyleSheet, View } from "react-native";
import AntIcons from 'react-native-vector-icons/AntDesign'

function CheckButton({ style, onCheckButtonPress, name }) {

  return (
    <View style={style}>
      <TouchableOpacity 
        style={styles.container} 
        onPress={onCheckButtonPress}
      >
        <AntIcons 
          name={name}
          size={25}
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

export default CheckButton;