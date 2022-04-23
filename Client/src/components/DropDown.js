import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
export default function DropDown() {
  const handleSelect = (index, value) => {
      console.log('index' + index);
      console.log('value' + value);
  }
  return (
    <ModalDropdown
      options={["Thùng rác", "Thư mục mới"]}
      dropdownStyle={styles.dropdown}
      dropdownTextStyle={styles.dropdownText}
      onSelect={handleSelect}
    >
      <Text>Folder</Text>
    </ModalDropdown>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    width: 200,
    height: 100,
  },
  dropdownText: {
    fontSize: 20
  }
  
});
