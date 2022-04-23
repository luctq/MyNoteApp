import { Pressable, StyleSheet } from "react-native";
import AntIcons from 'react-native-vector-icons/AntDesign'

function ChangeBackgroundButton() {

  return (
    <Pressable>
      <AntIcons 
        name="skin"
        size={25}
        color="black"
      />
    </Pressable>
  )
}

export default ChangeBackgroundButton;