import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

function CompleteButton({ style, onButtonPress, isHide }) {

  return (
    <View style={[style, { display: isHide ? 'none' : 'flex' }]}>
      <TouchableOpacity 
        style={styles.container} 
        onPress={onButtonPress}
      >
        <Text style={[styles.text, style]}>Xong</Text>
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