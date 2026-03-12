import Home from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";
import AdminLogin from "./pages/admin/AdminLogin";
import NotFound from "./pages/NotFound";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import Overview from "./pages/admin/Overview";
import PlatformManagement from "./pages/admin/PlatformManagement";
import UserManagement from "./pages/admin/UserManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import { SidebarProvider } from "./components/ui/sidebar";
import Executives from "./pages/Executives";
import AdminExecutives from "./pages/admin/Executives";
import SetPassword from "./pages/admin/SetPassword";
import Zonal from "./pages/Zonal";
import National from "./pages/National";
import RootLayout from "./root-layout";
import InitPassword from "./pages/admin/InitPassword";
import AllArticles from "./pages/AllArticles";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <RootLayout />,
      children: [
         {
            index: true,
            element: <Home />,
         },
         {
            path: "news",
            element: <AllArticles />,
         },
         {
            path: "zonal",
            element: <Zonal />,
         },
         {
            path: "zonal/:id",
            element: <NewsDetail />,
         },
         {
            path: "national",
            element: <National />,
         },
         {
            path: "national/:id",
            element: <NewsDetail />,
         },
         {
            path: "executives",
            element: null,
            children: [
               {
                  path: "zonal",
                  element: <Executives type="zonal" />,
               },
               {
                  path: "jcc",
                  element: <Executives type="jcc" />,
               },
            ],
         },
         {
            path: "jysq/admin/signin",
            element: <AdminLogin />,
         },
         {
            path: "jysq/admin/new",
            element: <SetPassword />,
         },
         {
            path: "/jysq/admin/init",
            element: <InitPassword />,
         },
         {
            path: "jysq/admin",
            element: (
               <ProtectedRoute>
                  <SidebarProvider>
                     <AdminLayout />
                  </SidebarProvider>
               </ProtectedRoute>
            ),
            children: [
               {
                  path: "dashboard",
                  element: <Overview />,
                  handle: {
                     allowedRoles: ["super_admin", "basic_admin"],
                  },
               },
               {
                  path: "platform",
                  element: <PlatformManagement />,
                  handle: { allowedRoles: ["super_admin"] },
               },
               {
                  path: "users",
                  element: <UserManagement />,
                  handle: { allowedRoles: ["super_admin"] },
               },
               {
                  path: "content",
                  element: <ContentManagement />,
                  handle: {
                     allowedRoles: ["super_admin", "basic_admin"],
                  },
               },
               {
                  path: "executives",
                  element: <AdminExecutives />,
                  handle: { allowedRoles: ["super_admin"] },
               },
               {
                  path: "analytics",
                  element: <Analytics />,
                  handle: { allowedRoles: ["super_admin", "basic_admin"] },
               },
               {
                  path: "settings",
                  element: <Settings />,
                  handle: {
                     allowedRoles: ["super_admin", "basic_admin"],
                  },
               },
            ],
         },
         {
            path: "*",
            element: <NotFound />,
         },
      ],
   },
]);
