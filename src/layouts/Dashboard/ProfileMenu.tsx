import React from "react";
import { Avatar, Box, Fade, Menu, MenuItem, Stack } from "@mui/material";

import { Profile_Menu } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { AuthInitialState, LogoutUser } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  // const socket = useSocket();
  const { user } = useSelector((state: any) => state.auth as AuthInitialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const user_id = user?._id;

  return (
    <>
      <Avatar
        id="profile-positioned-button"
        aria-controls={openMenu ? "profile-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        alt={user?.username}
        src={user?.pic}
        onClick={handleClick}
        sx={{ width: 32, height: 32 }}
        style={{ cursor: "pointer" }}
      />
      <Menu
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        TransitionComponent={Fade}
        id="profile-positioned-menu"
        aria-labelledby="profile-positioned-button"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={1}>
          <Stack spacing={1}>
            {Profile_Menu.map((el, idx) => (
              <MenuItem onClick={handleClose}>
                <Stack
                  onClick={() => {
                    if (idx === 0) {
                      navigate("/profile");
                    } else if (idx === 1) {
                      navigate("/settings");
                    } else {
                      dispatch(LogoutUser() as any);
                      // socket.emit("end", { user_id });
                    }
                  }}
                  sx={{ width: 100 }}
                  direction="row"
                  alignItems={"center"}
                  justifyContent="space-between"
                >
                  <span>{el.title}</span>
                  {el.icon}
                </Stack>{" "}
              </MenuItem>
            ))}
          </Stack>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileMenu;
