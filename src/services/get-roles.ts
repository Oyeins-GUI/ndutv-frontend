import { BASE_URL } from "@/App";
import { ApiResponse, type Error } from "@/components/AuthProvider";

type Role = {
   id: string;
   role: string;
   description: string;
};

export async function getRoles() {
   const res = await fetch(`${BASE_URL}/admin/roles`, {
      credentials: "include",
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.log("role error", error);
      throw new Error(error.message || "Failed to fetch executives");
   }

   const data: ApiResponse<Role[]> = await res.json();

   return data;
}
