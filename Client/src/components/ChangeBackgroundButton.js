import { TouchableOpacity, StyleSheet, View } from "react-native";
import AntIcons from 'react-native-vector-icons/AntDesign'

function ChangeBackgroundButton({ style }) {

  return (
    <View style={style}>
      <TouchableOpacity onPress={() => alert('Change background press!')}>
        <AntIcons 
          name="skin"
          size={25}
          color="black"
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})

export default ChangeBackgroundButton;