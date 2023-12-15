import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { CircleDashed } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../Hooks/useResponsive";
import BottomNav from "../../layouts/Dashboard/BottomNav";
import ChatElement from "../../Components/ChatElement";
import { useDispatch, useSelector } from "react-redux";
import { ChatListItemInterface } from "../../Interfaces/chat";
import { FetchChats, SetChats, setCurrentChat } from "../../redux/slices/chat";
import { SearchUserInput } from "../../Components/SearchAsync";
import { useNavigate } from "react-router-dom";
import AxiosService from "../../Api/Service";
import { showSnackbar } from "../../redux/slices/app";

const Chats = () => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state?.auth);
  const { chats } = useSelector((state: any) => state?.chat);

  const accessChat = async (userId: any) => {
    await AxiosService.post(`/api/chat`, { userId }, user.token)
      .then((res: any) => {
        if (res.result) {
          if (!chats?.find((c: any) => c._id === res.result?._id))
            dispatch(SetChats([res.result, ...chats] || []) as any);
          dispatch(setCurrentChat(res.result) as any);
          navigate(`/app/${res.result?._id}`);
        }
      })
      .catch((error: any) => {
        console.error(error.message);
        dispatch(
          showSnackbar({ severity: "error", message: error.message }) as any
        );
      });
  };

  React.useEffect(() => {
    dispatch(FetchChats(user.token) as any);
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
                  accessChat(newValue.value);
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
              {chats?.map((el: ChatListItemInterface) => {
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
