import React from "react";
import { Box, Badge, Stack, Avatar, Typography } from "@mui/material";
import { styled, useTheme, alpha } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { ChatListItemInterface } from "../Interfaces/chat";
import { getChatObjectMetadata } from "../Utils";
import { AuthInitialState } from "../redux/slices/auth";
import moment from "moment";
import { setCurrentChat } from "../redux/slices/chat";
import { useNavigate } from "react-router-dom";
// import { SelectConversation } from "../redux/slices/app";

const truncateText = (string: any, n: any) => {
  return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

const StyledChatBox = styled(Box)(() => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    zIndex:0,
    top:18,
    right:5,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ChatElement = (chat: ChatListItemInterface) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth as AuthInitialState);
  const { currentChat } = useSelector((state: any) => state.chat);

  const selectedChatId = currentChat?._id?.toString();

  let isSelected = selectedChatId === chat._id;

  if (!selectedChatId) {
    isSelected = false;
  }

  const theme = useTheme();

  return (
    <StyledChatBox
      onClick={() => {
        dispatch(setCurrentChat(chat) as any);
        navigate(`/app/${chat?._id}`)
      }}
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: isSelected
          ? theme.palette.mode === "light"
            ? alpha(theme.palette.primary.main, 0.5)
            : theme.palette.primary.main
          : theme.palette.mode === "light"
          ? "#fff"
          : theme.palette.background.paper,
      }}
      p={0.7}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1} alignItems={"center"}>
          {" "}
          {chat._id === currentChat?._id ? (
            <StyledBadge
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt={getChatObjectMetadata(chat, user!).title}
                src={getChatObjectMetadata(chat, user!).avatar ?? ""}
                sx={{ width: 30, height: 30 }}
              />
            </StyledBadge>
          ) : (
            <Avatar
              variant="rounded"
              alt={getChatObjectMetadata(chat, user!).title}
              src={getChatObjectMetadata(chat, user!).avatar ?? ""}
              sx={{ width: 28, height: 28 }}
            />
          )}
          <Stack spacing={0.1}>
            <Typography
              // sx={{ color: "#676667" }}
              style={{ fontSize: 13, fontWeight: 600 }}
            >
              {truncateText(getChatObjectMetadata(chat, user!).title, 16)}
            </Typography>
            {getChatObjectMetadata(chat, user!).lastMessage && (
              <Typography variant="caption">
                {truncateText(
                  getChatObjectMetadata(chat, user!).lastMessage,
                  20
                )}
              </Typography>
            )}
          </Stack>
        </Stack>
        <Stack spacing={1} alignItems={"end"}>
          <Typography sx={{ fontWeight: 500, fontSize: 12 }} variant="caption">
            {moment(chat.updatedAt).add("TIME_ZONE", "hours").fromNow(true)}
          </Typography>
          {/* <Badge className="unread-count" color="primary" badgeContent={9} variant="dot" /> */}
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export default ChatElement;
