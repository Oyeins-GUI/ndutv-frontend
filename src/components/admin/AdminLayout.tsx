import { Link, Outlet, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import {
   LogOut,
   LayoutDashboard,
   Settings,
   Users,
   FileText,
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
import ThemeToggle from "../ThemeToggle";

const menuItems = [
   {
      title: "Overview",
      url: "/jysq/admin/dashboard",
      icon: LayoutDashboard,
      roles: ["super_admin", "basic_admin"],
   },
   // {
   //    title: "Platform Management",
   //    url: "/jysq/admin/platform",
   //    icon: Cog,
   //    roles: ["super_admin"],
   // },
   {
      title: "Executives",
      url: "/jysq/admin/executives",
      icon: Users,
      roles: ["super_admin"],
   },
   {
      title: "Admins Management",
      url: "/jysq/admin/users",
      icon: ShieldCheck,
      roles: ["super_admin"],
   },
   {
      title: "Content Management",
      url: "/jysq/admin/content",
      icon: FileText,
      roles: ["super_admin", "basic_admin"],
   },
   // {
   //    title: "Analytics",
   //    url: "/jysq/admin/analytics",
   //    icon: BarChart3,
   //    roles: ["super_admin"],
   // },
   {
      title: "Settings",
      url: "/jysq/admin/settings",
      icon: Settings,
      roles: ["super_admin", "basic_admin"],
   },
];

export function AdminSidebar() {
   const location = useLocation();
   const { user } = useAuth();

   return (
      <Sidebar>
         <SidebarContent className="md:mt-16 bg-surface text-primary_text border-t border-secondary_text/10">
            <SidebarGroup>
               <SidebarGroupLabel>Menu</SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {menuItems
                        .filter(
                           (item) => user && item.roles.includes(user.role),
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
      <div className="min-h-screen w-full flex flex-col bg-background text-primary_text">
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
      <header className="sticky top-0 z-50 bg-surface text-primary_text">
         <div className="flex h-16 items-center gap-4 px-4">
            <SidebarTrigger />

            <Link to="/" className="flex items-center gap-2 group">
               <img src="/logo.png" className="w-16" />

               <div className="flex flex-col">
                  <span className="text-title_medium font-secondary uppercase text-primary_text font-bold">
                     nans zone b
                  </span>
                  <span className="text-label_medium font-secondary text-secondary_text -mt-1">
                     Admin Panel
                  </span>
               </div>
            </Link>

            <div className="ml-auto flex items-center gap-4">
               <ThemeToggle />
               <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent border border-secondary_text/40 text-primary_text/80 hover:bg-primary_text/10"
               >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
               </Button>
            </div>
         </div>
      </header>
   );
}
