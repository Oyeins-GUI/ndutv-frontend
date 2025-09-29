import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Search, UserPlus, MoreVertical } from "lucide-react";

const UserManagement = () => {
   const users = [
      {
         id: 1,
         name: "John Doe",
         email: "john@example.com",
         role: "Admin",
         status: "Active",
      },
      {
         id: 2,
         name: "Jane Smith",
         email: "jane@example.com",
         role: "Editor",
         status: "Active",
      },
      {
         id: 3,
         name: "Mike Johnson",
         email: "mike@example.com",
         role: "User",
         status: "Active",
      },
      {
         id: 4,
         name: "Sarah Williams",
         email: "sarah@example.com",
         role: "Editor",
         status: "Inactive",
      },
      {
         id: 5,
         name: "Tom Brown",
         email: "tom@example.com",
         role: "User",
         status: "Active",
      },
   ];

   const getRoleBadgeVariant = (role: string) => {
      switch (role) {
         case "Admin":
            return "destructive";
         case "Editor":
            return "default";
         default:
            return "secondary";
      }
   };

   return (
      <div className="p-6 space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold text-foreground">
                  User Management
               </h1>
               <p className="text-muted-foreground mt-2">
                  Manage user accounts and permissions.
               </p>
            </div>
            <Button className="gap-2">
               <UserPlus className="w-4 h-4" />
               Add User
            </Button>
         </div>

         <Card>
            <CardHeader>
               <CardTitle>All Users</CardTitle>
               <CardDescription>
                  View and manage all registered users
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
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {users.map((user) => (
                        <TableRow key={user.id}>
                           <TableCell className="font-medium">
                              {user.name}
                           </TableCell>
                           <TableCell>{user.email}</TableCell>
                           <TableCell>
                              <Badge variant={getRoleBadgeVariant(user.role)}>
                                 {user.role}
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
                              <Button variant="ghost" size="sm">
                                 <MoreVertical className="w-4 h-4" />
                              </Button>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </CardContent>
         </Card>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
               <CardHeader>
                  <CardTitle>Total Users</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-3xl font-bold">2,543</p>
                  <p className="text-sm text-muted-foreground mt-1">
                     +12.5% from last month
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Active Users</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-3xl font-bold">2,341</p>
                  <p className="text-sm text-muted-foreground mt-1">
                     92.1% of total
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>New This Month</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-3xl font-bold">284</p>
                  <p className="text-sm text-muted-foreground mt-1">
                     11.2% of total
                  </p>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};

export default UserManagement;
