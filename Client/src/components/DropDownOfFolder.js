/*
Cách sử dụng component:
const [isOpenDropDown, setIsOpenDropDown] = useState(false);
const handlePressFolderIcon = () => {
  setIsOpenDropDown(!isOpenDropDown)
}
<DropDownOfFolder isOpen={isOpenDropDown} setIsOpen={() => handlePressFolderIcon()}/>
<TouchableOpacity onPress={() => handlePressFolderIcon()}>
  <AntIcons 
    name="folderopen"
    size={25}
    color="#000"
  />
</TouchableOpacity>
*/
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet
} from "react-native";

import NewFolderModal from "./NewFolderModal";

const screen = Dimensions.get('window');


export default function DropDownOfFolder(props) {

  const [isOpenModal, setIsOpenModal] = useState(false);
  const options = ["Thùng rác", "Thư mục mới"]

  const handleSelect = (option) => {
    if (option === "Thư mục mới") {
      props.setIsOpen(false);
      setIsOpenModal(true);
    } else if (option == "Thùng rác") {
      props.onRecycleBinPress()
    } 
  };
  
  if (props.isOpen) {
    return (
      <TouchableWithoutFeedback onPress={() => props.setIsOpen(false)}>
        <View
          style={styles.container}
        >
          <View
            style={styles.modal}
          >
            {options.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => handleSelect(item)}>
                  <View>
                    <Text style={styles.optionStyle}>
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  } else {
    if (isOpenModal) {
      return (
        <NewFolderModal
          isOpen={isOpenModal}
          onClosed={() => setIsOpenModal(false)}
        />
      );
    } else {
      return null;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    // display: "none",
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 70,
    paddingLeft: 20,
    width: screen.width,
    height: screen.height+50,
  },
  modal: {
    backgroundColor: "#fefefe",
    borderRadius: 20,
    height: 100,
    width: 183,
  },
  optionStyle: { fontSize: 21, padding: 10, height: 50 }
})
