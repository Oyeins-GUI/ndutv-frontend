import { BASE_URL } from "@/App";
import AddExecutive from "@/components/AddExecutiveModal";
import { ApiResponse } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";

export default function Executives() {
   useQuery({
      queryKey: ["executives"],
      queryFn: async () => {
         const res = await fetch(`${BASE_URL}/admin/executives/central`, {
            credentials: "include",
         });
         if (!res.ok) {
            const error: ApiResponse<Error> = await res.json();
            // console.error("Error fetching executives:", error);
            throw new Error(error.message || "Failed to fetch executives");
         }
         return res.json();
      },
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

         <p className="text-gray-300">
            Get and display all other sug executives by session here
         </p>
      </div>
   );
}
