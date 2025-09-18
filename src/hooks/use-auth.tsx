import { createContext, useContext } from "react";
import { AuthContextType } from "@/components/AuthProvider";

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
   const context = useContext(AuthContext);

   if (context === null)
      throw new Error("useAuth must be used within an AuthContext");

   return context;
};
