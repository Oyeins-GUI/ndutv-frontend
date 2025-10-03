import AddExecutive from "@/components/AddExecutiveModal";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { getExecutives } from "@/services/create-executive";
import { useQuery } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";

export default function Executives() {
   useQuery({
      queryKey: ["executives"],
      queryFn: getExecutives,
      retry: false,
   });

   return (
      <div className="p-6 space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold text-foreground">
                  Executives
               </h1>
               <p className="text-muted-foreground mt-2">
                  Manage Executives information
               </p>
            </div>

            <Dialog>
               <DialogTrigger asChild>
                  <Button className="gap-2">
                     <UserPlus className="w-4 h-4" />
                     Add Executive
                  </Button>
               </DialogTrigger>
               <DialogContent className="w-full max-w-3xl">
                  <DialogTitle></DialogTitle>
                  <DialogDescription></DialogDescription>
                  <AddExecutive />
               </DialogContent>
            </Dialog>
         </div>

         {/* <StudentsBySession data={students} /> */}
      </div>
   );
}

// const students = [
//    {
//       name: "John Doe",
//       email: "john.doe@ndu.edu.ng",
//       matric_number: "UG/00/1111",
//       phone_number: "08012345678",
//       session: "2024/2025",
//    },
//    {
//       name: "Sarah Williams",
//       email: "sarah.williams@ndu.edu.ng",
//       matric_number: "UG/00/4444",
//       phone_number: "08076543210",
//       session: "2024/2025",
//    },
//    {
//       name: "Super Admin",
//       email: "admin@ndu.edu.ng",
//       matric_number: "UG/00/0001",
//       phone_number: "08000000000",
//       session: "2025/2026",
//    },
// ];

// type Student = {
//    name: string;
//    email: string;
//    matric_number: string;
//    phone_number: string;
//    session: string;
// };

// type Props = {
//    data: Student[];
// };

// export function StudentsBySession({ data }: Props) {
//    // group students by session
//    const grouped = data.reduce((acc: Record<string, Student[]>, student) => {
//       if (!acc[student.session]) {
//          acc[student.session] = [];
//       }
//       acc[student.session].push(student);
//       return acc;
//    }, {});

//    return (
//       <div className="space-y-6">
//          {Object.entries(grouped).map(([session, students]) => (
//             <div key={session} className="border p-4 rounded-lg shadow-sm">
//                <h2 className="text-lg font-semibold mb-2">{session}</h2>
//                <ul className="space-y-2">
//                   {students.map((s, idx) => (
//                      <li
//                         key={idx}
//                         className="p-2 border rounded-md flex flex-col sm:flex-row sm:justify-between"
//                      >
//                         <div>
//                            <p className="font-medium">{s.name}</p>
//                            <p className="text-sm text-gray-500">
//                               {s.matric_number}
//                            </p>
//                         </div>
//                         <div className="text-sm text-gray-600">
//                            <p>{s.email}</p>
//                            <p>{s.phone_number}</p>
//                         </div>
//                      </li>
//                   ))}
//                </ul>
//             </div>
//          ))}
//       </div>
//    );
// }
