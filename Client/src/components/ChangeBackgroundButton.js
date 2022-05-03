import { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import AntIcons from 'react-native-vector-icons/AntDesign'
import ChangeBackgroundModal from "./ChangeBackgroundModal";
function ChangeBackgroundButton({ style, onButtonChangeBackground,  isDisable }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <View style={style}>
      <ChangeBackgroundModal isOpen={isOpen} onClosed={() => setIsOpen(false)}/>
      <TouchableOpacity 
        onPress={onButtonChangeBackground}
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