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
export default function ChangeBackgroundModal(props) {
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
      <Pressable
          style={{ height: 120, width: 90, backgroundColor: 'black', borderRadius: 20}}
          onPress={() => console.log('1')}
        >
      </Pressable>
      <Pressable
          style={{ height: 120, width: 90, backgroundColor: 'blue', borderRadius: 20}}
          onPress={() => console.log('1')}
        >
      </Pressable>
      <Pressable
          style={{ height: 120, width: 90, backgroundColor: 'red', borderRadius: 20}}
          onPress={() => console.log('1')}
        >
      </Pressable>
      <Pressable
          style={{ height: 120, width: 90, backgroundColor: 'yellow', borderRadius: 20}}
          onPress={() => console.log('1')}
        >
      </Pressable>
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
    flexDirection: 'row',
    justifyContent: "space-between",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowRadius: 10,
    width: screen.width,
    height: 150,
    alignItems: "center",
    paddingHorizontal: 10
  }
});
