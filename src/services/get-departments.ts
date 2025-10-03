import { BASE_URL } from "@/App";
import { ApiResponse, type Error } from "@/components/AuthProvider";

type Department = {
   id: string;
   department: string;
};

export default async function getDepartments(facultyId: string) {
   const res = await fetch(`${BASE_URL}/departments?faculty_id=${facultyId}`, {
      credentials: "include",
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      throw new Error(error.message);
   }

   const { data }: ApiResponse<Department[]> = await res.json();
   return data;
}
