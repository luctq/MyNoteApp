import { createSlice } from "@reduxjs/toolkit";
import { incNoteCountById, decNoteCountById } from "./Folder";

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
      var lastId = state.noteList.length - 1;
      if (state.noteList.length === 0) lastId = 0;
      const newNote = {
        id: state.noteList[lastId].id + 1,
        folderId: action.payload.folderId,
        title: action.payload.title,
        content: action.payload.content,
        lastEdit: null,
        isDeleted: false,
        deleteTime: null,
      };
      state.noteList.push(newNote);
    },
    deleteNoteById(state, action) {
      state.noteList = state.noteList.filter(
        (note, index) => note.id !== action.payload
      );
    },
    deleteNoteInFolderById(state, action) {
      state.noteList = state.noteList.filter((note, index) => {
        return note.folderId !== action.payload;
      });
    },
    editNote(state, action) {},
  },
});

export const { addNote, deleteNoteById, editNote, deleteNoteInFolderById } =
  note.actions;

export const createNewNote = (info) => (dispatch) => {
  dispatch(addNote(info));
  dispatch(incNoteCountById(info.folderId));
};

export const deleteNote = (id) => (dispatch) => {
  dispatch(deleteNoteById(id));
  dispatch(decNoteCountById(id));
}

export const deleteNoteInFolder = (folderId) => (dispatch) => {
  dispatch(deleteNoteInFolderById(folderId));
};

export default note.reducer;
