import { BASE_URL } from "@/App";
import { ApiResponse, LoginPayload, User } from "@/components/AuthProvider";
import { fetcher } from "@/lib/fetcher";

export async function refreshSession() {
   const res = await fetch("/auth/refresh", {
      method: "POST",
      credentials: "include",
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.error(error.message || "Failed to refresh session");
      throw new Error("Failed to refresh session");
   }

   return res.json();
}

export async function getUser(): Promise<User | null> {
   const res = await fetcher(`${BASE_URL}/auth/me`, {
      method: "POST",
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.error(error.message || "Failed to fetch user data");
      return null;
   }

   const { data }: ApiResponse<User> = await res.json();
   return data;
}

export async function login(loginData: LoginPayload) {
   const res = await fetcher(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      throw new Error(error.message || "Failed to fetch user data");
   }

   const data: ApiResponse<User> = await res.json();
   return data;
}

export async function logout() {
   const res = await fetcher(`${BASE_URL}/auth/logout`, {
      method: "POST",
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      throw new Error(error.message || "Failed to logout user");
   }
}
