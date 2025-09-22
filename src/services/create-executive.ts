import { BASE_URL } from "@/App";
import uploadImage from "./upload-image";
import { ApiResponse } from "@/components/AuthProvider";

export type Executive = {
   name: string;
   email: string;
   matric_number: string;
   position_id: string;
   session_id: string;
   faculty_id: string;
   department_id: string;
   phone_number: string;
   scope: string;
   image: File[] | string;
};

export default async function createExecutive(data: Executive) {
   const file = (data.image as File[])?.[0];
   const imageUrl = file ? await uploadImage(file) : "";

   const executiveData = { ...data, image: imageUrl };

   const res = await fetch(`${BASE_URL}/admin/executives`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(executiveData),
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      throw new Error(error.message);
   }

   return res.json();
}
