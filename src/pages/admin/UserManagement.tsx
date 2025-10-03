import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import {
   Table,
   TableBody,
   // TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import {
   Search,
   UserPlus,
   MoreVertical,
   Trash2,
   Ban,
   Save,
} from "lucide-react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getExecutives } from "@/services/create-executive";
import { getRoles } from "@/services/get-roles";
// import { getRoleBadgeVariant } from "@/utils/badge-variant";
import addAdmin, { AdminData } from "@/services/admin";
import { ApiResponse, type Error } from "@/components/AuthProvider";
import { toast } from "@/hooks/use-toast";

const UserManagement = () => {
   const queryClient = useQueryClient();
   const { data: executives, isPending: isExecutivesPending } = useQuery({
      queryKey: ["executives"],
      queryFn: getExecutives,
   });
   const { data: roles, isPending: isRolesPending } = useQuery({
      queryKey: ["roles"],
      queryFn: getRoles,
   });

   const { handleSubmit, control } = useForm<{
      executive_id: string;
      role_id: string;
   }>({
      defaultValues: {
         executive_id: "",
         role_id: "",
      },
   });

   const mutation = useMutation({
      mutationFn: addAdmin,
      onSuccess: (data: ApiResponse<AdminData>) => {
         toast({
            title: "Admin added!",
            description: data?.message ?? "Success",
            className: "bg-gray-300 text-gray-900",
         });
         queryClient.invalidateQueries({ queryKey: ["admins"] });
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

   const onSubmit: SubmitHandler<{
      executive_id: string;
      role_id: string;
   }> = (data) => {
      console.log(data);
      mutation.mutate(data);
   };

   return (
      <div className="p-6 space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold text-foreground">
                  Admins Management
               </h1>
               <p className="text-muted-foreground mt-2">
                  Manage admin accounts and permissions.
               </p>
            </div>

            <Dialog>
               <DialogTrigger asChild>
                  <Button className="gap-2">
                     <UserPlus className="w-4 h-4" />
                     Add Admin
                  </Button>
               </DialogTrigger>
               <DialogContent className="w-full max-w-3xl">
                  <DialogTitle></DialogTitle>
                  <DialogDescription></DialogDescription>
                  <div className="bg-gray-900 w-full">
                     <div className="text-gray-400">
                        {/* <div className=""> */}
                        <Card className="shadow-lg">
                           <CardHeader>
                              <CardTitle className="flex items-center space-x-2">
                                 <Save className="w-5 h-5" />
                                 <span>Add Admin</span>
                              </CardTitle>
                           </CardHeader>
                           <CardContent>
                              <form
                                 onSubmit={handleSubmit(onSubmit)}
                                 className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                 noValidate
                              >
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                       <Label htmlFor="executive">
                                          Executive *
                                       </Label>
                                       <div className="relative">
                                          <Controller
                                             name="executive_id"
                                             control={control}
                                             render={({
                                                field: { value, onChange },
                                             }) => (
                                                <>
                                                   <select
                                                      id="position_id"
                                                      className="w-full h-10 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
                                                      required
                                                      value={value}
                                                      onChange={onChange}
                                                   >
                                                      <option value="" disabled>
                                                         {isExecutivesPending
                                                            ? "Loading..."
                                                            : "Select Executive"}
                                                      </option>
                                                      {executives?.success &&
                                                         executives.data?.map(
                                                            (executive) => (
                                                               <option
                                                                  key={
                                                                     executive.id
                                                                  }
                                                                  value={
                                                                     executive.id
                                                                  }
                                                               >
                                                                  {
                                                                     executive.name
                                                                  }
                                                               </option>
                                                            )
                                                         )}
                                                   </select>
                                                </>
                                             )}
                                          />
                                       </div>
                                    </div>

                                    <div className="space-y-2">
                                       <Label htmlFor="role">Role *</Label>
                                       <div className="relative">
                                          <Controller
                                             name="role_id"
                                             control={control}
                                             render={({
                                                field: { value, onChange },
                                             }) => (
                                                <select
                                                   id="position_id"
                                                   className="w-full h-10 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
                                                   required
                                                   value={value}
                                                   onChange={onChange}
                                                >
                                                   <option value="" disabled>
                                                      {isRolesPending
                                                         ? "Loading..."
                                                         : "Select Role"}
                                                   </option>
                                                   {roles &&
                                                      roles.data?.map(
                                                         (role) => (
                                                            <option
                                                               key={role.id}
                                                               value={role.id}
                                                            >
                                                               {role.role}
                                                            </option>
                                                         )
                                                      )}
                                                </select>
                                             )}
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="flex items-center space-x-4 pt-4">
                                    <Button
                                       type="submit"
                                       className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-medium transition-all"
                                    >
                                       {mutation.isPending ? (
                                          <div className="flex items-center space-x-2">
                                             <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                             <span>Adding...</span>
                                          </div>
                                       ) : (
                                          <>Add</>
                                       )}
                                    </Button>
                                 </div>
                              </form>
                           </CardContent>
                        </Card>
                        {/* </div> */}
                     </div>
                  </div>
               </DialogContent>
            </Dialog>
         </div>

         <Card>
            <CardHeader>
               <CardTitle>All Admins</CardTitle>
               <CardDescription>
                  View and manage all registered admins
               </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                     <Input placeholder="Search users..." className="pl-10" />
                  </div>
               </div>

               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Scope</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {/* {users.map((user) => (
                        <TableRow key={user.id}>
                           <TableCell className="font-medium">
                              {user.name}
                           </TableCell>
                           <TableCell>{user.email}</TableCell>
                           <TableCell>
                              <Badge variant={getRoleBadgeVariant(user.scope)}>
                                 {user.scope}
                              </Badge>
                           </TableCell>
                           <TableCell>
                              <Badge
                                 variant={
                                    user.status === "Active"
                                       ? "default"
                                       : "secondary"
                                 }
                              >
                                 {user.status}
                              </Badge>
                           </TableCell>
                           <TableCell className="text-right">
                              <ActionsMenu />
                           </TableCell>
                        </TableRow>
                     ))} */}
                  </TableBody>
               </Table>
            </CardContent>
         </Card>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* <Card>
               <CardHeader>
                  <CardTitle>Total Admins</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-3xl font-bold">2,543</p>
                  <p className="text-sm text-muted-foreground mt-1">
                     +12.5% from last month
                  </p>
               </CardContent>
            </Card> */}

            {/* <Card>
               <CardHeader>
                  <CardTitle>Active Users</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-3xl font-bold">2,341</p>
                  <p className="text-sm text-muted-foreground mt-1">
                     92.1% of total
                  </p>
               </CardContent>
            </Card> */}

            {/* <Card>
               <CardHeader>
                  <CardTitle>New This Month</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-3xl font-bold">284</p>
                  <p className="text-sm text-muted-foreground mt-1">
                     11.2% of total
                  </p>
               </CardContent>
            </Card> */}
         </div>
      </div>
   );
};

export default UserManagement;

export function ActionsMenu() {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
               <MoreVertical className="w-4 h-4" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => console.log("Delete")}>
               <Trash2 className="w-4 h-4 mr-2 text-red-500" /> Delete
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={() => console.log("Suspend")}>
               <Ban className="w-4 h-4 mr-2 text-yellow-500" /> Suspend
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem onSelect={() => console.log("Other Action")}>
               Another action
            </DropdownMenuItem> */}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
