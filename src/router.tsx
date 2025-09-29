import Home from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";
import AdminLogin from "./pages/AdminLogin";
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
      path: "/admin",
      element: (
         <ProtectedRoute allowedRoles={["admin"]}>
            <SidebarProvider>
               <AdminLayout />
            </SidebarProvider>
         </ProtectedRoute>
      ),
      children: [
         {
            path: "dashboard",
            element: <Overview />,
         },
         {
            path: "platform",
            element: <PlatformManagement />,
         },
         {
            path: "users",
            element: <UserManagement />,
         },
         {
            path: "content",
            element: <ContentManagement />,
         },
         {
            path: "analytics",
            element: <Analytics />,
         },
         {
            path: "settings",
            element: <Settings />,
         },
      ],
   },
   {
      path: "*",
      element: <NotFound />,
   },
]);
