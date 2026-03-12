import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { ParishDashboard } from "./pages/ParishDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ParishLogin } from "./pages/ParishLogin";
import { RegisterParish } from "./pages/RegisterParish";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/register-parish",
    Component: RegisterParish,
  },
  {
    path: "/parish-login",
    Component: ParishLogin,
  },
  {
    path: "/parish",
    Component: ParishDashboard,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
]);
