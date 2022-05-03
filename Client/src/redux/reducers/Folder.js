import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folderList: [{ id: 0, name: "Test Folder", noteCount: 1 }],
};

const folder = createSlice({
  name: "folder",
  initialState,
  reducers: {
    // các actions
    addFolder(state, action) {
      var lastId = state.folderList.length - 1;
      if (state.folderList.length === 0) lastId = 0;
      const newFolder = {
        id: state.folderList[lastId].id + 1, // lấy id của phần tử cuối cùng + 1
        name: action.payload.name,
        noteCount: 0,
      };
      state.folderList.push(newFolder);
    },
    deleteFolderById(state, action) {
      state.folderList = state.folderList.filter(
        (folder, index) => folder.id !== action.payload
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
