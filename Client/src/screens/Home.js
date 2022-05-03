import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import { connect } from "react-redux";

import Constants from "expo-constants";

import SettingButton from "../components/SettingButton";
import SearchBar from "../components/SearchBar";
import CheckButton from "../components/CheckButton";
import FolderListItem from "../components/FolderListItem";
import DeleteButton from "../components/DeleteButton";
import DropDownOfFolder from "../components/DropDownOfFolder";
import AntIcons from "react-native-vector-icons/AntDesign";

import { deleteFolder } from "../redux/reducers/Folder";
import { deleteNote, deleteNoteInFolder } from "../redux/reducers/Note";

const mapStateToProps = (state) => ({
  folderList: state.folder.folderList,
});

const mapActionToProps = {
  deleteFolder,
  deleteNoteInFolder,
};

function Home({ navigation, folderList, deleteFolder, deleteNoteInFolder }) {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const handlePressFolderIcon = () => {
    setIsOpenDropDown(!isOpenDropDown);
  };
  const handleSettingPress = () => {
    navigation.navigate("Settings");
  };
  const handleRecycleBinPress = () => {
    navigation.navigate("RecycleBin");
  };
  const handleFolderListItemPress = (id) => {
    navigation.navigate("Folder", { id });
  };
  const handleDeleteFolder = (id) => {
    deleteNoteInFolder(id);
    deleteFolder(id);
  };
  const renderItem = (data, rowMap) => (
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
      <FolderListItem
        style={styles.folderListItem}
        onFolderListItemPress={() => handleFolderListItemPress(data.item.id)}
        info={data.item}
      />
    </SwipeRow>
  );
  const keyExtractor = (item) => item.id;

  return (
    <View style={styles.container}>
      <DropDownOfFolder
        isOpen={isOpenDropDown}
        setIsOpen={() => handlePressFolderIcon()}
        onRecycleBinPress={handleRecycleBinPress}
      />
      <SettingButton
        style={styles.settingButton}
        onSettingPress={handleSettingPress}
      />
      <View style={styles.headerIcon}>
        <View style={styles.folderButton}>
          <TouchableOpacity onPress={() => handlePressFolderIcon()}>
            <AntIcons name="folderopen" size={25} color="#000" />
          </TouchableOpacity>
        </View>
        <CheckButton style={styles.checkButton} />
      </View>
      <SearchBar style={styles.searchBar} />
      {folderList.length === 0 ? (
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
        <SwipeListView
          data={folderList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
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
  folderButton: {
    paddingHorizontal: 8,
  },
  checkButton: {
    paddingHorizontal: 8,
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
  folderListItem: {},
  folderRow: {
    marginTop: 20,
  },
});

export default connect(mapStateToProps, mapActionToProps)(Home);
