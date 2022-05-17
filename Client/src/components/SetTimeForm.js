import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  Button,
  ScrollView,
  Modal as ModalReactNative,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import Modal from "react-native-modalbox";
import { DatePicker } from "react-native-common-date-picker";
import { CalendarList } from "react-native-common-date-picker";
import { LogBox } from "react-native";
import AntIcons from "react-native-vector-icons/AntDesign";
import { TimePicker, ValueMap } from "react-native-simple-time-picker";
var screen = Dimensions.get("window");
export default function SetTimeForm(props) {
  const [date, setDate] = useState("");
  const [datePickerModalVisible, setDateModalVisible] = useState(false);
  const [timePickerModalVisible, setTimeModalVisible] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [time, setTime] = useState("");
  const handleChange = (value: { hours: number, minutes: number }) => {
    setHours(value.hours);
    setMinutes(value.minutes);
  };
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
      {/* <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Đặt ngày và giờ
      </Text> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text style={styles.fontSizeText}>Đặt ngày: </Text>
        <TouchableOpacity
          style={styles.inputPicker}
          onPress={() => setDateModalVisible(true)}
        >
          <Text style={{ color: date ? "black" : "#bcbcbc" }}>{date}</Text>
          {/* {date? <Text >{date}</Text> : <Text style={{ marginHorizontal: 5, color: '#bcbcbc'}}>Chọn ngày</Text>} */}
          <AntIcons name="calendar" size={20} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text style={[styles.fontSizeText]}>Đặt giờ: </Text>
        <TouchableOpacity
          style={styles.inputPicker}
          onPress={() => setTimeModalVisible(true)}
        >
          <Text style={{ color: date ? "black" : "#bcbcbc" }}>{time}</Text>

          {/* {date? <Text>{date}</Text> : <Text style={{ fontSize: 20, marginHorizontal: 5, color: '#bcbcbc'}}>Chọn giờ</Text>} */}
          <AntIcons name="clockcircleo" size={20} />
        </TouchableOpacity>
      </View>
      <ModalReactNative
        style={{ justifyContent: "center", alignItems: "center" }}
        animationType={"slide"}
        visible={datePickerModalVisible}
        onRequestClose={() => {}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
            >
              Đặt ngày
            </Text>
            <DatePicker
              toolBarPosition="bottom"
              type="DD-MM-YYYY"
              minDate="2010-1-1"
              maxDate="2030-12-30"
              defaultDate={new Date()}
              cancel={() => setDateModalVisible(false)}
              toolBarCancelStyle={{ marginRight: 40, fontSize: 20 }}
              confirm={(data) => {
                console.log(data);
                setDate(data), setDateModalVisible(false);
              }}
              row={"7"}
              toolBarConfirmStyle={{ marginLeft: 40, fontSize: 20 }}
              rowHeight={60}
              cancelText={"Hủy"}
              confirmText={"OK"}
            />
          </View>
        </View>
      </ModalReactNative>
      <ModalReactNative
        style={{ justifyContent: "center", alignItems: "center" }}
        animationType={"slide"}
        visible={timePickerModalVisible}
        onRequestClose={() => {}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
            >
              Đặt giờ
            </Text>
            <TimePicker
              value={{ hours, minutes }}
              hoursUnit="giờ"
              minutesUnit="phút"
              onChange={handleChange}
              zeroPadding
            />
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => setTimeModalVisible(false)}
                style={{ marginRight: 40 }}
              >
                <Text style={{ fontSize: 20, color: 'gray'}}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  var strHours = hours,
                    strMinutes = minutes;
                  if (hours < 10) {
                    strHours = String(hours).padStart(2, "0");
                  }
                  if (minutes < 10) {
                    strMinutes = String(minutes).padStart(2, "0");
                  }
                  let time = strHours + " : " + strMinutes;
                  setTime(time), setTimeModalVisible(false);
                }}
                style={{ marginLeft: 40 }}
              >
                <Text style={{ fontSize: 20, color: 'blue'}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalReactNative>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  fontSizeText: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  inputPicker: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 5,
  },
});
