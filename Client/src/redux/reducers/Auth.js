import { createSlice } from "@reduxjs/toolkit";
import { setFolderList, resetFolderList } from "./Folder";
import { setNoteList, resetNoteList } from "./Note";
import { serverApi } from "../serverApi";

const initialState = {
  isLogin: false,
  username: '',
  mes: {
    type: null,
    content: '',
    status: null
  },
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // các actions
    loginComplete(state, action) {
      if (action.payload.status === 1) {
        state.isLogin = true
        state.username = action.payload.username
      } 
      state.mes = {...action.payload.mes, status: action.payload.status}
    },
    logoutComplete(state, action) {
      if (action.payload.status === 1) {
        state.isLogin = false
        state.username = ''
      }
    },
    registerComplete(state, action) {
      state.mes = {...action.payload.mes, status: action.payload.status}
    },
    uploadDataComplete(state, action) {
      state.mes = {...action.payload.mes, status: action.payload.status}
    },
    downloadDataComplete(state, action) {
      state.mes = {...action.payload.mes, status: action.payload.status}
    },
    resetMesComplete(state, action) {
      state.mes = {
        type: null,
        content: '',
        status: null
      }
    }
  },
});

const { loginComplete, logoutComplete , registerComplete, uploadDataComplete, downloadDataComplete, resetMesComplete} = auth.actions;

export const login = (username, password) => async (dispatch) => {
  fetch(`${serverApi}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  })
  .then(res => res.json())
  .then(result => {
    dispatch(loginComplete({ status: result.status, mes: {type: 'login', content: result.mes}, username }))
  })
}

export const register = (username, password) => async (dispatch) => {
  fetch(`${serverApi}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  })
  .then(res => res.json())
  .then(result => {
    dispatch(registerComplete({ status: result.status, mes: {type: 'register', content: result.mes} }))
  })
}

export const logout = () => (dispatch) => {
  fetch(`${serverApi}/logout`, {
    method: 'GET',
  })
  .then(res => res.json())
  .then(result => {
    dispatch(resetNoteList())
    dispatch(resetFolderList())
    dispatch(logoutComplete({ status: result.status }))
  })
}

export const uploadData = (folders, notes) => (dispatch) => {
  fetch(`${serverApi}/sync/uploadData`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({folders, notes})
  })
  .then(res => res.json())
  .then(result => {
    dispatch(uploadDataComplete({ status: result.status, mes: {type: 'uploadData', content: result.mes} }))
  })
}

export const downloadData = () => (dispatch) => {
  fetch(`${serverApi}/sync/downloadData`, {
    method: 'GET',
  })
  .then(res => res.json())
  .then(result => {
    if (result.status === 1) {
      dispatch(setFolderList({ folders: result.data.folders }))
      dispatch(setNoteList({ notes: result.data.notes }))
    }
    dispatch(downloadDataComplete({ status: result.status, mes: {type: 'downloadData', content: result.mes} }))
  })
}

export const shareData = (id, username) => (dispatch) => {
  fetch(`${serverApi}/share/shareNote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id, username})
  })
  .then(res => res.json())
  .then(result => {
    if (result.status === 1) {
      console.log('share success')
    }
  })
}

export const resetMes = () => (dispatch) => {
  dispatch(resetMesComplete({}))
}

export default auth.reducer;
