import React from "react";
import { Box, Stack, Avatar, Typography } from "@mui/material";
import { styled, useTheme, alpha } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
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

const GroupElement = (chat: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        navigate(`/group/${chat?._id}`);
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
      p={0.3}
      m={0.5}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
        padding={"0px 4px"}
      >
        <Stack direction="row" spacing={1} alignItems={"center"}>
          {" "}
          <Avatar
            variant="rounded"
            alt={chat.name}
            src={chat.pic ?? ""}
            sx={{ width: 28, height: 28 }}
          />
          <Stack spacing={0.1}>
            <Typography
              // sx={{ color: "#676667" }}
              style={{ fontSize: 13, fontWeight: 600 }}
            >
              {truncateText(chat.name, 16)}
            </Typography>
            <Typography
              sx={{ fontWeight: 500, fontSize: 12 }}
              variant="caption"
            >
              {chat.users.length - 1 + "Members"}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={0.4} alignItems={"end"}>
          <Typography sx={{ fontWeight: 500, fontSize: 12 }} variant="caption">
            {moment(chat.updatedAt).add("TIME_ZONE", "hours").fromNow(true)}
          </Typography>
          {/* <Badge className="unread-count" color="primary" badgeContent={9} variant="dot" /> */}
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export default GroupElement;
