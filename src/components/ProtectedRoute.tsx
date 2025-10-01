import { useAuth } from "@/hooks/use-auth";
import { Navigate, useLocation, useMatches } from "react-router";

type RouteHandle = {
   allowedRoles: string[];
};

export default function ProtectedRoute({
   children,
}: {
   children?: React.ReactNode;
}) {
   const { user } = useAuth();
   const location = useLocation();
   const matches = useMatches();

   const currentRoute = matches.find(
      (match) => (match.handle as RouteHandle)?.allowedRoles
   );
   const allowedRoles = (currentRoute?.handle as RouteHandle)?.allowedRoles as
      | string[]
      | undefined;

   // console.log({ currentRoute, allowedRoles, role: user?.role });

   if (user === null) {
      return <Navigate to="/admin/signin" state={{ from: location }} replace />;
   }

   if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/admin/content" replace />;
   }

   return children;
}
