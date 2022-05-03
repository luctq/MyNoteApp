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
      var lastId = 0;
      if (state.noteList.length !== 0)
        lastId = state.noteList[state.noteList.length - 1].id + 1;
      const newNote = {
        id: lastId,
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
      state.noteList = state.noteList.filter((note, index) => {
        if (note.id === action.payload) {
          note.isDeleted = true;
        }
        return note;
      });
    },
    restoreNoteById(state, action) {
      state.noteList = state.noteList.filter((note, index) => {
        if (note.id === action.payload) {
          note.isDeleted = false;
        }
        return note;
      });
    },
    deleteNoteInFolderById(state, action) {
      state.noteList = state.noteList.filter((note, index) => {
        if (note.folderId === action.payload) {
          note.isDeleted = true;
        }
        return note;
      });
    },
    editNote(state, action) {
      state.noteList = state.noteList.filter((note, index) => {
        if (note.id === action.payload.id) {
          note.title = action.payload.title;
          note.content = action.payload.content;
          // cập nhật lastEdit
          // note.lastEdit = Date.now();
        }
        return note;
      });
    },
    expulsionNoteById(state, action) {
      state.noteList = state.noteList.filter(
        (note, index) => note.id !== action.payload
      );
    },
  },
});

export const {
  addNote,
  deleteNoteById,
  restoreNoteById,
  editNote,
  deleteNoteInFolderById,
  expulsionNoteById,
} = note.actions;

export const createNewNote = (info) => (dispatch) => {
  dispatch(addNote(info));
  dispatch(incNoteCountById(info.folderId));
};

export const deleteNote = (id) => (dispatch) => {
  dispatch(deleteNoteById(id));
  dispatch(decNoteCountById(id));
};

export const restoreNote = (note) => (dispatch) => {
  dispatch(restoreNoteById(note.id));
  dispatch(incNoteCountById(note.folderId));
};

export const deleteNoteInFolder = (folderId) => (dispatch) => {
  dispatch(deleteNoteInFolderById(folderId));
};

export const updateNote = (note) => (dispatch) => {
  dispatch(editNote(note));
};

export const expulsionNote = (id) => (dispatch) => {
  dispatch(expulsionNoteById(id));
}

export default note.reducer;
