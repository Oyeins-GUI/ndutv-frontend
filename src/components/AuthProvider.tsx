import { BASE_URL } from "@/App";
import { AuthContext } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";

type ThemeProviderProps = {
   children: React.ReactNode;
};

export type AuthContextType = {
   login: (data: {
      identifier: string;
      password: string;
      rememberMe: boolean;
   }) => Promise<void>;
   logout: () => Promise<void>;
   user: User | null;
   err: string | null;
   isLoading: boolean;
};

export type User = {
   name: string;
   email: string;
   matric_number: string;
   position_id: string;
   session_id: string;
   faculty_id: string;
   department_id: string;
   phone_number: string;
   scope: "DEPARTMENT" | "FACULTY" | "SUG";
   image_url: string;
};

export type Error = {
   code: string;
   reason: string;
   details: Record<string, unknown>;
};

export type ApiResponse<T> = {
   success: boolean;
   message: string;
   data: T;
};

export function AuthProvider({ children, ...props }: ThemeProviderProps) {
   const [user, setUser] = useState<User | null>(null);
   const [isLoading, setIsLoading] = useState(false);
   const [err, setErr] = useState<string | null>(null);
   const { toast } = useToast();

   async function login(data: {
      identifier: string;
      password: string;
      rememberMe: boolean;
   }) {
      try {
         setIsLoading(true);
         const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         });

         if (!res.ok) {
            const error: ApiResponse<Error> = await res.json();
            setErr(error.message);
            toast({
               title: "Login Failed",
               description: error.message || "Failed to login user",
               variant: "destructive",
            });
            throw new Error(error.message || "Failed to fetch user data");
         }

         const { data: user }: ApiResponse<User> = await res.json();
         setUser(user);
      } catch (error) {
         console.error(error);
         toast({
            title: "Login Failed",
            description: "Internal server error",
            variant: "destructive",
            className: "text-gray-300 border border-gray-300",
         });
      } finally {
         setIsLoading(false);
      }
   }

   async function logout() {
      try {
         const res = await fetch(`${BASE_URL}/auth/logout`, {
            method: "POST",
         });

         if (!res.ok) {
            const error: ApiResponse<Error> = await res.json();
            throw new Error(error.message || "Failed to logout user");
         }

         setUser(null);
      } catch (error) {
         console.error(error);
         throw error;
      }
   }

   return (
      <AuthContext
         {...props}
         value={{
            user,
            login,
            logout,
            err,
            isLoading,
         }}
      >
         {children}
      </AuthContext>
   );
}
