import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./components/ThemeProvider";
import { router } from "./router";
import { AuthProvider } from "./components/AuthProvider";

const queryClient = new QueryClient();
export const BASE_URL =
   "https://ndu-tv-backend-production-ecd7.up.railway.app/v1";

const App = () => (
   <QueryClientProvider client={queryClient}>
      <AuthProvider>
         <ThemeProvider defaultTheme="system" storageKey="ndutv-theme">
            <TooltipProvider>
               <Toaster />
               <Sonner />
               <RouterProvider router={router} />
            </TooltipProvider>
         </ThemeProvider>
      </AuthProvider>
   </QueryClientProvider>
);

export default App;
