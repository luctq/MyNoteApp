import { createSlice } from "@reduxjs/toolkit";
import { serverApi } from "../serverApi";

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
      state.folderList.push(action.payload);
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
    },
    resetFolderList(state, action) {
      state.folderList = []
      state.folderCount = 0
    },
    expulsionFolderById(state, action) {
      state.folderList = state.folderList.filter(folder => folder.id !== action.payload);
      state.folderCount--;
    }
  },
});

export const {
  addFolder,
  deleteFolderById,
  restoreFolderById,
  incNoteCountById,
  decNoteCountById,
  setFolderList,
  resetFolderList,
  expulsionFolderById
} = folder.actions;

export const createNewFolder = (info) => (dispatch) => {
  fetch(`${serverApi}/sync/createNewFolder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({folder: info})
  })
  .then(res => res.json())
  .then(result => {
    console.log(result.mes)
  })
  dispatch(addFolder(info));
};

export const deleteFolder = (id) => (dispatch) => {
  fetch(`${serverApi}/sync/deleteFolder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id})
  })
  .then(res => res.json())
  .then(result => {
    console.log(result.mes)
  })
  dispatch(deleteFolderById(id));
};

export const restoreFolder = (id) => (dispatch) => {
  dispatch(restoreFolderById(id));
};

export const expulsionFolder = (id) => (dispatch) => {
  dispatch(expulsionFolderById(id))
}

export default folder.reducer;
