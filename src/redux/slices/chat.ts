import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { getUserChats } from "../../Api";
import { requestHandler } from "../../Utils";
import {
  ChatListItemInterface,
  ChatMessageInterface,
} from "../../Interfaces/chat";
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
  },
});

// Reducer
export default slice.reducer;

export function FetchChats() {
  return async (dispatch: Dispatch) => {
    //Set Loader Visible
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    // Make API call here
    await requestHandler(
      async () => await getUserChats(),
      null,
      (res) => {
        const { data } = res;
        dispatch(
          slice.actions.fetchChats({
            isLoading: false,
            chats: data.filter((i: ChatListItemInterface) => !i.isGroupChat),
            groups: data.filter((i: ChatListItemInterface) => i.isGroupChat),
            error: undefined,
          })
        );
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      },
      //On Error
      alert
    );
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
