import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "../layouts/Dashboard";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
import AuthLayout from "../layouts/auth";

const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [{ path: "login", element: <LoginPage /> }],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        {
          path: "app",
          element: <GeneralApp />,
        },
        // { path: "group", element: <Group /> },
        { path: "settings", element: <Settings /> },
        { path: "conversation/:clientId", element: <Conversation/> },
        { path: "chats", element: <Chats /> },
        { path: "contact", element: <Contact /> },
        { path: "profile", element: <Profile /> },

        // {path: "call", element: <CallPage />},

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);
const Conversation = Loadable(
  lazy(() => import("../pages/dashboard/Conversation"))
);
const Chats = Loadable(lazy(() => import("../pages/dashboard/Chats")));
const Contact = Loadable(lazy(() => import("../sections/dashboard/Contact")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));

const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));

// // Settings
const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));
const Profile = Loadable(
  lazy(() => import("../pages/dashboard/Settings/Profile"))
);
