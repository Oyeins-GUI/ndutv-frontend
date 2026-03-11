import { refreshSession } from "@/services/auth";

export async function fetcher(input: RequestInfo, init?: RequestInit) {
   let res = await fetch(input, {
      ...init,
      headers: {
         "Content-Type": "application/json",
      },
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
