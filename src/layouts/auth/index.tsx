import React from "react";
import { Container, Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";

import Logo from "../../Assets/Images/wings.svg";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { isLoggedIn } = useSelector((state:any) => state.auth);

  if (isLoggedIn) {
    return <Navigate to={"/app"} />;
  }

  return (
    <>
      <Container sx={{ mt:20 }} maxWidth="xs">
        <Stack spacing={2}>
          <Stack
            sx={{ width: "100%" }}
            direction="column"
            alignItems={"center"}
          >
            <img style={{ height: 80, width: 80 }} src={Logo} alt="Logo" />
          </Stack>
          <Outlet />
        </Stack>
      </Container>
    </>
  );
};

export default AuthLayout;
