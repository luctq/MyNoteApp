import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
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
const mapStateToProps = (state) => ({
  todoList: state.todo.todoList,
  todoListCompleted: state.todo.todoListCompleted,
  todoCount: state.todo.todoCount,
});

const mapActionToProps = {};

function TodoList({ navigation, todoList, todoCount, todoListCompleted }) {
  const [textSearch, setTextSearch] = useState("");
  const [isSelected, setSelection] = useState(false);
  const handlePressFolderIcon = () => {
    navigation.navigate("Home");
  };
  const handleSettingPress = () => {
    navigation.navigate("Settings");
  };
  const handleRecycleBinPress = () => {
    navigation.navigate("RecycleBin");
  };
  const handleTodoListItemPress = (id, ti) => {};
  const handleDeleteFolder = (id) => {};
  const renderItemTodoList = (data, rowMap) => {
    if (
      !data.item.isDeleted &&
      data.item.content.toLowerCase().includes(textSearch.toLowerCase())
    ) {
      return (
        <SwipeRow
          rightOpenValue={-80}
          leftOpenValue={0}
          disableRightSwipe={true}
          style={styles.todoRow}
        >
          <DeleteButton
            style={styles.deleteButton}
            onDeletePress={() => handleDeleteFolder(data.item.id)}
          />
          <TodoListItem
            type="todoList"
            style={styles.todoListItem}
            onTodoListItemPress={() =>
              handleTodoListItemPress(data.item.id, data.item.content)
            }
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
          rightOpenValue={-80}
          leftOpenValue={0}
          disableRightSwipe={true}
          style={styles.folderRow}
        >
          <DeleteButton
            style={styles.deleteButton}
            onDeletePress={() => handleDeleteFolder(data.item.id)}
          />
          <TodoListItem
            type="todoListComplete"
            style={styles.todoListItem}
            onTodoListItemPress={() =>
              handleTodoListItemPress(data.item.id, data.item.content)
            }
            info={data.item}
          />
        </SwipeRow>
      );
    } else return <></>;
  };
  const keyExtractor = (item) => item.id;

  return (
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
            data={todoList}
            renderItem={renderItemTodoList}
            keyExtractor={keyExtractor}
          />
          {todoListCompleted.length === 0 ? null : (
            <View>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
                <MaterialIcons name='arrow-drop-down' size={25} color="#000" />
                <Text>Hoàn tất {todoListCompleted.length}</Text>
              </TouchableOpacity>
              <SwipeListView
                data={todoListCompleted}
                renderItem={renderItemTodoListCompleted}
                keyExtractor={keyExtractor}
              />
            </View>
          )}
        </View>
      )}
       <AddTodoButton
        style={styles.addTodoButton}
        onAddNewNotePress={() => alert('add todo')}
      />
    </View>
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
  }
});

export default connect(mapStateToProps, mapActionToProps)(TodoList);
