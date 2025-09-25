import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router";

export default function ProtectedRoute({
   children,
}: {
   allowedRoles?: string[];
   children?: React.ReactNode;
}) {
   const { user } = useAuth();

   return user === null ? <Navigate to="/admin/signin" replace /> : children;
}
