import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./components/ThemeProvider";
import { router } from "./router";
import { AuthProvider } from "./components/AuthProvider";
import { ArticleProvider } from "./components/ArticleProvider";
import ErrorBoundary from "./components/error-boundary";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();
export const BASE_URL = "https://api.nanszoneb.org/v1";

const App = () => (
   <HelmetProvider>
      <ErrorBoundary>
         <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="system" storageKey="nans-theme">
               <AuthProvider>
                  <ArticleProvider>
                     <TooltipProvider>
                        <Toaster />
                        <Sonner />
                        <RouterProvider router={router} />
                     </TooltipProvider>
                  </ArticleProvider>
               </AuthProvider>
            </ThemeProvider>
         </QueryClientProvider>
      </ErrorBoundary>
   </HelmetProvider>
);

export default App;
