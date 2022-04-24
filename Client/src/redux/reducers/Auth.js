import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: 0,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // các actions
    loginSuccess(state, action) {
      state.status = 1;
    },
    logoutSuccess(state, action) {
      state.status = 0;
    },
  },
});

const { loginSuccess, logoutSuccess } = auth.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://codersx-swagger.glitch.me/api/auth/login",
      {
        email,
        password,
      }
    );
    dispatch(loginSuccess({}));
  } catch (error) {
    // dispatch(setError("wrong username or password"));
    
  }
};

export const logout = () => (dispatch) => {
  dispatch(logoutSuccess({}));
};

export default auth.reducer;
