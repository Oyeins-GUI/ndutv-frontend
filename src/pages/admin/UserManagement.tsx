import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
   Table,
   TableBody,
   TableCell,
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
import addAdmin, { AdminData, deleteAdmin, getAdmins } from "@/services/admin";
import { ApiResponse, type Error } from "@/components/AuthProvider";
import { toast } from "@/hooks/use-toast";
import { getRoleBadgeVariant } from "@/utils/badge-variant";
import { Badge } from "@/components/ui/badge";
import { getRoles } from "@/services/get-roles";

const UserManagement = () => {
   const queryClient = useQueryClient();

   const { data: admins } = useQuery({
      queryKey: ["admins"],
      queryFn: getAdmins,
      retry: false,
   });

   const { data: adminRoles } = useQuery({
      queryKey: ["admin_roles"],
      queryFn: getRoles,
      retry: false,
   });

   const { handleSubmit, register, control } = useForm<{
      email: string;
      name: string;
      role_id: string;
   }>({
      defaultValues: {
         email: "",
         name: "",
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
      email: string;
      name: string;
      role_id: string;
   }> = (data) => {
      mutation.mutate(data);
   };

   return (
      <div className="p-6 space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-headline_large font-secondary font-bold text-primary_text">
                  Admins Management
               </h1>
               <p className="font-primary text-secondary_text">
                  Manage admin accounts and permissions.
               </p>
            </div>

            <Dialog>
               <DialogTrigger asChild>
                  <Button className="gap-2 bg-background border">
                     <UserPlus className="w-4 h-4" />
                     Add Admin
                  </Button>
               </DialogTrigger>
               <DialogContent className="w-full max-w-3xl">
                  <DialogTitle></DialogTitle>
                  <DialogDescription></DialogDescription>
                  <div className="bg-background w-full">
                     <div className="text-primary_text">
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
                                 <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                       id="email"
                                       {...register("email", {
                                          required: true,
                                       })}
                                       placeholder="Enter email"
                                       required
                                       className="w-full"
                                    />
                                 </div>

                                 <div className="space-y-2">
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                       id="name"
                                       {...register("name", {
                                          required: true,
                                       })}
                                       placeholder="Enter name"
                                       required
                                       className=""
                                    />
                                 </div>

                                 <div className="space-y-2">
                                    <Label htmlFor="role_id">Role *</Label>
                                    <div className="relative">
                                       <Controller
                                          name="role_id"
                                          control={control}
                                          render={({
                                             field: { value, onChange },
                                          }) => (
                                             <select
                                                id="role_id"
                                                className="w-full h-10 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
                                                required
                                                value={value}
                                                onChange={onChange}
                                             >
                                                <option value="" disabled>
                                                   Select a role
                                                </option>
                                                {adminRoles?.success &&
                                                   adminRoles.data.map(
                                                      (role) => (
                                                         <option
                                                            key={role.id}
                                                            value={role.id}
                                                         >
                                                            {role.role}
                                                         </option>
                                                      ),
                                                   )}
                                                {/* <option value="basic_admin">
                                                   Admin
                                                </option> */}
                                             </select>
                                          )}
                                       />
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
                     <Input
                        placeholder="Search by name or email"
                        className="pl-10"
                     />
                  </div>
               </div>

               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Actions</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {admins?.success &&
                        admins.data.map((admin) => (
                           <TableRow key={admin.name}>
                              <TableCell className="font-medium">
                                 {admin.name}
                              </TableCell>
                              <TableCell>{admin.email}</TableCell>
                              <TableCell>
                                 <Badge
                                    variant={getRoleBadgeVariant(admin.role)}
                                 >
                                    {admin.role}
                                 </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                 <ActionsMenu id={admin.id} />
                              </TableCell>
                           </TableRow>
                        ))}
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

function ActionsMenu({ id }: { id: string }) {
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: () => deleteAdmin(id),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["admins"] });
         toast({
            title: "Admin deleted!",
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
            <Button className="hover:bg-surface" variant="ghost" size="sm">
               <MoreVertical className="w-4 h-4" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent
            align="end"
            className="bg-background text-primary_text"
         >
            <DropdownMenuItem onSelect={() => console.log(`Editing... ${id}`)}>
               <Ban className="w-4 h-4 mr-2 text-background" /> Suspend
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
