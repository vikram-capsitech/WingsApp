import React from "react";
import {
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  CircleDashed,
} from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import BottomNav from "../../layouts/dashboard/BottomNav";
import ChatElement from "../../components/ChatElement";
import { useDispatch, useSelector } from "react-redux";
import { requestHandler } from "../../Utils";
import { createUserChat, getUserChats } from "../../Api";
import { ChatListItemInterface } from "../../Interfaces/chat";
import { FetchChats, SetChats, setCurrentChat } from "../../redux/slices/chat";
import { SearchUserInput } from "../../Components/SearchAsync";

const Chats = () => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");

  const dispatch = useDispatch();

  const { chats } = useSelector((state: any) => state?.chat);

  const getChats = async (userId: any) => {
    requestHandler(
      async () => await getUserChats(),
      null,
      (res) => {
        const { data } = res;
        const cht = data.filter((ch: ChatListItemInterface) => {
          if (ch.participants.find((p: any) => p._id === userId)) {
            return ch;
          }
        });
        dispatch(setCurrentChat(cht[0]) as any);
        dispatch(SetChats(data || []) as any);
      },
      alert
    );
  };

  React.useEffect(() => {
    dispatch(FetchChats() as any);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box
        sx={
          {
            position: "relative",
            height: "100%",
            width: isDesktop ? 280 : "100vw",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,

            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          } as any
        }
      >
        {!isDesktop && (
          // Bottom Nav
          <BottomNav />
        )}

        <Stack p={1} spacing={1} sx={{ maxHeight: "100vh" }}>
          <Stack
            alignItems={"center"}
            justifyContent="space-between"
            direction="row"
          >
            <Typography variant="h5">Chats</Typography>
            <Stack direction={"row"} alignItems="center" spacing={1}>
              <IconButton sx={{ width: "max-content" }}>
                <CircleDashed />
              </IconButton>
            </Stack>
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <Stack>
              <SearchUserInput
                placeholder="Search people, groups, messages"
                onChange={async (newValue: any) => {
                  //if user is creating normal chat just get a single user
                  await requestHandler(
                    // Callback to create a user chat
                    async () => await createUserChat(newValue?.value),
                    null, // Callback to handle loading state
                    // Success callback
                    (res) => {
                      const { data } = res; // Extract data from response
                      // If chat already exists with the selected user
                      if (res.statusCode === 200) {
                        // setSelectedChat(data);
                        dispatch(setCurrentChat(data) as any);
                        return;
                      }
                      getChats(newValue.value);
                      // Execute the onSuccess function with received data
                    },
                    alert // Use the alert as the error handler
                  );
                }}
                style={{ width: 210 }}
              />
            </Stack>
          </Stack>
          <Stack sx={{ flexGrow: 1, height: "100%" }}>
            <Stack spacing={0.5}>
              {/* <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                  Pinned
                </Typography> */}
              <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                All Chats
              </Typography>
              {/* Chat List */}
              {chats.map((el: ChatListItemInterface) => {
                return <ChatElement {...el} />;
              })}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Chats;
