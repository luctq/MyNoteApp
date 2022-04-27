/*
Cách sử dụng component:
const [isOpenDropDown, setIsOpenDropDown] = useState(false);
const handlePressFolderIcon = () => {
   setIsOpenDropDown(!isOpenDropDown)
}
<DropDownOfThreeDot isOpen={isOpenDropDown} setIsOpen={() => handlePressFolderIcon()}/>
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
import SetTimeForm from "./SetTimeForm";
const screen = Dimensions.get('window');
export default function DropDownOfThreeDot(props) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const options = [
    "Nhắc nhở",
    "Ẩn",
    "Thêm vào màn hình chính",
    "Chuyển tới",
    "Xóa",
  ];
  const handleSelect = (option) => {
    if (option === "Nhắc nhở") {
      props.setIsOpen(false);
      setIsOpenModal(true);
    } else if (option == "Ẩn") {
      console.log(option);
    } else if (option == "Thêm vào màn hình chính") {
      console.log(option);
    } else if (option == "Chuyển tới") {
      console.log(option);
    } else if (option == "Xóa") {
      console.log(option);
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
        <SetTimeForm
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
    display: "none",
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 60,
    paddingLeft: screen.width-320,
    width: screen.width,
    height: screen.height+50,
  }, 
  modal: {
    backgroundColor: "#fefefe",
              borderRadius: 20,
              height: 250,
              width: 300,
              paddingLeft: 20,
  },
  optionStyle: { fontSize: 21, padding: 10, height: 50 }
}
)