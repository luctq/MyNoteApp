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
  resetFolderList
} = folder.actions;

export const createNewFolder = (info) => (dispatch) => {
  fetch('http://192.168.113.107:8080/sync/createNewFolder', {
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
  fetch('http://192.168.113.107:8080/sync/deleteFolder', {
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

export default folder.reducer;
