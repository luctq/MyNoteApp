import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function RestoreButton({ style, onRestorePress }) {
  return (
    <View style={style}>
      <Text>Left</Text>
      <TouchableOpacity style={styles.container} onPress={onRestorePress}>
        <MaterialCommunityIcons
          name="file-restore-outline"
          size={25}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#33CCFF",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    right: 0,
  },
});

export default RestoreButton;
