import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Plus } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import ChatElement from "../../Components/ChatElement";
import CreateGroup from "../../Sections/dashboard/CreateGroup";
import { useSelector } from "react-redux";
import { FetchChats } from "../../redux/slices/chat";
import { dispatch } from "../../redux/store";
import useResponsive from "../../Hooks/useResponsive";
import BottomNav from "../../layouts/Dashboard/BottomNav";
import { useNavigate } from "react-router-dom";

const Group = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { groups } = useSelector((state: any) => state?.chat);
  const navigate = useNavigate();
  const isDesktop = useResponsive("up", "md");

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const theme = useTheme();

  React.useEffect(() => {
    dispatch(FetchChats() as any);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left */}

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
              <Typography variant="h5">Groups</Typography>
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Stack>
                {/* <SearchUserInput
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
                          navigate(`/app/${data?._id}`);
                          return;
                        }
                        getChats(newValue.value);
                        // Execute the onSuccess function with received data
                      },
                      alert // Use the alert as the error handler
                    );
                  }}
                  style={{ width: 210 }}
                /> */}
              </Stack>
            </Stack>
            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
            >
              <Typography variant="subtitle2" sx={{}}>
                Create New Group
              </Typography>
              <IconButton onClick={handleOpenDialog}>
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack sx={{ flexGrow: 1, height: "100%" }}>
                <Stack spacing={0.5}>
                  <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                    All Groups
                  </Typography>
                  {/* Chat List */}
                  {groups.map((el: any) => {
                    return <ChatElement {...el} />;
                  })}
                </Stack>
            </Stack>
          </Stack>
        </Box>

        {/* Right */}
      </Stack>
      {openDialog && (
        <CreateGroup open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Group;