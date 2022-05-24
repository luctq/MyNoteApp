import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { connect } from "react-redux";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import moment from "moment";
import "moment/locale/vi";
import { useState } from "react";


import SearchBar from "../components/SearchBar";
import NoteListItem from "../components/NoteListItem";
import BackButton from "../components/BackButton";
import RestoreButton from "../components/RestoreButton";

import { restoreFolder } from "../redux/reducers/Folder";
import { restoreNote, expulsionNote } from "../redux/reducers/Note";


const mapStateToProps = (state) => ({
  noteList: state.note.noteList,
  folderList: state.folder.folderList,
});

const mapActionToProps = {
  restoreFolder,
  restoreNote,
  expulsionNote,
};

function RecycleBin({
  navigation,
  noteList,
  folderList,
  restoreFolder,
  restoreNote,
}) {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const [textSearch, setTextSearch] = useState("");

  const handleRestoreNote = (note) => {
    // kiểm tra folder chứa nó bị xóa chưa, nếu rồi thì khôi phục folder đó
    const folder = folderList.filter(folder => folder.id === note.folderId)[0]
    if (folder.isDeleted) {
      restoreFolder(note.folderId);
    }
    //khôi phục note
    restoreNote(note);
  };

  const handleExpulsionNote = (id) => {
    expulsionNote(id);
  };

  const renderItem = (data, rowMap) => {
    if (
      data.item.isDeleted &&
      moment(data.item.lastEdit, "YYYYMMDDHHmmss").fromNow() ===
        "một tháng trước"
    ) {
      handleExpulsionNote(data.item.id);
    } else if (data.item.isDeleted && (data.item.title.toLowerCase().includes(textSearch.toLowerCase()) ||
    data.item.content.toLowerCase().includes(textSearch.toLowerCase()))) {
      return (
        <SwipeRow
          rightOpenValue={-80}
          leftOpenValue={0}
          disableRightSwipe={true}
          style={styles.noteRow}
        >
          <RestoreButton
            style={styles.restoreButton}
            onRestorePress={() => handleRestoreNote(data.item)}
          />
          <NoteListItem
            style={styles.noteListItem}
            onNoteListItemPress={() => {}}
            info={data.item}
          />
        </SwipeRow>
      );
    } else return <></>;
  };

  const keyExtractor = (item) => item.id;

  return (
    <View style={styles.container}>
      <BackButton style={styles.backButton} onBackPress={handleBackPress} />
      <Text style={styles.header}>Thùng rác</Text>
      <Text style={styles.note}>
        Các ghi chú được giữ trong thùng rác trong vòng 1 tháng trước khi bị xóa vĩnh
        viễn
      </Text>
      <SearchBar style={styles.searchBar} textSearch={textSearch} setTextSearch={setTextSearch} />
      <SwipeListView
        data={noteList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f7",
    flex: 1,
    paddingHorizontal: 25,
  },
  header: {
    fontSize: 35,
    fontWeight: "400",
    marginTop: Constants.statusBarHeight + 50,
  },
  note: {
    fontSize: 15,
    fontWeight: "300",
    color: "#FF9900",
    backgroundColor: "#FFF9EF",
    borderRadius: 27,
    paddingVertical: 10,
    paddingHorizontal: 15,
    overflow: "hidden",
    marginTop: 10,
  },
  searchBar: {
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    top: Constants.statusBarHeight + 5,
    left: 6,
  },
  noteRow: {
    marginTop: 20,
  },
  restoreButton: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noteListItem: {},
});

export default connect(mapStateToProps, mapActionToProps)(RecycleBin);
