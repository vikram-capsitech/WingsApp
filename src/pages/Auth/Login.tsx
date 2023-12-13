// sections
import { Stack, Typography } from "@mui/material";
import AuthSocial from "../../sections/auth/AuthSocial";
import Login from "../../sections/auth/LoginForm";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative",alignItems:'center' }}>
        <Typography variant="h4">Login to Wings</Typography>
      </Stack>
      {/* Form */}
      <Login />

      <AuthSocial />
    </>
  );
}
