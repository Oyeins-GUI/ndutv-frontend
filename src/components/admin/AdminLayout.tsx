import { Link, Outlet, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import {
   Play,
   LogOut,
   LayoutDashboard,
   Settings,
   Cog,
   Users,
   FileText,
   BarChart3,
   ShieldCheck,
} from "lucide-react";
import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarTrigger,
   useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";

const menuItems = [
   {
      title: "Overview",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      roles: ["super_admin", "central_exec", "faculty_exec", "department_exec"],
   },
   {
      title: "Platform Management",
      url: "/admin/platform",
      icon: Cog,
      roles: ["super_admin", "central_exec"],
   },
   {
      title: "Executives",
      url: "/admin/executives",
      icon: Users,
      roles: ["super_admin", "central_exec"],
   },
   {
      title: "Admins Management",
      url: "/admin/users",
      icon: ShieldCheck,
      roles: ["super_admin", "central_exec"],
   },
   {
      title: "Content Management",
      url: "/admin/content",
      icon: FileText,
      roles: ["super_admin", "central_exec", "faculty_exec", "department_exec"],
   },
   {
      title: "Analytics",
      url: "/admin/analytics",
      icon: BarChart3,
      roles: ["super_admin", "central_exec"],
   },
   {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
      roles: ["super_admin", "central_exec"],
   },
];

export function AdminSidebar() {
   const location = useLocation();
   const { user } = useAuth();

   return (
      <Sidebar>
         <SidebarContent className="md:mt-16 bg-black md:bg-transparent">
            <SidebarGroup>
               <SidebarGroupLabel>Menu</SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {menuItems
                        .filter(
                           (item) => user && item.roles.includes(user.role)
                        )
                        .map((item) => {
                           const isActive = location.pathname === item.url;
                           return (
                              <SidebarMenuItem
                                 key={item.title}
                                 className="mb-2"
                              >
                                 <SidebarMenuButton asChild isActive={isActive}>
                                    <Link to={item.url}>
                                       <item.icon className="w-4 h-4" />
                                       <span>{item.title}</span>
                                    </Link>
                                 </SidebarMenuButton>
                              </SidebarMenuItem>
                           );
                        })}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>
      </Sidebar>
   );
}

const AdminLayout = () => {
   const { state } = useSidebar();

   return (
      <div className="min-h-screen w-full flex flex-col bg-background">
         <Header />

         <div className="flex flex-1 w-full overflow-hidden">
            <AdminSidebar />

            <main
               className={`transition-all duration-300 ease-in-out flex-1 overflow-auto ${
                  state === "collapsed" ? "ml-[2rem]" : "md:ml-[16rem]"
               }`}
            >
               <Outlet />
            </main>
         </div>
      </div>
   );
};

export default AdminLayout;

function Header() {
   const { logout } = useAuth();

   return (
      <header className="sticky top-0 z-50 border-b border-gray-900 bg-card text-gray-300">
         <div className="flex h-16 items-center gap-4 px-4">
            <SidebarTrigger />

            <Link to="/" className="flex items-center gap-2 group">
               <div className="bg-red-600 p-2 rounded group-hover:bg-red-700 transition-all duration-300">
                  <Play className="w-5 h-5 text-white" />
               </div>
               <div className="flex flex-col">
                  <span className="text-lg font-bold">NDUtv</span>
                  <span className="text-xs text-muted-foreground -mt-1">
                     Admin Panel
                  </span>
               </div>
            </Link>

            <div className="ml-auto flex items-center gap-4">
               {/* <ThemeToggle /> */}
               <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
               >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
               </Button>
            </div>
         </div>
      </header>
   );
}
