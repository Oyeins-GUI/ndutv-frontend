import { BASE_URL } from "@/App";
import { ApiResponse, type Error } from "@/components/AuthProvider";
import { toast } from "@/hooks/use-toast";
import { PlatformConfig } from "@/pages/admin/PlatformManagement";

export async function getPlatformConfig() {
   const res = await fetch(`${BASE_URL}/admin/platform-config`, {
      credentials: "include",
   });
   if (!res.ok) {
      throw new Error("Failed to fetch platform settings");
   }
   const { data }: ApiResponse<PlatformConfig> = await res.json();
   return data;
}

export async function updatePlatformConfig(config: PlatformConfig) {
   const res = await fetch(`${BASE_URL}/admin/platform-config`, {
      method: "PATCH",
      credentials: "include",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
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
   const data: ApiResponse<PlatformConfig> = await res.json();
   return data;
}
