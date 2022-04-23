import { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import Modal from "react-native-modalbox";
var screen = Dimensions.get("window");
export default function ShareFormModal(props) {
  const ref = useRef();
  const openModal = () => {
    ref.current.open();
  };
  return (
    <Modal
      ref={ref}
      style={styles.modal_share_form}
      position="bottom"
      backdrop={true}
      isOpen={props.isOpen}
      onClosed={props.onClosed}
    >
      <View style={styles.input_container}>
        <Text style={styles.input_label}>ID</Text>
        <TextInput
          autoFocus={true}
          style={styles.input}
          placeholder="123456"
        ></TextInput>
      </View>
      <View style={styles.button_container}>
        <Pressable style={styles.button_cancel} onPress={() => ref.current.close()}>
          <Text style={{ color: "black" }}>Hủy</Text>
        </Pressable>
        <Pressable style={styles.button_ok} onPress={console.log("OK")}>
          <Text style={{ color: "white" }}>OK</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
/** How to use?
 * 
 *  const [isOpen, setIsOpen] = useState(false)
 * <ShareFormModal isOpen={isOpen} onClosed={() => setIsOpen(false)}/>
 * <Button onPress={()=> setIsOpen(!isOpen)} title="show modal"></Button>
 */
const styles = StyleSheet.create({
  modal_share_form: {
    justifyContent: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowRadius: 10,
    width: screen.width,
    height: 150,
  },
  input_container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
  },
  input_label: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    flex: 10,
    borderRadius: 15,
    backgroundColor: "#F0F0F0",
    height: 40,
    padding: 10,
  },
  button_container: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button_cancel: {
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    width: 120,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  button_ok: {
    borderRadius: 20,
    backgroundColor: "#0C84FF",
    width: 120,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});
