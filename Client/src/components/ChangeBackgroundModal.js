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
import { connect } from "react-redux";
import Modal from "react-native-modalbox";
import { DatePicker } from "react-native-common-date-picker";
import { changeTheme } from "../redux/reducers/Note";
import { LogBox } from "react-native";
var screen = Dimensions.get("window");
function ChangeBackgroundModal(props) {
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
          style={{ height: 120, width: 90, backgroundColor: '#ededed', borderRadius: 20}}
          onPress={() => {
            props.changeTheme("light");
            props.onClosed();
          }}
        >
      </Pressable>
      <Pressable
          style={{ height: 120, width: 90, backgroundColor: '#2E3440', borderRadius: 20}}
          onPress={() => {
            props.changeTheme("dark");
            props.onClosed();
          }}
        >
      </Pressable>
      <Pressable
          style={{ height: 120, width: 90, backgroundColor: '#ffd966', borderRadius: 20}}
          onPress={() => {
            props.changeTheme("yellow");
            props.onClosed();
          }}
        >
      </Pressable>
      <Pressable
          style={{ height: 120, width: 90, backgroundColor: '#ff6379', borderRadius: 20}}
          onPress={() => {
            props.changeTheme("pink");
            props.onClosed();
          }}
        >
      </Pressable>
    </Modal>
  );
}
const mapStateToProps = (state) => ({
});
const mapActionToProps = {
  changeTheme,
};
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
export default connect(mapStateToProps, mapActionToProps)(ChangeBackgroundModal);