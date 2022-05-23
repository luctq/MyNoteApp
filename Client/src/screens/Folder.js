import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import Constants from "expo-constants";
import { connect } from "react-redux";
import moment from "moment";

import SearchBar from "../components/SearchBar";
import NoteListItem from "../components/NoteListItem";
import AddNewNoteButton from "../components/AddNewNoteButton";
import DeleteButton from "../components/DeleteButton";
import BackButton from "../components/BackButton";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  deleteNote,
  createNewNote,
  expulsionNote,
} from "../redux/reducers/Note";

import { renameFolder } from "../redux/reducers/Folder";
import { makeId } from "../redux/reducers/Todo";

const mapStateToProps = (state) => ({
  noteList: state.note.noteList,
});

const mapActionToProps = {
  deleteNote,
  createNewNote,
  expulsionNote,
  renameFolder,
};

function Folder({
  navigation,
  noteList,
  route,
  deleteNote,
  createNewNote,
  expulsionNote,
  renameFolder,
}) {
  const id = route.params.id;
  const isFolderShare = route.params.isFolderShare;
  const [textSearch, setTextSearch] = useState("");
  const [name, setName] = useState(route.params.name);
  const [onPressEditName, setOnPressEditName] = useState(false);
  const textInputRef = useRef();

  const noteListInFolder = noteList.filter((note, index) => {
    return note.folderId === id;
  });
  const handleDeleteNote = (item) => {
    if (item.isNoteShare) {
      expulsionNote(item);
    } else {
      deleteNote(item);
    }
  };
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
            onDeletePress={() => handleDeleteNote(data.item)}
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
    navigation.navigate("Note", { item, isNew: false, folderName: name });
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
      theme: "light",
    };
    await createNewNote(newNote);
    navigation.navigate("Note", {
      item: newNote,
      isNew: true,
      folderName: name,
    });
  };

  function handleRenameFolder() {
    if (onPressEditName) renameFolder(id, name);
    // else textInputRef.current.focus();
    setOnPressEditName(!onPressEditName);
  }

  return (
    <View style={styles.container}>
      <BackButton style={styles.backButton} onBackPress={handleBackPress} />
      <View style={styles.header}>
        <AntDesign
          name={onPressEditName ? "check" : "edit"}
          size={25}
          style={styles.iconEdit}
          onPress={() => handleRenameFolder()}
        />
        <TextInput
          value={name}
          style={styles.folderName}
          onChangeText={(text) => setName(text)}
          ref={textInputRef}
          editable={onPressEditName}
        />
      </View>

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
        isHide={isFolderShare ? true : false}
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
  header: {
    flexDirection: "row",
    marginLeft: 5,
  },
  iconEdit: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 50 + 13,
  },
  folderName: {
    fontSize: 35,
    fontWeight: "400",
    marginTop: Constants.statusBarHeight + 50,
    flex: 7,
  },
});

export default connect(mapStateToProps, mapActionToProps)(Folder);
