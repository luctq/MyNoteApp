import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import moment from "moment";
import Modal from "react-native-modalbox";
import { DatePicker } from "react-native-common-date-picker";

import { LogBox } from "react-native";
var screen = Dimensions.get("window");
export default function SetTimeForm(props) {
  const [date, setDate] = useState(new Date());
  const ref = useRef();
  const openModal = () => {
    ref.current.open();
  };
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);
  return (
    <Modal
      ref={ref}
      style={styles.modal_share_form}
      position="bottom"
      backdrop={true}
      isOpen={props.isOpen}
      onClosed={props.onClosed}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Đặt ngày và giờ</Text>
      <DatePicker
        onValueChange={selectedDate => console.log(selectedDate)}
        toolBarPosition="bottom"
        type="DD-MM-YYYY"
        minDate="2010-1-1"
        maxDate="2030-12-30"
        defaultDate={new Date()}
        showToolBar={false}
      />
      <View style={styles.button_container}>
        <Pressable
          style={styles.button_cancel}
          onPress={() => ref.current.close()}
        >
          <Text style={{ color: "black" }}>Hủy</Text>
        </Pressable>
        <Pressable
          style={styles.button_ok}
          onPress={() => handleCreateFolder()}
        >
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
    height: 300,
    alignItems: "center",
  },
  button_container: {
    width: screen.width,
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
