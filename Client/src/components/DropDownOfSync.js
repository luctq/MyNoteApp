import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Alert
} from "react-native"

import LoadingModal from "./LoadingModal";

const screen = Dimensions.get('window');


function DropDownOfSync(props) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const options = ['Lấy dữ liệu từ web', 'Tải dữ liệu lên web', 'Đăng xuất']

  const handleSelect = (option) => {
    if (option === 'Lấy dữ liệu từ web') {
      setIsOpenModal(true)
      props.setIsOpen()
      props.onDownloadPress()
    } else if (option === 'Tải dữ liệu lên web') {
      Alert.alert('Upload', 'Hành động này sẽ ghi đè toàn bộ dữ liệu trên cloud. Bạn chắc chứ?', [
        {text: 'Hủy', style: 'cancel'}, 
        {
          text: 'Chấp nhận', 
          style: 'default',
          onPress: () => {
            setIsOpenModal(true)
            props.setIsOpen()
            props.onUploadPress()
          }
        }
      ])
    } else if (option === 'Đăng xuất') {
      props.onLogoutPress()
      props.setIsOpen()
    }
  }
  
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
    )
  } else {
    if (isOpenModal) {
      return (
        <LoadingModal
          isOpen={props.isCloseLoading ? false : isOpenModal}
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
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 334,
    paddingLeft: 143,
    width: screen.width,
    height: screen.height + 50,
  },
  modal: {
    backgroundColor: "#fefefe",
    borderRadius: 20,
    height: 150,
    width: 183,
  },
  optionStyle: { 
    fontSize: 21, 
    padding: 10, 
    height: 50
  }
})

export default DropDownOfSync