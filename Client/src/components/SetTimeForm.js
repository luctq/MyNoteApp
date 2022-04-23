import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import moment from "moment";
import Modal from "react-native-modalbox";
import DatePicker from "react-native-datepicker";
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
      <DatePicker
        style={{ width: 200 }}
        date={date}
        androidMode="spinner"
        mode="date"
        placeholder="select date"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: "absolute",
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {
          setDate(date);
        }}
        showIcon={false}
        is24Hour={true}
      />
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
    height: 400,
  },
});
