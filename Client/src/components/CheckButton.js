import { Pressable, StyleSheet } from "react-native";
import AntIcons from 'react-native-vector-icons/AntDesign'

function CheckButton({style}) {

  return (
    <Pressable style={[styles.container, style]} onPress={() => alert('Check Icon Press!')}>
      <AntIcons 
        name="checksquareo"
        size={25}
        color="#000"
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    
  }
})

export default CheckButton;