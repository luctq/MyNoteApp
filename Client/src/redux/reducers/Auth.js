import { createSlice } from "@reduxjs/toolkit";
import { setFolderList } from "./Folder";
import { setNoteList } from "./Note";

const initialState = {
  isLogin: false,
  username: '',
  status: null,
  mes: '',
  randomNumber: 0
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
      if (state.status === action.payload.status) {
        state.randomNumber++
      }
      state.status = action.payload.status
      state.mes = action.payload.mes
    },
    logoutComplete(state, action) {
      if (action.payload.status === 1) {
        state.isLogin = false
        state.username = ''
      } 
      if (state.status === action.payload.status) {
        state.randomNumber++
      }
      state.status = action.payload.status
      state.mes = action.payload.mes
    },
    registerComplete(state, action) {
      if (state.status === action.payload.status) {
        state.randomNumber++
      }
      state.status = action.payload.status
      state.mes = action.payload.mes
    },
    resetStatusComplete(state, action) {
      state.status = null
      state.mes = ''
    },
    uploadDataComplete(state, action) {
      if (state.status === action.payload.status) {
        state.randomNumber++
      }
      state.status = action.payload.status
      state.mes = action.payload.mes
    },
    downloadDataComplete(state, action) {
      if (state.status === action.payload.status) {
        state.randomNumber++
      }
      state.status = action.payload.status
      state.mes = action.payload.mes
    }
  },
});

const { loginComplete, logoutComplete , registerComplete, resetStatusComplete, uploadDataComplete, downloadDataComplete} = auth.actions;

export const login = (username, password) => async (dispatch) => {
  fetch('http://192.168.113.107:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  })
  .then(res => res.json())
  .then(result => {
    dispatch(loginComplete({ status: result.status, mes: result.mes, username }))
  })
}

export const register = (username, password) => async (dispatch) => {
  fetch('http://192.168.113.107:8080/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  })
  .then(res => res.json())
  .then(result => {
    dispatch(registerComplete({ status: result.status, mes: result.mes }))
  })
}

export const logout = () => (dispatch) => {
  fetch('http://192.168.113.107:8080/logout', {
    method: 'GET',
  })
  .then(res => res.json())
  .then(result => {
    dispatch(logoutComplete({ status: result.status, mes: result.mes }))
  })
}

export const uploadData = (folders, notes) => (dispatch) => {
  fetch('http://192.168.113.107:8080/sync/uploadData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({folders, notes})
  })
  .then(res => res.json())
  .then(result => {
    dispatch(uploadDataComplete({ status: result.status, mes: result.mes }))
  })
}

export const downloadData = () => (dispatch) => {
  fetch('http://192.168.113.107:8080/sync/downloadData', {
    method: 'GET',
  })
  .then(res => res.json())
  .then(result => {
    if (result.status === 1) {
      dispatch(setFolderList({ folders: result.data.folders }))
      dispatch(setNoteList({ notes: result.data.notes }))
    }
    dispatch(downloadDataComplete({ status: result.status, mes: result.mes }))
  })
}

export const resetStatus = () => (dispatch) => {
  dispatch(resetStatusComplete({}))
}

export default auth.reducer;
