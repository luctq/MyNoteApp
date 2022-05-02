import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folderList: [],
};

const folder = createSlice({
  name: "folder",
  initialState,
  reducers: {
    // các actions
    addFolder(state, action) {
      const newFolder = {
        id: state.folderList.length, // hoặc random ra id
        name: action.payload.name,
        noteCount: 0,
      };
      state.folderList.push(newFolder);
    },
    deleteFolder(state, action) {},
    editFolderName(state, action) {},
  },
});

const { addFolder, deleteFolde, editFolderName } =
  folder.actions;

export const createNewFolder = (info) => (dispatch) => {
  dispatch(addFolder(info));
};

export default folder.reducer;
