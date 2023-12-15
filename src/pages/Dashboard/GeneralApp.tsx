import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";

import { useParams } from "react-router-dom";
// import ChatComponent from "./Conversation";
import Chats from "./Chats";
import Contact from "../../Sections/dashboard/Contact";
import NoChat from "../../Assets/Illiustration/NoChat";
import { useSelector } from "react-redux";
import ChatComponent from "./Conversation";
import Group from "./Group";

const GeneralApp = () => {
  const theme = useTheme();
  const { clientId } = useParams();
  const { sideBar } = useSelector((state: any) => state.app);
  const path = window.location.pathname;

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {path.includes("group") ? <Group /> : <Chats />}
        <Box
          sx={{
            height: "100%",
            width: sideBar.open
              ? `calc(100vw - 330px )`
              : "calc(100vw - 330px )",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#FFF"
                : theme.palette.background.paper,
          }}
        >
          {clientId ? (
            <ChatComponent />
          ) : (
            <Stack
              spacing={2}
              sx={{ height: "100%", width: "100%" }}
              alignItems="center"
              justifyContent={"center"}
            >
              <NoChat />
              <Typography variant="subtitle2">Select a conversation</Typography>
            </Stack>
          )}
        </Box>
        {sideBar.open &&
          (() => {
            switch (sideBar.type) {
              case "CONTACT":
                return <Contact />;
              default:
                break;
            }
          })()}
      </Stack>
    </>
  );
};

export default GeneralApp;
