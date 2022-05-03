import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folderList: [{ id: 0, name: "Test Folder", noteCount: 1, isDeleted: false, deleteTime: null }],
};

const folder = createSlice({
  name: "folder",
  initialState,
  reducers: {
    // các actions
    addFolder(state, action) {
      var lastId = 0;
      if (state.folderList.length !== 0) lastId = state.folderList[state.folderList.length - 1].id + 1;
      const newFolder = {
        id: lastId, // lấy id của phần tử cuối cùng + 1
        name: action.payload.name,
        noteCount: 0,
        isDeleted: false,
        deleteTime: null,
      };
      state.folderList.push(newFolder);
    },
    deleteFolderById(state, action) {
      state.folderList = state.folderList.filter(
        (folder, index) => {
          if (folder.id === action.payload) {
            folder.isDeleted = true;
          }
          return folder;
        }
      );
    },
    editFolderNameById(state, action) {},
    incNoteCountById(state, action) {
      state.folderList = state.folderList.filter((folder, index) => {
        if (folder.id === action.payload) {
          folder.noteCount++;
        }
        return folder;
      });
    },
    decNoteCountById(state, action) {
      state.folderList = state.folderList.filter((folder, index) => {
        if (folder.id === action.payload) {
          folder.noteCount--;
        }
        return folder;
      });
    },
  },
});

export const {
  addFolder,
  deleteFolderById,
  editFolderNameById,
  incNoteCountById,
  decNoteCountById,
} = folder.actions;

export const createNewFolder = (info) => (dispatch) => {
  dispatch(addFolder(info));
};

export const deleteFolder = (id) => (dispatch) => {
  dispatch(deleteFolderById(id));
};

export default folder.reducer;
