import { createSlice } from "@reduxjs/toolkit";
import { incNoteCountById, decNoteCountById } from "./Folder";
import { dark, light, pink, yellow } from "../../themes/themes";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");
const initialState = {
  noteList: [],
  // theme: light,
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
        lastEdit: moment().format("YYYYMMDDHHmmss"),
        isDeleted: false,
        theme: light
      };
      state.noteList.push(newNote);
    },
    deleteNoteById(state, action) {
      state.noteList = state.noteList.filter((note, index) => {
        if (note.id === action.payload) {
          note.isDeleted = true;
          note.lastEdit = moment().format("YYYYMMDDHHmmss");
        }
        return note;
      });
    },
    restoreNoteById(state, action) {
      state.noteList = state.noteList.filter((note, index) => {
        if (note.id === action.payload) {
          note.isDeleted = false;
          note.lastEdit = moment().format("YYYYMMDDHHmmss");
        }
        return note;
      });
    },
    deleteNoteInFolderById(state, action) {
      state.noteList = state.noteList.filter((note, index) => {
        if (note.folderId === action.payload) {
          note.isDeleted = true;
          note.lastEdit = moment().format("YYYYMMDDHHmmss");
        }
        return note;
      });
    },
    editNote(state, action) {
      state.noteList = state.noteList.filter((note, index) => {
        if (note.id === action.payload.id) {
          note.title = action.payload.title;
          note.content = action.payload.content;
          note.lastEdit = moment().format("YYYYMMDDHHmmss");
        }
        return note;
      });
    },
    expulsionNoteById(state, action) {
      state.noteList = state.noteList.filter(
        (note, index) => note.id !== action.payload
      );
    },
    changeThemeScreen(state, action) {
      state.noteList = state.noteList.filter((note, index) => {
        if (note.id === action.payload.id) {
          note.theme = action.payload.theme;
        }
        return note;
      });
    },
    setNoteList(state, action) {
      state.noteList = action.payload.notes
    }
  },
});

export const {
  addNote,
  deleteNoteById,
  restoreNoteById,
  editNote,
  deleteNoteInFolderById,
  expulsionNoteById,
  changeThemeScreen,
  setNoteList
} = note.actions;

export const changeTheme = (id, theme) => (dispatch) => {
  if (theme == "light") {
    dispatch(changeThemeScreen({id: id, theme: light}));
  } else if (theme == "dark") {
    dispatch(changeThemeScreen({id: id, theme: dark}));
  } else if (theme == "yellow") {
    dispatch(changeThemeScreen({id: id, theme: yellow}));
  } else if (theme == "pink") {
    dispatch(changeThemeScreen({id: id, theme: pink}));
  }
};

export const createNewNote = (info) => (dispatch) => {
  dispatch(addNote(info));
  dispatch(incNoteCountById(info.folderId));
};

export const deleteNote = (note) => (dispatch) => {
  dispatch(deleteNoteById(note.id));
  dispatch(decNoteCountById(note.folderId));
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
};

export default note.reducer;
