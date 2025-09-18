import { LogOut, Play, SettingsIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";

export default function AdminDashboardHeader({
   role,
   handleLogout,
}: {
   role: string;
   handleLogout: () => Promise<void>;
}) {
   return (
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-700 sticky top-0 z-50">
         <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
               <Link to="/" className="flex items-center space-x-3 group">
                  <div className="bg-red-600 p-2 rounded group-hover:bg-red-700 transition-all duration-300">
                     <Play className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-2xl font-bold text-white">
                        NDUtv
                     </span>
                     <span className="text-xs text-gray-400 -mt-1">
                        Admin Dashboard
                     </span>
                  </div>
               </Link>

               <div className="flex items-center space-x-4 text-gray-300">
                  {/* <ThemeToggle /> */}
                  {role === "super-admin" && (
                     <Button
                        onClick={() => {}}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-2"
                     >
                        <SettingsIcon className="w-4 h-4" />
                        <span className="">Setting</span>
                     </Button>
                  )}
                  <Button
                     onClick={handleLogout}
                     variant="outline"
                     size="sm"
                     className="flex items-center space-x-2"
                  >
                     <LogOut className="w-4 h-4 " />
                     <span className="">Logout</span>
                  </Button>
               </div>
            </div>
         </div>
      </header>
   );
}
