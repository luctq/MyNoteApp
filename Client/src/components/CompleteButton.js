import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

function CompleteButton({ style, onButtonPress }) {

  return (
    <View style={style}>
      <TouchableOpacity 
        style={styles.container} 
        onPress={onButtonPress}
      >
        <Text style={styles.text}>Xong</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
  },
  text: {
    fontSize: 18
  }
})

export default CompleteButton;