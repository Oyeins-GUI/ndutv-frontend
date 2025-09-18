import { redirect } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/App";

export type User = { id: string; email: string; role: string; faculty: string };

export async function adminDashboardLoader() {
   const {
      data: user,
      isLoading,
      isError,
   } = useQuery({
      queryKey: ["admin-user"],
      queryFn: async () => {
         const res = await fetch(`${BASE_URL}/login`);
         return await res.json();
      },
   });

   if (isError) {
      throw redirect("/admin/login");
   }

   return { user, isLoading };
}
