import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import {
  CaretLeft,
  Bell,
  Lock,
  Key,
  PencilCircle,
  Image,
  Note,
  Keyboard,
  Info,
} from "phosphor-react";

import { useTheme } from "@mui/material/styles";
import ThemeDialog from "../../../Sections/dashboard/Settings/ThemeDialog";
import ShortcutDialog from "../../../Sections/dashboard/Settings/ShortcutDialog";
import { useSelector } from "react-redux";
import { AuthInitialState } from "../../../redux/slices/auth";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const theme = useTheme();
  const { user } = useSelector((state: any) => state.auth as AuthInitialState);
  const [openTheme, setOpenTheme] = useState(false);
  const navigate = useNavigate();

  const handleOpenTheme = () => {
    setOpenTheme(true);
  };

  const handleCloseTheme = () => {
    setOpenTheme(false);
  };
  const [openShortcuts, setOpenShortcuts] = useState(false);

  const handleOpenShortcuts = () => {
    setOpenShortcuts(true);
  };

  const handleCloseShortcuts = () => {
    setOpenShortcuts(false);
  };

  const list = [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: "Notifications",
      onclick: () => {},
      disable: false,
    },
    {
      key: 1,
      icon: <Lock size={20} color={"gray"} />,
      title: "Privacy",
      onclick: () => {},
      disable: true,
    },
    {
      key: 2,
      icon: <Key size={20} color={"gray"} />,
      title: "Security",
      onclick: () => {},
      disable: true,
    },
    {
      key: 3,
      icon: <PencilCircle size={20} />,
      title: "Theme",
      onclick: handleOpenTheme,
      disable: false,
    },
    {
      key: 4,
      icon: <Image size={20} color={"gray"} />,
      title: "Chat Wallpaper",
      onclick: () => {},
      disable: true,
    },
    {
      key: 5,
      icon: <Note size={20} color={"gray"} />,
      title: "Request Account Info",
      onclick: () => {},
      disable: true,
    },
    {
      key: 6,
      icon: <Keyboard size={20} color={"gray"} />,
      title: "Keyboard Shortcuts",
      onclick: handleOpenShortcuts,
      disable: true,
    },
    {
      key: 7,
      icon: <Info size={20} color={"gray"} />,
      title: "Help",
      onclick: () => {},
      disable: true,
    },
  ];

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* LeftPane */}
        <Box
          sx={
            {
              height: "100vh",
              width: 320,
              backgroundColor:
                theme.palette.mode === "light"
                  ? "#F8FAFF"
                  : theme.palette.background,

              boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            } as any
          }
        >
          <Stack p={3} spacing={3}>
            {/* Header */}
            <Stack direction="row" alignItems={"center"} spacing={2}>
              <IconButton>
                <CaretLeft
                  size={20}
                  color={"#4B4B4B"}
                  onClick={() => {
                    navigate(-1);
                  }}
                />
              </IconButton>

              <Typography variant="h6">Settings</Typography>
            </Stack>

            {/* Profile */}
            <Stack direction="row" spacing={2}>
              <Avatar src={user?.pic} sx={{ height: 56, width: 56 }} />
              <Stack spacing={0.5}>
                <Typography variant={"body1"}>{user?.username}</Typography>
                <Typography variant="body2">{user?.email}</Typography>
              </Stack>
            </Stack>
            {/* List */}
            <Stack spacing={2}>
              {list.map(({ key, icon, title, onclick, disable }) => {
                return (
                  <>
                    <Stack
                      onClick={disable ? () => {} : onclick}
                      sx={{
                        cursor: "pointer",
                      }}
                      spacing={1}
                    >
                      <Stack alignItems={"center"} direction="row" spacing={2}>
                        {icon}
                        <Typography
                          variant="body2"
                          style={{ color: disable ? "gray" : "" }}
                        >
                          {title}
                        </Typography>
                      </Stack>
                      {key !== 7 && <Divider />}
                    </Stack>
                  </>
                );
              })}
            </Stack>
          </Stack>
        </Box>
        {/* Right Pane */}
        <Box
          sx={{
            height: "100%",
            width: "calc(100vw - 420px )",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#FFF"
                : theme.palette.background.paper,
            borderBottom: "6px solid #0162C4",
          }}
        ></Box>
      </Stack>
      {openTheme && (
        <ThemeDialog open={openTheme} handleClose={handleCloseTheme} />
      )}
      {openShortcuts && (
        <ShortcutDialog
          open={openShortcuts}
          handleClose={handleCloseShortcuts}
        />
      )}
    </>
  );
};

export default Settings;
