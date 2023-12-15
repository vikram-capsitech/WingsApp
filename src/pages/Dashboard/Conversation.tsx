import { Stack, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
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
  updateMessages,
  updateTypeEvent,
  updateUnreadMessages,
} from "../../redux/slices/chat";
import { useParams } from "react-router-dom";
import addNotification from "react-push-notification";
import AxiosService from "../../Api/Service";
import { showSnackbar } from "../../redux/slices/app";
import { io } from "socket.io-client";

const Conversation = ({ isMobile, menu }: any) => {
  const scrollRef = React.useRef<any>();
  const { messages } = useSelector((state: any) => state.chat);

  React.useEffect(() => {
    if (scrollRef)
      (scrollRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }, [scrollRef, messages]);

  return (
    <Box p={isMobile ? 1 : 2}>
      <Stack spacing={2} style={{ height: "73.4dvh" }}>
        {messages.map((el: any) => {
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

let socket: any, selectedChatCompare: any;
const ChatComponent = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const theme = useTheme();
  const { clientId } = useParams();
  const dispatch = useDispatch();
  const [attachedFiles, setAttachedFiles] = React.useState<File[]>([]); // To store files attached to messages
  const { currentChat, unreadMessages, messages, chats } = useSelector(
    (state: any) => state.chat
  );
  const { user } = useSelector((state: any) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isConnected, setIsConnected] = React.useState(false); // For tracking socket connection
  // To keep track of the setTimeout function
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState<any[]>([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const fetchMessages = async () => {
    if (!currentChat) return;
    else {
      setLoading(true);
      await AxiosService.get(`/api/message/${currentChat._id}`, user.token)
        .then((res: any) => {
          if (res.result) {
            setShouldRefresh(true);
            dispatch(updateMessages(res.result) as any);
            setLoading(false);
            socket.emit("join chat", currentChat._id);
          }
        })
        .catch((error: any) => {
          dispatch(
            showSnackbar({ severity: "error", message: error.message }) as any
          );
          setLoading(false);
        });
    }
  };

  const sendMessage = async () => {
    socket.emit("stop typing", currentChat._id);
    const content = {
      content: newMessage,
      chatId: currentChat,
      attachment: attachments.map((file: any) => {
        return file;
      }),
    };
    await AxiosService.postMsg("/api/message", content, user.token)
      .then((res: any) => {
        if (res.result) {
          socket.emit("new message", res.result);
          dispatch(updateMessages([...messages, res.result]) as any);
          socket.emit("join chat", currentChat._id);
        }
      })
      .catch((error: any) => {
        dispatch(
          showSnackbar({ severity: "error", message: error.message }) as any
        );
      });
  };

  useEffect(() => {
    console.log(import.meta.env.VITE_SOCKET_URI);
    socket = io(import.meta.env.VITE_SOCKET_URI ?? "");
    socket.emit("setup", user);
    socket.on("connected", (userId: any) => {
      setSocketConnected(true);
    });

    socket.on("typing", (user: any) => {
      const updatedChat = chats.map((c: any) => {
        if (c._id === user) {
          return {
            ...c,
            isTyping: true,
          };
        } else {
          return c;
        }
      });
      const currentUpdate = { ...currentChat, isTyping: true };

      dispatch(updateTypeEvent(updatedChat, currentUpdate) as any);
      setIsTyping(true);
    });

    socket.on("stop typing", (user: any) => {
      const updatedChat = chats.map((c: any) => {
        if (c._id === user) {
          return {
            ...c,
            isTyping: false,
          };
        } else {
          return c;
        }
      });
      const currentUpdate = { ...currentChat, isTyping: false };

      dispatch(updateTypeEvent(updatedChat, currentUpdate) as any);
      setIsTyping(false);
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = currentChat;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat, clientId]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved: any) => {
      //send notification of new chat message
      addNotification({
        title: "New Message from Wings",
        message: `${newMessageRecieved.content}`,
        duration: 4000,
        icon: `${newMessageRecieved?.owner?.pic}`,
        vibrate: 200,
        backgroundTop: theme.palette.primary.main,
        native: true, // when using native, your OS will handle theming.
        onClick: () => {
          window.focus();
        },
      });
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!unreadMessages.includes(newMessageRecieved)) {
          dispatch(
            updateUnreadMessages([newMessageRecieved, ...unreadMessages]) as any
          );
        }
      }
    });
  });

  const typingHandler = (e: any, value: any) => {
    setNewMessage(value ?? e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", currentChat._id);
    }
    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", currentChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

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
          handleSendMsg={sendMessage}
          onChange={(e, value) => {
            typingHandler(e, value);
          }}
          handleFile={(file: any) => {
            setAttachedFiles([...attachedFiles, file]);
          }}
          isTyping={istyping}
        />
      </Stack>
    </Stack>
  );
};

export default ChatComponent;

export { Conversation };
