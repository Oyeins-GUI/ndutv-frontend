import AddExecutive from "@/components/AddExecutiveModal";
import UpdateExecutiveModal from "@/components/admin/UpdateExecutiveModal";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import { getExecutives } from "@/services/create-executive";
import { useQuery } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";

export default function Executives() {
   const { user } = useAuth();
   const { data: executives } = useQuery({
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

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {executives?.data.map((executive) => (
               <Card key={executive.id} className="hover:shadow-md transition">
                  <CardHeader className="flex flex-col items-center text-center">
                     <img
                        src={executive.image_url}
                        alt={executive.name}
                        className="w-20 aspect-square rounded-full object-cover border mb-3"
                     />
                     <CardTitle>{executive.name}</CardTitle>
                     <CardDescription>
                        {executive.position} ({executive.scope}) •{" "}
                        {executive.session}
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                     <p>
                        <span className="font-medium text-foreground">
                           Matric:
                        </span>{" "}
                        {executive.matric_number}
                     </p>
                     <p>
                        <span className="font-medium text-foreground">
                           Faculty:
                        </span>{" "}
                        {executive.faculty}
                     </p>
                     <p>
                        <span className="font-medium text-foreground">
                           Dept:
                        </span>{" "}
                        {executive.deparment}
                     </p>

                     <p>
                        <span className="font-medium text-foreground">
                           Email:
                        </span>{" "}
                        {executive.email}
                     </p>
                     <p>
                        <span className="font-medium text-foreground">
                           Phone:
                        </span>{" "}
                        {executive.phone_number}
                     </p>

                     {(user?.role === "super_admin" ||
                        user?.role === "central_exec") && (
                        <Dialog>
                           <DialogTrigger asChild>
                              <Button size="sm" className="mt-3 w-full">
                                 Edit
                              </Button>
                           </DialogTrigger>
                           <DialogContent className="text-foreground">
                              <DialogTitle>Edit Executive</DialogTitle>
                              <UpdateExecutiveModal executive={executive} />
                           </DialogContent>
                        </Dialog>
                     )}
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   );
}
