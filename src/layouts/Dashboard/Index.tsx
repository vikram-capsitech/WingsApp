import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import useResponsive from "../../Hooks/useResponsive";
import SideNav from "./SideNav";

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const isDesktop = useResponsive("up", "md");
  
  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }
  return (
    <>
      <Stack direction="row">
        {isDesktop && (
          // SideBar
          <SideNav />
        )}
        <Outlet />
      </Stack>
    </>
  );
};
export default DashboardLayout;
