import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
} from "@/components/ui/card";
import { Eye, EyeOff, Play, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const { toast } = useToast();
   const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
         if (email === "admin@ndutv.com" && password === "admin123") {
            toast({
               title: "Login Successful",
               description: "Welcome back, Admin!",
            });
            navigate("/admin/dashboard");
         } else {
            toast({
               title: "Login Failed",
               description: "Invalid email or password",
               variant: "destructive",
            });
         }
         setIsLoading(false);
      }, 1000);
   };

   return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
         <div className="w-full max-w-md">
            <div className="text-center mb-8">
               <Link
                  to="/"
                  className="inline-flex items-center space-x-3 group mb-6"
               >
                  <div className="bg-red-600 p-3 rounded-xl group-hover:bg-red-700 transition-all duration-300 group-hover:scale-105 shadow-lg">
                     <Play className="w-8 h-8 text-white transform group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="flex flex-col text-left">
                     <span className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        NDUtv
                     </span>
                     <span className="text-sm text-gray-600 dark:text-gray-400 -mt-1">
                        Admin Portal
                     </span>
                  </div>
               </Link>
               <Link
                  to="/"
                  className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300"
               >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Homepage
               </Link>
            </div>

            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
               <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                     Admin Login
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                     Sign in to manage NDUtv news platform
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="space-y-2">
                        <Label
                           htmlFor="email"
                           className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                           Email Address
                        </Label>
                        <Input
                           id="email"
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="admin@ndutv.com"
                           required
                           className="h-12 border-gray-200 dark:border-gray-600 focus:border-red-500 dark:focus:border-red-400 transition-colors duration-300"
                        />
                     </div>

                     <div className="space-y-2">
                        <Label
                           htmlFor="password"
                           className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                           Password
                        </Label>
                        <div className="relative">
                           <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter your password"
                              required
                              className="h-12 pr-12 border-gray-200 dark:border-gray-600 focus:border-red-500 dark:focus:border-red-400 transition-colors duration-300"
                           />
                           <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
                           >
                              {showPassword ? (
                                 <EyeOff className="w-5 h-5" />
                              ) : (
                                 <Eye className="w-5 h-5" />
                              )}
                           </button>
                        </div>
                     </div>

                     <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center">
                           <input
                              type="checkbox"
                              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                           />
                           <span className="ml-2 text-gray-600 dark:text-gray-400">
                              Remember me
                           </span>
                        </label>
                        <a
                           href="#"
                           className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-300"
                        >
                           Forgot password?
                        </a>
                     </div>

                     <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                     >
                        {isLoading ? (
                           <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Signing in...</span>
                           </div>
                        ) : (
                           "Sign In"
                        )}
                     </Button>
                  </form>

                  <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                     <p>Demo credentials:</p>
                     <p className="font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2">
                        Email: admin@ndutv.com
                        <br />
                        Password: admin123
                     </p>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};

export default AdminLogin;
