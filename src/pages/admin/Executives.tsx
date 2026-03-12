import AddExecPositionModal from "@/components/AddExecPositionModal";
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
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { deleteExecutive, getExecutives } from "@/services/create-executive";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MoreVertical, Pen, Trash2, UserPlus } from "lucide-react";

export default function Executives() {
   const { data: executives } = useQuery({
      queryKey: ["executives"],
      queryFn: () => getExecutives({ type: "", year: "" }),
      retry: false,
   });

   return (
      <div className="p-6 space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-headline_large font-secondary font-bold text-primary_text">
                  Executives
               </h1>
               <p className="font-primary text-secondary_text">
                  Manage Executives information
               </p>
            </div>

            <div className="flex items-center space-x-2">
               <Dialog>
                  <DialogTrigger asChild>
                     <Button className="gap-2 text-label_small">
                        <PlusIcon className="w-2 h-2" />
                        Executive Position
                     </Button>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-3xl">
                     <DialogTitle>Add Executive Position</DialogTitle>
                     <DialogDescription>
                        Fill in the details to add a new executive position.
                     </DialogDescription>
                     <AddExecPositionModal />
                  </DialogContent>
               </Dialog>

               <Dialog>
                  <DialogTrigger asChild>
                     <Button className="gap-2 text-label_small">
                        <UserPlus className="w-2 h-2" />
                        Add Executive
                     </Button>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-3xl">
                     <DialogTitle>Add Executive</DialogTitle>
                     <DialogDescription>
                        Fill in the details to add a new executive.
                     </DialogDescription>
                     <AddExecutive />
                  </DialogContent>
               </Dialog>
            </div>
         </div>

         <div className="text-foreground">
            <Table>
               <TableHeader>
                  <TableRow className="border-b border-border/40 font-primary">
                     <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                        Image
                     </TableHead>
                     <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                        Name
                     </TableHead>
                     <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                        Position
                     </TableHead>
                     <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                        Year
                     </TableHead>

                     <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                        Actions
                     </TableHead>
                  </TableRow>
               </TableHeader>

               <TableBody>
                  {executives?.success &&
                     executives.data?.map((executive) => (
                        <TableRow key={executive.id}>
                           {/* <TableCell>{executive.image_url}</TableCell> */}
                           <TableCell>
                              <img
                                 src={executive.image_url}
                                 alt={executive.name}
                                 className="w-8 h-8 object-cover rounded-full"
                              />
                           </TableCell>
                           <TableCell>{executive.name}</TableCell>
                           <TableCell>{executive.position}</TableCell>
                           <TableCell>{executive.year}</TableCell>
                           <TableCell>
                              <ActionsMenu id={executive.id} />
                           </TableCell>
                        </TableRow>
                     ))}
               </TableBody>
            </Table>
         </div>
      </div>
   );
}

export function ActionsMenu({ id }: { id: string }) {
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: () => deleteExecutive(id),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["executives"] });
         toast({
            title: "Executive deleted!",
            description: "Deleted successfully",
            className: "bg-gray-300 text-gray-900",
         });
      },
      onError: (error: ApiResponse<Error>) => {
         toast({
            title: "Error",
            description:
               error.message || "Something went wrong. Please try again.",
            variant: "error",
            className: "bg-red-500 text-gray-300 border-none",
         });
      },
   });

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               className="hover:bg-primary_text hover:text-surface"
               variant="ghost"
               size="sm"
            >
               <MoreVertical className="w-4 h-4" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent
            align="end"
            className="bg-primary_text text-background"
         >
            <DropdownMenuItem onSelect={() => console.log(`Editing... ${id}`)}>
               <Pen className="w-4 h-4 mr-2 text-background" /> Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
               className="bg-error/80 text-on_error hover:bg-error"
               onSelect={() => mutation.mutate()}
            >
               <Trash2 className="w-4 h-4 mr-2 text-background" />{" "}
               {mutation.isPending ? "Deleting..." : "Delete"}
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
