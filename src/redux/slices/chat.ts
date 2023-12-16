import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { ChatMessageInterface } from "../../Interfaces/chat";
import AxiosService from "../../Api/Service";
import { showSnackbar } from "./app";
// import { showSnackbar } from "./app";

// ----------------------------------------------------------------------

const initialState = {
  notification: [],
  chats: [],
  currentChat: null,
  groups: [],
  error: undefined,
  isLoading: false,
  messages: [],
  unreadMessages: [],
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    fetchChats(state, action) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
      state.chats = action.payload.chats;
      state.groups = action.payload.groups;
    },
    selectedChat(state, action) {
      state.isLoading = action.payload.isLoading;
      state.chats = action.payload.chats;
    },
    currentChat(state, action) {
      state.isLoading = action.payload.isLoading;
      state.currentChat = action.payload.currentChat;
    },
    setUnreadMessages(state, action) {
      state.isLoading = action.payload.isLoading;
      state.unreadMessages = action.payload.unreadMessages;
    },
    setMessages(state, action) {
      state.isLoading = action.payload.isLoading;
      state.messages = action.payload.messages;
    },
    setGroups(state, action) {
      state.isLoading = action.payload.isLoading;
      state.groups = action.payload.groups;
    },
    updateTypingChat(state, action) {
      state.isLoading = action.payload.isLoading;
      state.chats = action.payload.chats;
      // state.currentChat = action.payload.currentChat;
    },
  },
});

// Reducer
export default slice.reducer;

export function FetchChats(token: any) {
  return async (dispatch: Dispatch) => {
    //Set Loader Visible
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    // Make API call here
    await AxiosService.get(`/api/chat`, token)
      .then((res: any) => {
        if (res.result) {
          dispatch(
            slice.actions.fetchChats({
              isLoading: false,
              chats: res.result?.chats,
              groups: res.result?.groups,
              error: undefined,
            })
          );
          dispatch(
            slice.actions.updateIsLoading({ isLoading: false, error: false })
          );
        }
      })
      .catch((error: any) => {
        dispatch(
          showSnackbar({ severity: "error", message: error.message }) as any
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      });
  };
}

export function SetChats(chat: any) {
  return async (dispatch: Dispatch) => {
    //Set Loader visible
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    //Update Chats content
    dispatch(
      slice.actions.selectedChat({
        isLoading: false,
        chats: chat,
      })
    );
  };
}

export function updateGroups(groups: any) {
  return async (dispatch: Dispatch) => {
    //Set Loader visible
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    //Update groups content
    dispatch(
      slice.actions.setGroups({
        isLoading: false,
        groups: groups,
      })
    );
  };
}

export function setCurrentChat(chat: any) {
  return async (dispatch: Dispatch) => {
    //Set Loader visible
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    //Update Chats content
    dispatch(
      slice.actions.currentChat({
        isLoading: false,
        currentChat: chat,
      })
    );
  };
}

export function updateUnreadMessages(msg: ChatMessageInterface[]) {
  return async (dispatch: Dispatch) => {
    //Set Loader visible
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    //Update unreadMessages
    dispatch(
      slice.actions.setUnreadMessages({
        isLoading: false,
        unreadMessages: msg,
      })
    );
  };
}

export function updateMessages(msg: ChatMessageInterface[]) {
  return async (dispatch: Dispatch) => {
    //Set Loader visible
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    //Update messages
    dispatch(
      slice.actions.setMessages({
        isLoading: false,
        messages: msg,
      })
    );
  };
}

export function updateTypeEvent(chat: any) {
  return async (dispatch: Dispatch) => {
    //Set Loader visible
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    //Update Chats content
    dispatch(
      slice.actions.updateTypingChat({
        isLoading: false,
        chats: chat,
        // currentChat: currentChat,
      })
    );
  };
}
