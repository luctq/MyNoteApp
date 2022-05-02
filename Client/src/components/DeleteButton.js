import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import AntIcons from 'react-native-vector-icons/AntDesign'

function DeleteButton({ style, onDeletePress }) {

  return (
    <View style={style} onPress={onDeletePress}>
      <Text>Left</Text>
      <TouchableOpacity style={styles.container}>
        <AntIcons name="delete" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fb4039",
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    right: 0
  }
})

export default DeleteButton;