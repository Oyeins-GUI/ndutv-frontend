import { AuthContext } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { login, logout } from "@/services/auth";
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

   const { data: user } = useQuery<User | null>({
      queryKey: ["user"],
      // queryFn: getUser,
      queryFn: async () => null,
      retry: false,
   });

   const loginMutation = useMutation({
      mutationFn: login,
      onSuccess: (data: ApiResponse<User>) => {
         queryClient.setQueryData(["user"], data.data);
         toast({
            title: "Login Successful",
            description: `${data.message}`,
            className: "border text-gray-300",
         });
      },
      onError: (error: ApiResponse<Error>) => {
         toast({
            title: "Login Failed",
            description: error.message || "Something went wrong",
            variant: "destructive",
            className: "border border-red-500 text-gray-300",
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
            variant: "destructive",
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
            isLoading: loginMutation.isPending,
         }}
      >
         {children}
      </AuthContext>
   );
}
