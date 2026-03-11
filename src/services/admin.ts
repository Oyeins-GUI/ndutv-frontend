import { BASE_URL } from "@/App";
import { ApiResponse, type Error } from "@/components/AuthProvider";
import { toast } from "@/hooks/use-toast";

export type AdminData = {
   email: string;
   name: string;
   role: string;
   is_admin_enabled: string;
   last_login_at: string;
};

export type AdminPayload = {
   email: string;
   name: string;
   role_id: string;
};

export async function getAdmins() {
   const res = await fetch(`${BASE_URL}/admin`, {
      credentials: "include",
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.error(error);
      throw new Error(error.message || "Failed to fetch admins");
   }

   const data: ApiResponse<AdminData[]> = await res.json();

   return data;
}

export async function initAdmin(credentials: Pick<AdminData, "email">) {
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

   const data: ApiResponse<{ email: string; role: string }> = await res.json();

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

   const data: ApiResponse<{
      token: string;
      username: string;
      password: string;
   }> = await res.json();

   return data;
}

export default async function addAdmin(adminData: AdminPayload) {
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
