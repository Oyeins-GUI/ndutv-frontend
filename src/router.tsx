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
import Executives from "./pages/admin/Executives";
import SetPassword from "./pages/admin/SetPassword";
import InitPassword from "./pages/admin/InitPassword";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Home />,
   },
   {
      path: "/news/:id",
      element: <NewsDetail />,
   },
   {
      path: "/admin/signin",
      element: <AdminLogin />,
   },
   {
      path: "/admin/set-password",
      element: <SetPassword />,
   },
   {
      path: "/admin/init",
      element: <InitPassword />,
   },
   {
      path: "/admin",
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
               allowedRoles: [
                  "super_admin",
                  "central_exec",
                  "faculty_exec",
                  "department_exec",
               ],
            },
         },
         {
            path: "platform",
            element: <PlatformManagement />,
            handle: { allowedRoles: ["super_admin", "central_exec"] },
         },
         {
            path: "users",
            element: <UserManagement />,
            handle: { allowedRoles: ["super_admin", "central_exec"] },
         },
         {
            path: "content",
            element: <ContentManagement />,
            handle: {
               allowedRoles: [
                  "super_admin",
                  "central_exec",
                  "faculty_exec",
                  "department_exec",
               ],
            },
         },
         {
            path: "executives",
            element: <Executives />,
            handle: { allowedRoles: ["super_admin", "central_exec"] },
         },
         {
            path: "analytics",
            element: <Analytics />,
            handle: { allowedRoles: ["super_admin", "central_exec"] },
         },
         {
            path: "settings",
            element: <Settings />,
            handle: {
               allowedRoles: [
                  "super_admin",
                  "central_exec",
                  "faculty_exec",
                  "department_exec",
               ],
            },
         },
      ],
   },
   {
      path: "*",
      element: <NotFound />,
   },
]);
