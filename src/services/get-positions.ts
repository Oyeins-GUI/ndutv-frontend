import { BASE_URL } from "@/App";
import { ApiResponse, type Error } from "@/components/AuthProvider";

export default async function getPositions() {
   const res = await fetch(`${BASE_URL}/admin/sug-positions`, {
      credentials: "include",
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      throw new Error(error.message);
   }

   const data: ApiResponse<unknown> = await res.json();
   return data;
}
