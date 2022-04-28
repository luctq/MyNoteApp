import { TouchableOpacity, StyleSheet, View } from "react-native";
import AntIcons from 'react-native-vector-icons/AntDesign'

function CheckButton({ style }) {

  return (
    <View style={style}>
      <TouchableOpacity 
        style={styles.container} 
        onPress={() => alert('Check Icon Press!')}
      >
        <AntIcons 
          name="checksquareo"
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