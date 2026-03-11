import { ApiResponse } from "@/components/AuthProvider";
import { refreshSession } from "@/services/auth";

export async function fetcher(input: RequestInfo, init?: RequestInit) {
   let res = await fetch(input, {
      ...init,
      credentials: "include",
   });

   if (res.status === 401) {
      try {
         await refreshSession();

         return (res = await fetch(input, {
            ...init,
            credentials: "include",
         }));
      } catch (e) {
         console.error("Session expired.", e);
         throw new Error("Session expired");
      }
   }

   return res;
}

export async function fetcherWithAuth(input: RequestInfo, init?: RequestInit) {
   const res = await fetch(input, {
      ...init,
      credentials: "include",
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.error(error.message || "An error occurred while fetching data");
      throw new Error(error.message || "An error occurred while fetching data");
   }

   return res.json();
}
