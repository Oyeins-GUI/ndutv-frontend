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

   // if (isLoading) {
   //    return (
   //       <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
   //          <div className="w-9 aspect-square rounded-full border-4 border-primary_text border-t-transparent animate-spin"></div>
   //       </div>
   //    );
   // }

   const currentRoute = matches.find(
      (match) => (match.handle as RouteHandle)?.allowedRoles,
   );
   const allowedRoles = (currentRoute?.handle as RouteHandle)
      ?.allowedRoles as string[];

   if (user === null) {
      return (
         <Navigate to="/jysq/admin/signin" state={{ from: location }} replace />
      );
   }

   if (allowedRoles && !allowedRoles?.includes(user.role)) {
      return <Navigate to="/jysq/admin/content" replace />;
   }

   return children;
}
