import { AuthContext } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { getUser, login, logout } from "@/services/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

export type AuthContextType = {
   login: (data: LoginPayload) => Promise<ApiResponse<User>>;
   logout: () => Promise<void>;
   user: User | null;
   isLoading: boolean;
};

export type User = {
   name: string;
   email: string;
   matric_number: string;
   position: string;
   role: UserRole;
   faculty: string;
   department: string;
   scope: UserScope;
   last_login_at: string | null;
};

export type UserRole =
   | "super_admin"
   | "central_exec"
   | "faculty_exec"
   | "department_exec";
export type UserScope = "DEPARTMENT" | "FACULTY" | "CENTRAL";

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

export type LoginPayload = {
   identifier: string;
   password: string;
   remember_me: boolean;
};

export function AuthProvider({
   children,
   ...props
}: {
   children: React.ReactNode;
}) {
   const { toast } = useToast();
   const queryClient = useQueryClient();

   const { data: user, isLoading } = useQuery<User | null>({
      queryKey: ["user"],
      queryFn: getUser,
      staleTime: 5 * 60,
      retry: false,
   });

   const loginMutation = useMutation({
      mutationFn: login,
      onSuccess: (data: ApiResponse<User>) => {
         queryClient.setQueryData(["user"], data.data);
         queryClient.invalidateQueries({ queryKey: ["user"] });
         toast({
            title: "Login Successful",
            description: data.message,
         });
      },
      onError: (error: ApiResponse<Error>) => {
         toast({
            title: "Login Failed",
            description: error.message || "Something went wrong",
            variant: "error",
         });
      },
   });

   const logoutMutation = useMutation({
      mutationFn: logout,
      onSuccess: () => {
         queryClient.setQueryData(["user"], null);
      },
      onError: (error: ApiResponse<Error>) => {
         toast({
            title: "Logout Failed",
            description: error.message || "Something went wrong",
            variant: "error",
            className: "border border-red-500 text-gray-300",
         });
      },
   });

   return (
      <AuthContext
         {...props}
         value={{
            user: user ?? null,
            login: loginMutation.mutateAsync,
            logout: logoutMutation.mutateAsync,
            isLoading: loginMutation.isPending || isLoading,
         }}
      >
         {children}
      </AuthContext>
   );
}
