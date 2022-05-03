import { TouchableOpacity, StyleSheet, View } from "react-native";
import AntIcons from 'react-native-vector-icons/AntDesign'

function ChangeBackgroundButton({ style, isDisable }) {

  return (
    <View style={style}>
      <TouchableOpacity 
        onPress={() => alert('Change background press!')}
        disabled={isDisable}
      >
        <AntIcons 
          name="skin"
          size={25}
          color={isDisable ? '#ddd' : '#000'}
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