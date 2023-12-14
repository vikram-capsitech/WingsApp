import React from "react";
import {
  Stack,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { DotsThreeVertical, DownloadSimple, Image } from "phosphor-react";
import { Message_options } from "../../Data";
import Embed from "react-embed";
import moment from "moment";
import { useSelector } from "react-redux";

const MessageOption = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <DotsThreeVertical
        size={20}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack spacing={0.5} px={0}>
          {Message_options.map((el:any) => (
            <MenuItem onClick={handleClose} style={{ fontSize: 12 }}>
              {el.title}
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
};

const TextMsg = ({ el, menu }: any) => {
  const theme = useTheme();
  const { user } = useSelector((state: any) => state.auth);
  return (
    <Stack
      style={{
        display: "flex",
        justifyContent: "end",
        alignItems: el.sender?._id !== user?._id ? "flex-start" : "flex-end",
      }}
      spacing={0.8}
    >
      <Stack
        style={{
          display: "flex",
          alignItems: "end",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        {" "}
        <Stack style={{ marginRight: 10, fontSize: 10 }}>
          {el.sender?._id === user?._id ? "You" : el.sender?.username}
        </Stack>
        <Stack style={{ fontSize: 9, color: "#9b9b9b" }}>
          {moment(el.createdAt).add("TIME_ZONE", "hours").fromNow(true)} ago
        </Stack>
      </Stack>
      <Stack
        direction={el.sender?._id !== user?._id ? "row" : "row-reverse"}
        spacing={0.8}
      >
        <Avatar
          title={el.sender.username}
          alt={el.sender.username}
          src={el.sender.pic}
          sx={{ width: 30, height: 30 }}
        />
        <Box
          sx={{
            backgroundColor: el.sender?._id !== user?._id
              ? alpha(theme.palette.background.default, 1)
              : theme.palette.primary.main,
            borderRadius: 1.1,
            width: "max-content",
            display: "flex",
            flexDirection: "row-reverse",
            padding: el.sender?._id !== user?._id ? "3px 0px" : "3px 15px",
            paddingRight: el.sender?._id !== user?._id ? 0 : 0,
            paddingLeft:el.sender?._id !== user?._id ? 1 : 2
          }}
        >
          {menu && <MessageOption />}
          <Typography
            variant="body1"
            color={`${el.sender?._id !== user?._id ? theme.palette.text : "#fff"}`}
          >
            {el.content}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};
const MediaMsg = ({ el, menu }: any) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        px={1.5}
        py={1.5}
        sx={{
          backgroundColor: el.incoming
            ? alpha(theme.palette.background.default, 1)
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <img
            src={el.img}
            alt={el.message}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />
          <Typography
            variant="body2"
            color={`${el.incoming ? theme.palette.text : "#fff"}`}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOption />}
    </Stack>
  );
};
const DocMsg = ({ el, menu }: any) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        px={1.5}
        py={1.5}
        sx={{
          backgroundColor: el.incoming
            ? alpha(theme.palette.background.default, 1)
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Image size={48} />
            <Typography variant="caption">Abstract.png</Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            color={`${el.incoming ? theme.palette.text : "#fff"}`}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOption />}
    </Stack>
  );
};
const LinkMsg = ({ el, menu }: any) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        px={1.5}
        py={1.5}
        sx={{
          backgroundColor: el.incoming
            ? alpha(theme.palette.background.default, 1)
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction="column"
            spacing={3}
            alignItems="start"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Stack direction={"column"} spacing={2}>
              <Embed width={300} isDark url={`https://youtu.be/xoWxBR34qLE`} />
            </Stack>
          </Stack>
          <Typography
            variant="body2"
            color={`${el.incoming ? theme.palette.text : "#fff"}`}
          >
            <div dangerouslySetInnerHTML={{ __html: el.message }}></div>
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOption />}
    </Stack>
  );
};
const ReplyMsg = ({ el, menu }: any) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        px={1.5}
        py={1.5}
        sx={{
          backgroundColor: el.incoming
            ? alpha(theme.palette.background.paper, 1)
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction="column"
            spacing={3}
            alignItems="center"
            sx={{
              backgroundColor: alpha(theme.palette.background.paper, 1),

              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color={`${theme.palette.text}`}>
              {el.message}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color={`${el.incoming ? theme.palette.text : "#fff"}`}
          >
            {el.reply}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOption />}
    </Stack>
  );
};
const Timeline = ({ el }: any) => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems={"center"} justifyContent="space-between">
      <Divider style={{ width: "46%" }} />
      <Typography variant="caption" sx={{ color: theme.palette.text } as any}>
        {el.text}
      </Typography>
      <Divider style={{ width: "46%" }} />
    </Stack>
  );
};

export { Timeline, MediaMsg, LinkMsg, DocMsg, TextMsg, ReplyMsg };
