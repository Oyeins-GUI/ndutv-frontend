import AddExecPositionModal from "@/components/AddExecPositionModal";
import AddExecutive from "@/components/AddExecutiveModal";
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
import { getExecutives } from "@/services/create-executive";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { MoreVertical, Pen, Trash2, UserPlus } from "lucide-react";

export default function Executives() {
   const { data: executives } = useQuery({
      queryKey: ["executives"],
      queryFn: getExecutives,
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
                              <ActionsMenu />
                           </TableCell>
                        </TableRow>
                     ))}
               </TableBody>
            </Table>
         </div>
      </div>
   );
}

export function ActionsMenu() {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
               <MoreVertical className="w-4 h-4" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => console.log("Editing...")}>
               <Pen className="w-4 h-4 mr-2 text-gray-300" /> Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onSelect={() => console.log("Delete")}>
               <Trash2 className="w-4 h-4 mr-2 text-red-500" /> Delete
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
