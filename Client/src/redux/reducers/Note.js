import { createSlice } from "@reduxjs/toolkit";
import { incNoteCountById, decNoteCountById } from "./Folder";
import { dark, light, pink, yellow } from "../../themes/themes";
import moment from "moment";
import "moment/locale/vi";
import { serverApi } from "../serverApi"

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
      state.noteList.push(action.payload);
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
    expulsionNoteInFolderById(state, action) {
      state.noteList = state.noteList.filter(note => note.folderId !== action.payload);
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
    },
    resetNoteList(state, action) {
      state.noteList = []
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
  setNoteList,
  resetNoteList,
  expulsionNoteInFolderById
} = note.actions;

export const changeTheme = (id, theme) => (dispatch) => {
  fetch(`${serverApi}/sync/changeTheme`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id, theme})
  })
  .then(res => res.json())
  .then(result => {
    console.log(result.mes)
  })
  dispatch(changeThemeScreen({id: id, theme: theme}));
};

export const createNewNote = (info) => (dispatch) => {
  fetch(`${serverApi}/sync/createNewNote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({note: info})
  })
  .then(res => res.json())
  .then(result => {
    console.log(result.mes)
  })
  dispatch(addNote(info));
  dispatch(incNoteCountById(info.folderId));
};

export const deleteNote = (note) => (dispatch) => {
  fetch(`${serverApi}/sync/deleteNote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: note.id})
  })
  .then(res => res.json())
  .then(result => {
    console.log(result.mes)
  })
  dispatch(deleteNoteById(note.id));
  dispatch(decNoteCountById(note.folderId));
};

export const restoreNote = (note) => (dispatch) => {
  fetch(`${serverApi}/sync/restoreNote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: note.id})
  })
  .then(res => res.json())
  .then(result => {
    console.log(result.mes)
  })
  dispatch(restoreNoteById(note.id));
  dispatch(incNoteCountById(note.folderId));
};

export const deleteNoteInFolder = (folderId) => (dispatch) => {
  dispatch(deleteNoteInFolderById(folderId));
};

export const updateNote = (note) => (dispatch) => {
  if (note.isNoteShare) return
  fetch(`${serverApi}/sync/updateNote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({note})
  })
  .then(res => res.json())
  .then(result => {
    console.log(result.mes)
  })
  dispatch(editNote(note));
};

export const expulsionNote = (note) => (dispatch) => {
  fetch(`${serverApi}/sync/expulsionNote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: note.id})
  })
  .then(res => res.json())
  .then(result => {
    console.log(result.mes)
  })
  dispatch(expulsionNoteById(note.id));
  dispatch(decNoteCountById(note.folderId));
};

export const expulsionNoteInFolder = (folderId) => (dispatch) => {
  dispatch(expulsionNoteInFolderById(folderId))
}

export default note.reducer;
