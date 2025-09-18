import Home from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import NewAdmin from "./components/NewAdmin";

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
      path: "admin/dashboard",
      element: (
         <ProtectedRoute>
            <AdminDashboard />
         </ProtectedRoute>
      ),
   },
   {
      path: "admin/new",
      element: (
         <ProtectedRoute>
            <NewAdmin />
         </ProtectedRoute>
      ),
   },
   {
      path: "*",
      element: <NotFound />,
   },
]);
