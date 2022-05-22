import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  LogBox,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import Constants from "expo-constants";
import { connect } from "react-redux";
import SettingButton from "../components/SettingButton";
import SearchBar from "../components/SearchBar";
import CheckButton from "../components/CheckButton";
import DeleteButton from "../components/DeleteButton";
import { AntIcons } from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TodoListItem from "../components/TodoListItem";
import AddTodoButton from "../components/AddTodoButton";
import NewTodoModal from "../components/NewTodoModal";
import { deleteTodo } from "../redux/reducers/Todo";
import moment from "moment";
const mapStateToProps = (state) => ({
  todoList: state.todo.todoList,
  todoListCompleted: state.todo.todoListCompleted,
  todoCount: state.todo.todoCount,
});

const mapActionToProps = {
  deleteTodo,
};
function TodoList({
  navigation,
  todoList,
  todoCount,
  todoListCompleted,
  deleteTodo,
}) {
  const [isOpenNewTodoModal, setIsOpenNewTodoModal] = useState(false);
  const [typeModal, setTypeModal] = useState({
    type: "newTodoModal",
    todo: { id: "", content: "" },
  });
  const [textSearch, setTextSearch] = useState("");
  const handlePressFolderIcon = () => {
    navigation.navigate("Home");
  };
  const handleSettingPress = () => {
    navigation.navigate("Settings");
  };
  const handleRecycleBinPress = () => {
    navigation.navigate("RecycleBin");
  };
  const handleTodoListItemPress = (type, item) => {
    setTypeModal({
      type: "editTodoModal" + type,
      todo: { id: item.id, content: item.content },
    });
    setIsOpenNewTodoModal(!isOpenNewTodoModal);
  };
  const handleDeleteFolder = (type, id) => {
    var isSelected = false;
    if (type === "todoListComplete") {
      isSelected = true;
    }
    deleteTodo(isSelected, id);
  };
  const renderItemTodoList = (data, rowMap) => {
    if (
      !data.item.isDeleted &&
      data.item.content.toLowerCase().includes(textSearch.toLowerCase())
    ) {
      return (
        <SwipeRow
          scrollEnabled={false}
          rightOpenValue={-80}
          leftOpenValue={0}
          disableRightSwipe={true}
          style={styles.todoRow}
        >
          <DeleteButton
            style={styles.deleteButton}
            onDeletePress={() => handleDeleteFolder("todoList", data.item.id)}
          />
          <TodoListItem
            type="todoList"
            style={styles.todoListItem}
            onTodoListItemPress={() => handleTodoListItemPress("", data.item)}
            info={data.item}
          />
        </SwipeRow>
      );
    } else return <></>;
  };
  const renderItemTodoListCompleted = (data, rowMap) => {
    if (
      !data.item.isDeleted &&
      data.item.content.toLowerCase().includes(textSearch.toLowerCase())
    ) {
      return (
        <SwipeRow
          scrollEnabled={false}
          rightOpenValue={-80}
          leftOpenValue={0}
          disableRightSwipe={true}
          style={styles.folderRow}
        >
          <DeleteButton
            style={styles.deleteButton}
            onDeletePress={() =>
              handleDeleteFolder("todoListComplete", data.item.id)
            }
          />
          <TodoListItem
            type="todoListComplete"
            style={styles.todoListItemComplete}
            onTodoListItemPress={() =>
              handleTodoListItemPress("IsSelected", data.item)
            }
            info={data.item}
          />
        </SwipeRow>
      );
    } else return <></>;
  };
  const keyExtractor = (intem, index) => `_key${index.toString()}`;
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  return (
    <>
      <NewTodoModal
        type={typeModal}
        isOpen={isOpenNewTodoModal}
        onClosed={() => setIsOpenNewTodoModal(false)}
      />
      <ScrollView nestedScrollEnabled={true} style={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <SettingButton
            style={styles.settingButton}
            onSettingPress={handleSettingPress}
          />
          <View style={styles.headerIcon}>
            <View style={styles.todoButton}>
              <TouchableOpacity onPress={() => handlePressFolderIcon()}>
                <MaterialIcons name="folder-open" size={30} color="#000" />
              </TouchableOpacity>
            </View>
            <CheckButton name="checksquare" style={styles.checkButton} />
          </View>
          <SearchBar
            style={styles.searchBar}
            textSearch={textSearch}
            setTextSearch={setTextSearch}
          />

          {todoCount === 0 ? (
            <View>
              <Image
                source={require("../public/emptyNote.png")}
                style={styles.emptyNoteImage}
              />
              <Text style={{ textAlign: "center" }}>
                Không có ghi chú nào ở đây
              </Text>
            </View>
          ) : (
            <View>
              <SwipeListView
                scrollEnabled={false}
                data={todoList}
                renderItem={renderItemTodoList}
                listKey={moment().valueOf().toString()}
                keyExtractor={keyExtractor}
              />
              {todoListCompleted.length === 0 ? null : (
                <View>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 10,
                    }}
                  >
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={25}
                      color="#000"
                    />
                    <Text>Hoàn tất {todoListCompleted.length}</Text>
                  </TouchableOpacity>
                  <SwipeListView
                    scrollEnabled={false}
                    data={todoListCompleted}
                    renderItem={renderItemTodoListCompleted}
                    listKey={moment().valueOf().toString()}
                    keyExtractor={keyExtractor}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <AddTodoButton
        style={styles.addTodoButton}
        onAddTodoPress={() => {
          setTypeModal({
            type: "newTodoModal",
            todo: { id: "", content: "" },
          });
          setIsOpenNewTodoModal(!isOpenNewTodoModal);
        }}
      />
    </>
  );
}

// height: 667
// width: 375

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#f7f7f7",
    flex: 1,
    paddingHorizontal: 25,
  },
  settingButton: {
    position: "absolute",
    top: Constants.statusBarHeight + 5,
    right: 15,
    zIndex: 1,
  },
  headerIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight + 10,
  },
  searchBar: {
    marginTop: 40,
  },
  todoButton: {
    paddingHorizontal: 25,
  },
  checkButton: {
    paddingHorizontal: 8,
    color: "yellow",
  },
  emptyNoteImage: {
    width: 211,
    height: 173,
    marginTop: 100,
    marginLeft: 80,
  },
  deleteButton: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todoListItem: {},
  todoRow: {
    marginTop: 20,
  },
  addTodoButton: {
    position: "absolute",
    bottom: 58,
    right: 25,
  },
  folderRow: {
    marginBottom: 20
  }
});

export default connect(mapStateToProps, mapActionToProps)(TodoList);
