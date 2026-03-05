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
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, MoreVertical, Pen, Trash2, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

export default function Executives() {
   const [params, setParams] = useSearchParams();
   // const { user } = useAuth();
   const { data: executives } = useQuery({
      queryKey: ["executives"],
      queryFn: getExecutives,
      retry: false,
   });

   const [filters, setFilters] = useState({
      name: "",
      position: "",
      faculty: params.get("faculty") ?? "",
      department: params.get("department") ?? "",
      session: params.get("session") ?? "2024/2025",
      scope: params.get("scope") ?? "",
   });

   const handleFilterChange = (key: string, value: string) => {
      const updatedParams = new URLSearchParams(params);

      if (value) {
         updatedParams.set(key, value);
      } else {
         updatedParams.delete(key);
      }

      setParams(updatedParams);
      setFilters((prev) => ({ ...prev, [key]: value }));
   };

   const faculties = [...new Set(executives?.data.map((e) => e.faculty))];
   const departments = [...new Set(executives?.data.map((e) => e.deparment))];
   const sessions = [...new Set(executives?.data.map((e) => e.session))];
   const scopes = [...new Set(executives?.data.map((e) => e.scope))];

   const filteredExecutives = useMemo(() => {
      return executives?.data.filter((exec) => {
         return (
            exec.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            exec.position
               .toLowerCase()
               .includes(filters.position.toLowerCase()) &&
            (filters.faculty === "" || exec.faculty === filters.faculty) &&
            (filters.department === "" ||
               exec.deparment === filters.department) &&
            (filters.session === "" || exec.session === filters.session) &&
            (filters.scope === "" || exec.scope === filters.scope)
         );
      });
   }, [executives, filters]);

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

         <div className="text-foreground">
            <Table>
               <TableHeader>
                  <TableRow className="border-b border-border/40">
                     <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                        Name
                     </TableHead>
                     <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                        Position
                     </TableHead>

                     {/* Faculty Filter */}
                     <TableHead className="min-w-[160px]">
                        <div className="relative group">
                           <label className="absolute -top-2 left-2 bg-background px-1 text-[10px] text-muted-foreground transition-all group-focus-within:text-foreground">
                              Faculty
                           </label>
                           <select
                              value={filters.faculty}
                              onChange={(e) =>
                                 handleFilterChange("faculty", e.target.value)
                              }
                              className="w-full h-9 rounded-lg border border-border/50 bg-muted/30 text-sm text-foreground px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all"
                           >
                              <option value="">All Faculties</option>
                              {faculties.map((faculty) => (
                                 <option key={faculty} value={faculty}>
                                    {faculty}
                                 </option>
                              ))}
                           </select>
                           <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                     </TableHead>

                     {/* Department Filter */}
                     <TableHead className="min-w-[160px]">
                        <div className="relative group">
                           <label className="absolute -top-2 left-2 bg-background px-1 text-[10px] text-muted-foreground">
                              Department
                           </label>
                           <select
                              value={filters.department}
                              onChange={(e) =>
                                 handleFilterChange(
                                    "department",
                                    e.target.value
                                 )
                              }
                              className="w-full h-9 rounded-lg border border-border/50 bg-muted/30 text-sm text-foreground px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/60"
                           >
                              <option value="">All Departments</option>
                              {departments.map((dept) => (
                                 <option key={dept} value={dept}>
                                    {dept}
                                 </option>
                              ))}
                           </select>
                           <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                     </TableHead>

                     {/* Session Filter */}
                     <TableHead className="min-w-[130px]">
                        <div className="relative group">
                           <label className="absolute -top-2 left-2 bg-background px-1 text-[10px] text-muted-foreground">
                              Session
                           </label>
                           <select
                              value={filters.session}
                              onChange={(e) =>
                                 handleFilterChange("session", e.target.value)
                              }
                              className="w-full h-9 rounded-lg border border-border/50 bg-muted/30 text-sm text-foreground px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/60"
                           >
                              <option value="">All Sessions</option>
                              {sessions.map((session) => (
                                 <option key={session} value={session}>
                                    {session}
                                 </option>
                              ))}
                           </select>
                           <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                     </TableHead>

                     {/* Scope Filter */}
                     <TableHead className="min-w-[130px]">
                        <div className="relative group">
                           <label className="absolute -top-2 left-2 bg-background px-1 text-[10px] text-muted-foreground">
                              Scope
                           </label>
                           <select
                              value={filters.scope}
                              onChange={(e) =>
                                 handleFilterChange("scope", e.target.value)
                              }
                              className="w-full h-9 rounded-lg border border-border/50 bg-muted/30 text-sm text-foreground px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/60"
                           >
                              <option value="">All Scopes</option>
                              {scopes.map((scope) => (
                                 <option key={scope} value={scope}>
                                    {scope}
                                 </option>
                              ))}
                           </select>
                           <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                     </TableHead>

                     <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                        Actions
                     </TableHead>
                  </TableRow>
               </TableHeader>

               <TableBody>
                  {filteredExecutives?.map((executive) => (
                     <TableRow key={executive.id}>
                        <TableCell>{executive.name}</TableCell>
                        <TableCell>{executive.position}</TableCell>
                        <TableCell>{executive.faculty}</TableCell>
                        <TableCell>{executive.deparment}</TableCell>
                        <TableCell>{executive.session}</TableCell>
                        <TableCell>{executive.scope}</TableCell>
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
