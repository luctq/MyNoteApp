import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noteList: [],
};

const note = createSlice({
  name: "note",
  initialState,
  reducers: {
    // các actions
    addNote(state, action) {
      const newNote = {
        id: action.payload.id,
        folderId: action.payload.folderId,
        title: action.payload.title,
        noteContent: action.payload.noteContent,
        lastEdit: action.payload.lastEdit,
        isDeleted: action.payload.isDeleted, // hoặc để mặc định là false
        deleteTime: action.payload.deleteTime, // hoặc để mặc định là null
      };
      state.noteList.push(newNote);
    },
    deleteNote(state, action) {},
    editNote(state, action) {},
  },
});

const { addNote, deleteNote, editNote } = note.actions;

export const createNewNote = (info) => (dispatch) => {
  dispatch(addNote(info));
};

export default note.reducer;
