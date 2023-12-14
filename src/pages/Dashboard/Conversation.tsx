import { Stack, Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from "../../Components/ScrollBar";

import { ChatHeader, ChatFooter } from "../../Components/Chat";
import useResponsive from "../../Hooks/useResponsive";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "../../Sections/dashboard/Conversation";
import { useDispatch, useSelector } from "react-redux";
import {
  SetChats,
  setCurrentChat,
  updateMessages,
  updateUnreadMessages,
} from "../../redux/slices/chat";
import { requestHandler } from "../../Utils";
import { getChatMessages, sendMessage } from "../../Api";
import { useParams } from "react-router-dom";
import { useSocket } from "../../Contexts/SocketContext";
import {
  ChatListItemInterface,
  ChatMessageInterface,
} from "../../Interfaces/chat";
import wings from "../../Assets/Images/wings.svg";
import addNotification from "react-push-notification";

const CONNECTED_EVENT = "connected";
const DISCONNECT_EVENT = "disconnect";
const JOIN_CHAT_EVENT = "joinChat";
const NEW_CHAT_EVENT = "newChat";
const TYPING_EVENT = "typing";
const STOP_TYPING_EVENT = "stopTyping";
const MESSAGE_RECEIVED_EVENT = "messageReceived";
const LEAVE_CHAT_EVENT = "leaveChat";
const UPDATE_GROUP_NAME_EVENT = "updateGroupName";

const Conversation = ({ isMobile, menu }: any) => {
  const { messages } = useSelector((state: any) => state.chat);
  const scrollRef = React.useRef<any>();

  React.useEffect(() => {
    if (scrollRef)
      (scrollRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }, [scrollRef, messages]);

  return (
    <Box p={isMobile ? 1 : 2}>
      <Stack spacing={2} style={{ height: "73.4dvh" }}>
        {messages.toReversed().map((el: any) => {
          switch (el.type) {
            case "divider":
              return (
                // Timeline
                <Timeline el={el} />
              );

            case "msg":
              switch (el.subtype) {
                case "img":
                  return (
                    // Media Message
                    <MediaMsg el={el} menu={menu} />
                  );

                case "doc":
                  return (
                    // Doc Message
                    <DocMsg el={el} menu={menu} />
                  );
                case "Link":
                  return (
                    //  Link Message
                    <LinkMsg el={el} menu={menu} />
                  );

                case "reply":
                  return (
                    //  ReplyMessage
                    <ReplyMsg el={el} menu={menu} />
                  );

                default:
                  return (
                    // Text Message
                    <TextMsg el={el} menu={menu} />
                  );
              }

            default:
              return (
                // Text Message
                <TextMsg el={el} menu={menu} />
              );
          }
        })}
        <div ref={scrollRef} />
      </Stack>
    </Box>
  );
};

const ChatComponent = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const theme = useTheme();

  const { clientId } = useParams();
  const dispatch = useDispatch();

  const [message, setMessage] = React.useState(""); // To store the currently typed message
  const [attachedFiles, setAttachedFiles] = React.useState<File[]>([]); // To store files attached to messages
  const { currentChat, unreadMessages, messages, chats } = useSelector(
    (state: any) => state.chat
  );
  const [isTyping, setIsTyping] = React.useState(false); // To track if someone is currently typing
  const [selfTyping, setSelfTyping] = React.useState(false); // To track if the current user is typing
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isConnected, setIsConnected] = React.useState(false); // For tracking socket connection
  // To keep track of the setTimeout function
  const typingTimeoutRef = useRef<any | null>(null);

  const { socket } = useSocket();

  /**
   *  A  function to update the last message of a specified chat to update the chat list
   */
  const updateChatLastMessage = (
    chatToUpdateId: string,
    message: ChatMessageInterface // The new message to be set as the last message
  ) => {
    // Search for the chat with the given ID in the chats array
    const chatToUpdate = chats.find(
      (chat: { _id: string }) => chat._id === chatToUpdateId
    )!;

    // Update the 'lastMessage' field of the found chat with the new message
    chatToUpdate.lastMessage = message;

    // Update the 'updatedAt' field of the chat with the 'updatedAt' field from the message
    chatToUpdate.updatedAt = message?.updatedAt;

    // Update the state of chats, placing the updated chat at the beginning of the array
    dispatch(
      SetChats([
        chatToUpdate, // Place the updated chat first
        ...chats.filter((chat: { _id: string }) => chat._id !== chatToUpdateId), // Include all other chats except the updated one
      ]) as any
    );
  };

  //for get messages
  const getMessages = async () => {
    // Check if a chat is selected, if not, show an alert
    if (!currentChat?._id) return alert("No chat is selected");
    // Check if socket is available, if not, show an alert
    if (!socket) return alert("Socket not available");
    // Emit an event to join the current chat
    socket.emit(JOIN_CHAT_EVENT, currentChat?._id);
    // Filter out unread messages from the current chat as those will be read
    dispatch(
      updateUnreadMessages(
        unreadMessages.filter((msg: any) => msg.chat !== currentChat?._id)
      ) as any
    );
    // Make an async request to fetch chat messages for the current chat
    requestHandler(
      // Fetching messages for the current chat
      async () => await getChatMessages(currentChat?._id || ""),
      // Set the state to loading while fetching the messages
      null,
      // After fetching, set the chat messages to the state if available
      (res) => {
        const { data } = res;
        dispatch(updateMessages(data || []) as any);
      },
      // Display any error alerts if they occur during the fetch
      alert
    );
  };

  // Function to send a chat message
  const sendChatMessage = async () => {
    // If no current chat ID exists or there's no socket connection, exit the function
    if (!currentChat?._id || !socket) return;

    // Emit a STOP_TYPING_EVENT to inform other users/participants that typing has stopped
    socket.emit(STOP_TYPING_EVENT, currentChat?._id);

    // Use the requestHandler to send the message and handle potential response or error
    await requestHandler(
      // Try to send the chat message with the given message and attached files
      async () =>
        await sendMessage(
          currentChat?._id || "", // Chat ID or empty string if not available
          message, // Actual text message
          attachedFiles // Any attached files
        ),
      null,
      // On successful message sending, clear the message input and attached files, then update the UI
      (res) => {
        setMessage(""); // Clear the message input
        setAttachedFiles([]); // Clear the list of attached files
        dispatch(updateMessages([res.data, ...messages]) as any); // Update messages in the UI
        updateChatLastMessage(currentChat?._id || "", res.data); // Update the last message in the chat
      },

      // If there's an error during the message sending process, raise an alert
      alert
    );
  };

  const handleOnMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the message state with the current input value
    setMessage(e.target.value);
    // If socket doesn't exist or isn't connected, exit the function
    if (!socket) return;

    // Check if the user isn't already set as typing
    if (!selfTyping) {
      // Set the user as typing
      setSelfTyping(true);

      // Emit a typing event to the server for the current chat
      socket.emit(TYPING_EVENT, currentChat?._id);
    }

    // Clear the previous timeout (if exists) to avoid multiple setTimeouts from running
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Define a length of time (in milliseconds) for the typing timeout
    const timerLength = 3000;

    // Set a timeout to stop the typing indication after the timerLength has passed
    typingTimeoutRef.current = setTimeout(() => {
      // Emit a stop typing event to the server for the current chat
      socket.emit(STOP_TYPING_EVENT, currentChat?._id);

      // Reset the user's typing state
      setSelfTyping(false);
    }, timerLength);
  };

  const onConnect = () => {
    setIsConnected(true);
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  /**
   * Handles the "typing" event on the socket.
   */
  const handleOnSocketTyping = (chatId: string) => {
    // Check if the typing event is for the currently active chat.
    if (chatId !== currentChat?._id) return;

    // Set the typing state to true for the current chat.
    setIsTyping(true);
  };

  /**
   * Handles the "stop typing" event on the socket.
   */
  const handleOnSocketStopTyping = (chatId: string) => {
    // Check if the stop typing event is for the currently active chat.
    if (chatId !== currentChat?._id) return;

    // Set the typing state to false for the current chat.
    setIsTyping(false);
  };

  /**
   * Handles the event when a new message is received.
   */
  const onMessageReceived = (message: ChatMessageInterface) => {

    //send notification of new chat message
    addNotification({
      title: "New Message from Wings",
      subtitle: `${message.sender?.username}`,
      message: `${message.content}`,
      duration: 4000,
      icon: wings,
      vibrate: 200,
      backgroundTop:theme.palette.primary.main,
      native: true, // when using native, your OS will handle theming.
      onClick: () => {
        window.focus();
      },
    });
    // Check if the received message belongs to the currently active chat
    if (message?.chat !== currentChat?._id) {
      // If not, update the list of unread messages
      dispatch(updateUnreadMessages([message, ...unreadMessages]) as any);
      // setUnreadMessages((prev) => [message, ...prev]);
    } else {
      // If it belongs to the current chat, update the messages list for the active chat
      // setMessages((prev) => [message, ...prev]);
      dispatch(updateMessages([message, ...messages]) as any);
    }

    // Update the last message for the chat to which the received message belongs
    updateChatLastMessage(message.chat || "", message);
  };

  const onNewChat = (chat: ChatListItemInterface) => {
    dispatch(SetChats((prev: any) => [chat, ...prev]) as any);
  };

  // This function handles the event when a user leaves a chat.
  const onChatLeave = (chat: ChatListItemInterface) => {
    // Check if the chat the user is leaving is the current active chat.
    if (chat._id === currentChat?._id) {
      // If the user is in the group chat they're leaving, close the chat window.
      // Remove the currentChat from local storage.
      dispatch(setCurrentChat(null) as any);
    }
    // Update the chats by removing the chat that the user left.
    dispatch(
      SetChats((prev: any[]) => prev.filter((c) => c._id !== chat._id)) as any
    );
  };

  // Function to handle changes in group name
  const onGroupNameChange = (chat: ChatListItemInterface) => {
    // Check if the chat being changed is the currently active chat
    if (chat._id === currentChat?._id) {
      // Update the current chat with the new details
      // Save the updated chat details to local storage
      dispatch(setCurrentChat(chat) as any);
    }

    // Update the list of chats with the new chat details
    dispatch(
      SetChats((prev: any[]) => [
        // Map through the previous chats
        ...prev.map((c: any) => {
          // If the current chat in the map matches the chat being changed, return the updated chat
          if (c._id === chat._id) {
            return chat;
          }
          // Otherwise, return the chat as-is without any changes
          return c;
        }),
      ]) as any
    );
  };

  useEffect(() => {
    if (currentChat) {
      // If the socket connection exists, emit an event to join the specific chat using its ID.
      socket?.emit(JOIN_CHAT_EVENT, currentChat?._id);
      // Fetch the messages for the current chat.
      getMessages();
    }
    // An empty dependency array ensures this useEffect runs only once, similar to componentDidMount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  // This useEffect handles the setting up and tearing down of socket event listeners.
  useEffect(() => {
    // If the socket isn't initialized, we don't set up listeners.
    if (!socket) return;

    // Set up event listeners for various socket events:
    // Listener for when the socket connects.
    socket.on(CONNECTED_EVENT, onConnect);
    // Listener for when the socket disconnects.
    socket.on(DISCONNECT_EVENT, onDisconnect);
    // Listener for when a user is typing.
    socket.on(TYPING_EVENT, handleOnSocketTyping);
    // Listener for when a user stops typing.
    socket.on(STOP_TYPING_EVENT, handleOnSocketStopTyping);
    // Listener for when a new message is received.
    socket.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);
    // Listener for the initiation of a new chat.
    socket.on(NEW_CHAT_EVENT, onNewChat);
    // Listener for when a user leaves a chat.
    socket.on(LEAVE_CHAT_EVENT, onChatLeave);
    // Listener for when a group's name is updated.
    socket.on(UPDATE_GROUP_NAME_EVENT, onGroupNameChange);

    // When the component using this hook unmounts or if `socket` or `chats` change:
    return () => {
      // Remove all the event listeners we set up to avoid memory leaks and unintended behaviors.
      socket.off(CONNECTED_EVENT, onConnect);
      socket.off(DISCONNECT_EVENT, onDisconnect);
      socket.off(TYPING_EVENT, handleOnSocketTyping);
      socket.off(STOP_TYPING_EVENT, handleOnSocketStopTyping);
      socket.off(MESSAGE_RECEIVED_EVENT, onMessageReceived);
      socket.off(NEW_CHAT_EVENT, onNewChat);
      socket.off(LEAVE_CHAT_EVENT, onChatLeave);
      socket.off(UPDATE_GROUP_NAME_EVENT, onGroupNameChange);
    };

    // Note:
    // The `chats` array is used in the `onMessageReceived` function.
    // We need the latest state value of `chats`. If we don't pass `chats` in the dependency array,
    // the `onMessageReceived` will consider the initial value of the `chats` array, which is empty.
    // This will not cause infinite renders because the functions in the socket are getting mounted and not executed.
    // So, even if some socket callbacks are updating the `chats` state, it's not
    // updating on each `useEffect` call but on each socket call.
  }, [socket, chats]);

  return (
    <Stack
      height={"100%"}
      maxHeight={"100vh"}
      minHeight={"100vh"}
      width={isMobile ? "100vw" : "100%"}
    >
      {/*  */}
      <ChatHeader />
      <Box
        width={"100%"}
        height={"100vh"}
        sx={
          {
            position: "relative",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F0F4FA"
                : theme.palette.background,

            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          } as any
        }
      >
        <SimpleBarStyle timeout={500} clickOnTrack={false}>
          <Conversation menu={true} isMobile={isMobile} />
        </SimpleBarStyle>
      </Box>

      <Stack id="first-name">
        {/*  */}
        <ChatFooter
          value={""}
          handleSendMsg={() => {
            sendChatMessage();
          }}
          onChange={handleOnMessageChange}
          handleFile={(file: any) => {
            setAttachedFiles([...attachedFiles, file]);
          }}
          isTyping={isTyping}
        />
      </Stack>
    </Stack>
  );
};

export default ChatComponent;

export { Conversation };
