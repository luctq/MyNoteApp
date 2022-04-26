import { StyleSheet } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import AntIcons from 'react-native-vector-icons/AntDesign'

import RecycleBin from '../screens/RecycleBin'

export default function DropDown({ style }) {
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
      style={style}
    >
      <AntIcons 
        name="folderopen"
        size={25}
        color="#000"
      />
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
