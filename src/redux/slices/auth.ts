import { createSlice } from "@reduxjs/toolkit";

import { showSnackbar } from "./app";
import { requestHandler } from "../../Utils";
import { loginUser } from "../../Api";
import { UserInterface } from "../../Interfaces/user";

// ----------------------------------------------------------------------

export interface AuthInitialState {
  isLoggedIn: boolean;
  token: string;
  isLoading: boolean;
  user: UserInterface | null;
  error: boolean;
}

const initialState: AuthInitialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  user: null,
  error: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    signOut(state?: any) {
      state.isLoggedIn = false;
      state.token = "";
      state.user = null;
      state.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

export function LoginUser(formValues: any) {
  return async (dispatch: any) => {
    // Make API call here
    await requestHandler(
      async () => await loginUser(formValues),
      () => {
        dispatch(
          slice.actions.updateIsLoading({ isLoading: true, error: false })
        );
      },
      (res) => {
        const { data } = res;
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: data.accessToken,
            user: data.user,
          })
        );
        dispatch(
          showSnackbar({ severity: "success", message: res.data.message })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      },
      (error: any) => {
        console.log(error);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      } // Display error alerts on request failure
    );
  };
}

export function LogoutUser() {
  return async (dispatch: any) => {
    window.localStorage.removeItem("user");
    dispatch(slice.actions.signOut());
  };
}
