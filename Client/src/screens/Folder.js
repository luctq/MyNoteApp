import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import Constants from "expo-constants";
import { connect } from "react-redux";
import moment from "moment";

import SearchBar from "../components/SearchBar";
import NoteListItem from "../components/NoteListItem";
import AddNewNoteButton from "../components/AddNewNoteButton";
import DeleteButton from "../components/DeleteButton";
import BackButton from "../components/BackButton";
import { deleteNote, createNewNote } from "../redux/reducers/Note";
import { makeId } from "../redux/reducers/Todo";

const mapStateToProps = (state) => ({
  noteList: state.note.noteList,
});

const mapActionToProps = {
  deleteNote,
  createNewNote
};

function Folder({ navigation, noteList, route, deleteNote, createNewNote }) {
  const id = route.params.id;
  const name = route.params.name;
  const [textSearch, setTextSearch] = useState("");

  const noteListInFolder = noteList.filter((note, index) => {
    return note.folderId === id;
  });
  const renderItem = (data, rowMap) => {
    if (
      !data.item.isDeleted &&
      (data.item.title.toLowerCase().includes(textSearch.toLowerCase()) ||
        data.item.content.toLowerCase().includes(textSearch.toLowerCase()))
    ) {
      return (
        <SwipeRow
          rightOpenValue={-80}
          leftOpenValue={0}
          disableRightSwipe={true}
          style={styles.noteRow}
        >
          <DeleteButton
            style={styles.deleteButton}
            onDeletePress={() => deleteNote(data.item)}
          />
          <NoteListItem
            style={styles.noteListItem}
            onNoteListItemPress={() => handleNoteListItemPress(data.item)}
            info={data.item}
          />
        </SwipeRow>
      );
    } else return <></>;
  };
  const keyExtractor = (item) => item.id;
  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleNoteListItemPress = (item) => {
    navigation.navigate("Note", { item, isNew: false, folderName: name, });
  };
  const handleAddNewNotePress = async () => {
    // const nextId = noteList.length === 0 ? 0 : noteList[noteList.length - 1].id + 1
    const newNote = {
      id: makeId(10),
      folderId: id,
      title: "",
      content: "",
      lastEdit: moment().format("YYYYMMDDHHmmss"),
      isDeleted: false,
      deleteTime: null,
      theme: "light"
    }
    await createNewNote(newNote)
    navigation.navigate("Note", {
      item: newNote,
      isNew: true,
      folderName: name,
    });
  };

  return (
    <View style={styles.container}>
      <BackButton style={styles.backButton} onBackPress={handleBackPress} />
      <Text style={styles.header}>{name}</Text>
      <SearchBar
        style={styles.searchBar}
        textSearch={textSearch}
        setTextSearch={setTextSearch}
      />
      <SwipeListView
        data={noteListInFolder}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      <AddNewNoteButton
        style={styles.addNewNoteButton}
        onAddNewNotePress={handleAddNewNotePress}
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
  addNewNoteButton: {
    position: "absolute",
    bottom: 58,
    right: 25,
  },
  noteRow: {
    marginTop: 20,
  },
  deleteButton: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noteListItem: {},
  backButton: {
    position: "absolute",
    top: Constants.statusBarHeight + 5,
    left: 6,
  },
});

export default connect(mapStateToProps, mapActionToProps)(Folder);
