import { BASE_URL } from "@/App";
import uploadImage from "./upload-image";
import { ApiResponse } from "@/components/AuthProvider";

export type Executive = {
   id: string;
   name: string;
   email: string;
   matric_number: string;
   position: string;
   session: string;
   faculty: string;
   department: string;
   phone_number: string;
   scope: string;
   image_url: string;
};

export type ExecutivePayload = {
   name: string;
   email: string;
   matric_number: string;
   position_id: string;
   session_id: string;
   faculty_id: string;
   department_id: string;
   phone_number: string;
   scope: string;
   image_url: File[] | string;
};

export async function getExecutives() {
   const res = await fetch(`${BASE_URL}/admin/executives/central`, {
      credentials: "include",
   });

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

   const executiveData = { ...data, image_url: imageUrl };

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
