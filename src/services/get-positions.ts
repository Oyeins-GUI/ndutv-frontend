import { BASE_URL } from "@/App";
import { ApiResponse, type Error } from "@/components/AuthProvider";

type Position = {
   id: string;
   position: string;
   title: string;
   description: string;
};

export default async function getPositions() {
   const res = await fetch(`${BASE_URL}/admin/sug-positions`, {
      credentials: "include",
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.log("positions error", error.message);

      throw new Error(error.message);
   }

   const data: ApiResponse<Position[]> = await res.json();
   return data;
}
