import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modalbox";
import { connect } from "react-redux";
import { createNewFolder } from "../redux/reducers/Folder";
import CheckBox from "react-native-check-box";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createNewTodo, updateTodo } from "../redux/reducers/Todo";
var screen = Dimensions.get("window");

const mapStateToProps = (state) => ({});

const mapActionToProps = {
  createNewTodo,
  updateTodo,
};

function NewTodoModal(props) {
  const [todoName, setTodoName] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [contentNewTodo, setContentNewTodo] = useState("");
  const [contentEditTodo, setContentEditTodo] = useState(
    props.type.todo.content ? props.type.todo.content : ""
  );
  const ref = useRef();
  const openModal = () => {
    ref.current.open();
  };
  const inputRef = useRef();

  function handleCreateFolder() {}
  const handleCheckBox = () => {
    setSelection(!isSelected);
  };
  const handleChangeNewTodo = (todoContent) => {
    setContentNewTodo(todoContent);
  };
  const handleChangeEditTodo = (todoContent) => {
    setContentEditTodo(todoContent);
  };
  const handleSubmitNewTodo = async () => {
    if (contentNewTodo != "") {
      await props.createNewTodo(isSelected, contentNewTodo);
      ref.current.close();
    }
  };
  const handleSubmitEditTodo = async (id) => {
      if (contentEditTodo != "") {
          props.updateTodo(id, contentEditTodo, isSelected)
          ref.current.close()
      }
  };
  useEffect(() => {
    setSelection(props.type.type === "editTodoModalIsSelected");
    setContentEditTodo(props.type.todo.content)
  }, [props.isOpen]);
  return (
    <Modal
      ref={ref}
      style={styles.modal_new_todo}
      position="bottom"
      backdrop={true}
      isOpen={props.isOpen}
      onClosed={props.onClosed}
    >
      <View
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CheckBox
          style={[styles.checkbox]}
          checkBoxColor={isSelected ? "gray" : "black"}
          onClick={() => handleCheckBox()}
          isChecked={isSelected}
        />
        {props.type.type === "newTodoModal" ? (
          <TextInput
            ref={inputRef}
            onLayout={() => inputRef.current.focus()}
            autoFocus={true}
            onChangeText={(value) => handleChangeNewTodo(value)}
            placeholder="Chạm vào 'Enter' để tạo nhiệm vụ"
          />
        ) : (
          <TextInput
            ref={inputRef}
            onLayout={() => inputRef.current.focus()}
            autoFocus={true}
            onChangeText={(value) => handleChangeEditTodo(value)}
            defaultValue={props.type.todo.content}
            placeholder="Chạm vào 'Enter' để tạo nhiệm vụ"
          />
        )}
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 10,
          left: 20,
          borderRadius: 20,
          backgroundColor: "#f8f6eb",
          padding: 5,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons name="alarm" size={20} color="#000" />
          <Text> Đặt nhắc nhở</Text>
        </View>
      </TouchableOpacity>
      {props.type.type === "newTodoModal" ? (
        <TouchableOpacity
          style={{ position: "absolute", bottom: 10, right: 20, padding: 5 }}
          onPress={() => handleSubmitNewTodo()}
        >
          <Text style={{ color: "orange" }}>Hoàn tất</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ position: "absolute", bottom: 10, right: 20, padding: 5 }}
          onPress={() => handleSubmitEditTodo(props.type.todo.id)}
        >
          <Text style={{ color: "orange" }}>Hoàn tất</Text>
        </TouchableOpacity>
      )}
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
  modal_new_todo: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowRadius: 10,
    width: screen.width,
    height: 120,
  },
  input_container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 20,
  },
  input_label: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    borderRadius: 15,
    backgroundColor: "#F0F0F0",
    height: 40,
    width: screen.width - 50,
    marginTop: 20,
    padding: 10,
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
  checkbox: {
    alignSelf: "center",
  },
});

export default connect(mapStateToProps, mapActionToProps)(NewTodoModal);
