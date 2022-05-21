import { useRef } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator
} from "react-native";
import Modal from "react-native-modalbox";

var screen = Dimensions.get("window");

function LoadingModal(props) {
  const ref = useRef()

  return (
    <Modal
      ref={ref}
      style={styles.modal_new_folder}
      position="center"
      backdrop={true}
      isOpen={props.isOpen}
      onClosed={props.onClosed}
    >
      <ActivityIndicator size="large" color="#00ff00" />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal_new_folder: {
    justifyContent: "center",
    width: screen.width,
    height: screen.height,
    alignItems: "center",
    backgroundColor: 'transparent'
  },
})

export default LoadingModal
