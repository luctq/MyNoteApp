import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noteList: [
    {
      id: 0,
      folderId: 0,
      title: "Test",
      content: "Nội dung skgdbá kdg ksdfk sdkf sbkdjhvvhvh...",
      lastEdit: "",
      isDeleted: false,
      deleteTime: "",
    },
  ],
};

const note = createSlice({
  name: "note",
  initialState,
  reducers: {
    // các actions
    addNote(state, action) {
      const newNote = {
        id: state.noteList.length,
        folderId: action.payload.folderId,
        title: action.payload.title,
        content: action.payload.content,
        lastEdit: null,
        isDeleted: false, 
        deleteTime: null, 
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
