import { BASE_URL } from "@/App";
import uploadImage from "./upload-image";
import { ApiResponse } from "@/components/AuthProvider";

export type Executive = {
   id: string;
   name: string;
   position: string;
   exec_type: string;
   year: string;
   image_url: string;
};

export type ExecutivePayload = {
   name: string;
   position_id: string;
   exec_type: string;
   year: string;
   image_url: File[] | string;
};

export async function getExecutives({
   type,
   year,
}: {
   type: "zonal" | "jcc" | "";
   year: string;
}) {
   const res = await fetch(
      `${BASE_URL}/admin/executives?year=${year || ""}&type=${type || ""}&page=1&limit=10`,
      {
         credentials: "include",
      },
   );

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.log("exec error", error);
      throw new Error(error.message || "Failed to fetch executives");
   }

   const data: ApiResponse<Executive[]> = await res.json();

   return data;
}

export default async function createExecutive(data: ExecutivePayload) {
   const file = (data.image_url as File[])?.[0];
   const imageUrl = file ? await uploadImage(file) : "";

   const executiveData = {
      ...data,
      image_url: imageUrl,
   };

   const res = await fetch(`${BASE_URL}/admin/executives`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(executiveData),
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.error(error);
      throw new Error(error.message);
   }

   return res.json();
}

export async function updateExecutive(data: ExecutivePayload) {
   const file = String(data.image_url)
      ? data.image_url
      : (data.image_url as File[])?.[0];
   const imageUrl =
      typeof data.image_url === "string"
         ? file
         : await uploadImage(file as File);

   const executiveData = {
      ...data,
      image_url: imageUrl,
   };

   const res = await fetch(`${BASE_URL}/admin/executives`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(executiveData),
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.error(error);
      throw new Error(error.message);
   }

   return res.json();
}

export async function deleteExecutive(id: string) {
   const res = await fetch(`${BASE_URL}/admin/executives/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.error(error);
      throw new Error(error.message);
   }

   return res.json();
}
