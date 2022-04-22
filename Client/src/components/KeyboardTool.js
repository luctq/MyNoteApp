import { View, Pressable, StyleSheet } from "react-native";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'
import IoniconsIcons from 'react-native-vector-icons/Ionicons'

function KeyboardTool() {

  return (
    <View style={styles.container}>
      <Pressable>
        <FontAwesomeIcons 
          name="file-sound-o"
          size={25}
          color="#000"
        />
      </Pressable>
      <Pressable>
        <FontAwesomeIcons 
          name="image"
          size={25}
          color="#000"
        />
      </Pressable>
      <Pressable>
        <FontAwesomeIcons 
          name="paint-brush"
          size={25}
          color="#000"
        />
      </Pressable>
      <Pressable>
        <IoniconsIcons 
          name="checkbox"
          size={25}
          color="#000"
        />
      </Pressable>
      <Pressable>
        <IoniconsIcons 
          name="text"
          size={25}
          color="#000"
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  
})

export default KeyboardTool;