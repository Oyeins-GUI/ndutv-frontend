import { BASE_URL } from "@/App";
import { ApiResponse, type Error } from "@/components/AuthProvider";
import { toast } from "@/hooks/use-toast";

export type AdminData = {
   executive_id: string;
   role_id: string;
};

export async function initAdmin(credentials: {
   email: string;
   matric_number: string;
}) {
   const res = await fetch(`${BASE_URL}/auth/password/set/init`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.error(error);
      toast({
         title: "Error",
         description: error.message,
         variant: "error",
      });
      throw new Error(error.message);
   }

   const data: ApiResponse<{ email: string; matric_number: string }> =
      await res.json();

   return data;
}

export async function setPassword(credentials: {
   token: string;
   password: string;
}) {
   const res = await fetch(`${BASE_URL}/auth/password/set/confirm`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.error(error);
      toast({
         title: "Error",
         description:
            error.message || "Failed to set password. Please try again",
         variant: "error",
      });
      throw new Error(error.message);
   }

   const data: ApiResponse<{ token: string; password: string }> =
      await res.json();

   return data;
}

export default async function addAdmin(adminData: AdminData) {
   const res = await fetch(`${BASE_URL}/admin`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminData),
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.error(error);
      toast({
         title: "Error",
         description: error.message || "Failed to add admin",
         variant: "error",
      });
      throw new Error(error.message);
   }

   const data: ApiResponse<AdminData> = await res.json();

   return data;
}

export function deleteAdmin(adminId: string) {
   return adminId;
}
