import { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import AntIcons from 'react-native-vector-icons/AntDesign'
import ChangeBackgroundModal from "./ChangeBackgroundModal";
function ChangeBackgroundButton({ style, onButtonChangeBackground,  isDisable, iconColor }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <View style={style}>
      <ChangeBackgroundModal isOpen={isOpen} onClosed={() => setIsOpen(false)}/>
      <TouchableOpacity 
        style={styles.container(isDisable)} 
        onPress={onButtonChangeBackground}
        disabled={isDisable}
      >
        <AntIcons 
          name="skin"
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

export default ChangeBackgroundButton;