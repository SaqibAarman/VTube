import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerInStart: (state) => {
      state.loading = true;
    },
    registerInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    registerInFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logInStart: (state) => {
      state.loading = true;
    },
    logInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    logInFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    /* logOut: (state) => {
      localStorage.clear();
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    }, */
    subscription: (state, action) => {
      if (state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.subscribedUsers.push(action.payload);
      }
    },
  },
});

export const {
  registerInStart,
  registerInSuccess,
  registerInFailure,
  logInStart,
  logInSuccess,
  logInFailure,
  //logOut,
  subscription,
} = userSlice.actions;

export default userSlice.reducer;
