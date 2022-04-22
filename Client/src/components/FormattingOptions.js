import { View, Pressable, StyleSheet } from "react-native";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'

const iconSize = 18;

function FormattingOptions() {
  return (
    <View style={styles.container}>
      <Pressable>
        <FontAwesomeIcons 
          name="bold"
          size={iconSize}
          color="#000"
        />
      </Pressable>
      <Pressable>
        <FontAwesomeIcons 
          name="italic"
          size={iconSize}
          color="#000"
        />
      </Pressable>
      <Pressable>
        <FontAwesomeIcons 
          name="underline"
          size={iconSize}
          color="#000"
        />
      </Pressable>
      <Pressable>
        <FontAwesomeIcons 
          name="header"
          size={iconSize}
          color="#000"
        />
      </Pressable>
      <Pressable>
        <Octicons 
          name="list-ordered"
          size={iconSize}
          color="#000"
        />
      </Pressable>
      <Pressable>
        <Octicons 
          name="list-unordered"
          size={iconSize}
          color="#000"
        />
      </Pressable>
      <Pressable>
        <AntDesignIcons 
          name="link"
          size={iconSize}
          color="#000"
        />
      </Pressable>
      <Pressable>
        <FontAwesomeIcons 
          name="code"
          size={iconSize}
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

export default FormattingOptions