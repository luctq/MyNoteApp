import { StyleSheet, View, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function AddNewNoteButton({ style, onAddNewNotePress }) {
  
  return (
    <View style={style}>
      <TouchableOpacity onPress={onAddNewNotePress}>
        <AntDesign
          name="pluscircle"
          color="#FCC105"
          size={80}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 11.3,
    elevation: 13,
  },
});
