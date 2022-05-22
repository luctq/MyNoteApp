import { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import Modal from "react-native-modalbox";
import { connect } from "react-redux";
import { createNewFolder } from "../redux/reducers/Folder";
import { makeId } from "../redux/reducers/Todo";

var screen = Dimensions.get("window");

const mapStateToProps = (state) => ({
  folderList: state.folder.folderList,
});

const mapActionToProps = {
  createNewFolder,
};

function NewFolderModal(props) {
  const [folderName, setFolderName] = useState("");
  const ref = useRef();
  const openModal = () => {
    ref.current.open();
  };
  const inputRef = useRef();

  function handleCreateFolder() {
    // const nextId = props.folderList.length === 0 ? 0 : props.folderList[props.folderList.length - 1].id + 1
    props.createNewFolder({ id: makeId(10), name: folderName, noteCount: 0, isDeleted: false, deleteTime: null });
    ref.current.close();
  }

  return (
    <Modal
      ref={ref}
      style={styles.modal_new_folder}
      position="bottom"
      backdrop={true}
      isOpen={props.isOpen}
      onClosed={props.onClosed}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Thư mục mới</Text>
      <TextInput
        ref={inputRef}
        onLayout={() => inputRef.current.focus()}
        value={folderName}
        onChangeText={(text) => setFolderName(text)}
        autoFocus={true}
        style={styles.input}
        placeholder="Thư mục ghi chú"
      ></TextInput>
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
  modal_new_folder: {
    justifyContent: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowRadius: 10,
    width: screen.width,
    height: 200,
    alignItems: "center",
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
});

export default connect(mapStateToProps, mapActionToProps)(NewFolderModal);
