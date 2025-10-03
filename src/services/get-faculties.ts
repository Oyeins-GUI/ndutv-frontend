import { BASE_URL } from "@/App";
import { ApiResponse, type Error } from "@/components/AuthProvider";

type Faculty = {
   id: string;
   faculty: string;
   departments: string[] | [];
};

export default async function getFaculties() {
   const res = await fetch(`${BASE_URL}/faculties`, {
      credentials: "include",
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      throw new Error(error.message);
   }

   const data: ApiResponse<Faculty[]> = await res.json();
   return data;
}
