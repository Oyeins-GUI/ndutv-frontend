import { BASE_URL } from "@/App";
import { ApiResponse, type Error } from "@/components/AuthProvider";

export type Position = {
   id: string;
   position: string;
   title: string;
   description: string;
};

export async function getPositions() {
   const res = await fetch(`${BASE_URL}/admin/nans-positions`, {
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

export async function addPosition(positionPayload: {
   position: string;
   title: string;
   description: string;
}) {
   const res = await fetch(`${BASE_URL}/admin/nans-positions`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         ...positionPayload,
         position: positionPayload.position.toUpperCase(),
      }),
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.log("failed to add position", error.message);

      throw new Error(error.message);
   }

   const data: ApiResponse<Position[]> = await res.json();
   return data;
}
