import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import NewsDetail from "./pages/NewsDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
   <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="ndutv-theme">
         <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
               <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/news/:id" element={<NewsDetail />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="*" element={<NotFound />} />
               </Routes>
            </BrowserRouter>
         </TooltipProvider>
      </ThemeProvider>
   </QueryClientProvider>
);

export default App;
