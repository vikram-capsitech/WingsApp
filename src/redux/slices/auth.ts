import { createSlice } from "@reduxjs/toolkit";

import { showSnackbar } from "./app";
import { UserInterface } from "../../Interfaces/user";
import AxiosService from "../../Api/Service";

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
    updateUser(state, action) {
      state.user = action.payload.user;
      state.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

export function LoginUser(formValues: any) {
  return async (dispatch: any) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    // Make API call here
    AxiosService.auth("/api/user/login", formValues)
      .then((res: any) => {
        if (res.result) {
          dispatch(
            slice.actions.updateIsLoading({ isLoading: false, error: false })
          );
          dispatch(
            slice.actions.logIn({
              isLoggedIn: true,
              token: res.result.token,
              user: res.result,
            })
          );
        }
      })
      .catch((error: any) => {
        dispatch(showSnackbar({ severity: "error", message: error.message }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      });
  };
}

export function LogoutUser() {
  return async (dispatch: any) => {
    window.localStorage.removeItem("user");
    dispatch(slice.actions.signOut());
  };
}

export function UpdateUser(user: any) {
  return async (dispatch: any) => {
    window.localStorage.removeItem("user");
    dispatch(
      slice.actions.updateUser({
        isLoading: false,
        user: user,
      })
    );
  };
}
