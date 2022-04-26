import { Pressable, StyleSheet, View } from "react-native";
import AntIcons from 'react-native-vector-icons/AntDesign'

function ChangeBackgroundButton({ style }) {

  return (
    <View style={style}>
      <Pressable>
        <AntIcons 
          name="skin"
          size={25}
          color="black"
        />
      </Pressable>
    </View>
  )
}

export default ChangeBackgroundButton;