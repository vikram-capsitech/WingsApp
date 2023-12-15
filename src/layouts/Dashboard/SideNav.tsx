import React from "react";
import { useTheme } from "@mui/material/styles";

import { Box, IconButton, Stack } from "@mui/material";
import AntSwitch from "../../Components/AntSwitch";

import Logo from "../../Assets/Images/wings.svg";

import useSettings from "../../Hooks/useSettings";
import { Nav_Buttons } from "../../Data";

import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UpdateTab } from "../../redux/slices/app";

const getPath = (index: any) => {
  switch (index) {
    case 0:
      return "/app";

    case 1:
      return "/group";

    case 2:
      return "/call";

    case 3:
      return "/settings";

    default:
      break;
  }
};

const SideBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { tab } = useSelector((state: any) => state.app);

  const navigate = useNavigate();
  const { onToggleMode } = useSettings();

  const selectedTab = tab;

  const handleChangeTab = (index: any) => {
    dispatch(UpdateTab({ tab: index }) as any);
    navigate(getPath(index) as any);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: 50,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F0F4FA"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack
        py={0}
        alignItems={"center"}
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        <Stack alignItems={"center"} spacing={4}>
          <Box
            sx={{
              height: 40,
              borderRadius: 1.5,
            }}
            p={1}
          >
            <img src={Logo} alt="Tawk" height={35} width={35} />
          </Box>
          <Stack
            sx={{ width: "max-content" }}
            direction="column"
            alignItems={"center"}
            spacing={3}
          >
            {Nav_Buttons.map((el: any) => {
              return el.index == selectedTab ? (
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                  //   p={1}
                >
                  <IconButton
                    onClick={() => {
                      handleChangeTab(el.index);
                    }}
                    sx={{ width: "max-content", color: "#ffffff" }}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    handleChangeTab(el.index);
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#080707"
                        : theme.palette.text.primary,
                  }}
                >
                  {el.icon}
                </IconButton>
              );
            })}
          </Stack>
        </Stack>
        <Stack spacing={1} mb={1} style={{ alignItems: "center" }}>
          <AntSwitch
            size="small"
            defaultChecked={theme.palette.mode === "dark"}
            onChange={onToggleMode}
          />
          {/* Profile Menu */}
          <ProfileMenu />
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
