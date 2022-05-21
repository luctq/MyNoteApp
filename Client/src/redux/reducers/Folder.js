import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folderList: [],
  folderCount: 0, // số folder có isDeleted = false
};

const folder = createSlice({
  name: "folder",
  initialState,
  reducers: {
    // các actions
    addFolder(state, action) {
      var lastId = 0;
      if (state.folderList.length !== 0)
        lastId = state.folderList[state.folderList.length - 1].id + 1;
      const newFolder = {
        id: lastId, // lấy id của phần tử cuối cùng + 1
        name: action.payload.name,
        noteCount: 0,
        isDeleted: false,
        deleteTime: null,
      };
      state.folderList.push(newFolder);
      state.folderCount++;
    },
    deleteFolderById(state, action) {
      state.folderList = state.folderList.filter((folder, index) => {
        if (folder.id === action.payload) {
          folder.isDeleted = true;
        }
        return folder;
      });
      state.folderCount--;
    },
    restoreFolderById(state, action) {
      state.folderList = state.folderList.filter((folder, index) => {
        if (folder.id === action.payload) {
          folder.isDeleted = false;
          folder.noteCount = 0;
        }
        return folder;
      });
      state.folderCount++;
    },
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
    setFolderList(state, action) {
      state.folderList = action.payload.folders
      state.folderCount = action.payload.folders.length
    }
  },
});

export const {
  addFolder,
  deleteFolderById,
  restoreFolderById,
  incNoteCountById,
  decNoteCountById,
  setFolderList
} = folder.actions;

export const createNewFolder = (info) => (dispatch) => {
  dispatch(addFolder(info));
};

export const deleteFolder = (id) => (dispatch) => {
  dispatch(deleteFolderById(id));
};

export const restoreFolder = (id) => (dispatch) => {
  dispatch(restoreFolderById(id));
};

export default folder.reducer;
