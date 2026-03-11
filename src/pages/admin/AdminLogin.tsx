import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
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
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth";

type FormFields = {
   email: string;
   password: string;
   remember_me: boolean;
};

const AdminLogin = () => {
   const { user, login, isLoading } = useAuth();
   const [showPassword, setShowPassword] = useState(false);
   const navigate = useNavigate();
   const { register, handleSubmit } = useForm<FormFields>({
      defaultValues: {
         email: "",
         password: "",
         remember_me: false,
      },
   });

   const onSubmit: SubmitHandler<FormFields> = async ({
      email,
      password,
      remember_me,
   }) => {
      console.log({ email, password, remember_me });
      await login({ email, password, remember_me });
   };

   useEffect(() => {
      if (user) {
         navigate("/jysq/admin/dashboard");
      }
   }, [user, navigate]);

   return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4 transition-colors duration-300">
         <div className="w-full max-w-[380px]">
            <div className="text-center mb-8 flex items-center justify-between">
               <Link
                  to="/"
                  className="inline-flex items-center space-x-3 group"
               >
                  <img src="/logo.png" className="w-10" />

                  <div className="flex flex-col text-left">
                     <span className="text-title_large uppercase font-secondary font-bold text-white tracking-tight">
                        nans zone b
                     </span>
                     <span className="text-label_medium text-secondary_text -mt-1">
                        Admin Portal
                     </span>
                  </div>
               </Link>
               <Link
                  to="/"
                  className="inline-flex items-center text-sm text-gray-400 hover:text-red-400 transition-colors duration-300"
               >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back Home
               </Link>
            </div>

            <Card className="shadow-2xl border-0 bg-surface backdrop-blur-sm">
               <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-white">
                     Sign In
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                     Sign in to manage NANS ZONE B news platform
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                     <div className="space-y-2">
                        <Label
                           htmlFor="email"
                           className="text-sm font-medium text-gray-300"
                        >
                           Email Address
                        </Label>
                        <Input
                           type="email"
                           {...register("email", {
                              required: "Email is required",
                           })}
                           placeholder="Enter your email"
                           required
                           className="h-12 bg-transparent text-primary_text border-px border-secondary_text/80 focus:border-secondary_text/80 transition-colors duration-300"
                        />
                     </div>

                     <div className="space-y-2">
                        <Label
                           htmlFor="password"
                           className="text-sm font-medium text-gray-300"
                        >
                           Password
                        </Label>
                        <div className="relative">
                           <Input
                              type={showPassword ? "text" : "password"}
                              {...register("password", {
                                 required: "Password is required",
                                 minLength: {
                                    value: 6,
                                    message:
                                       "Password must be at least 6 characters long",
                                 },
                              })}
                              placeholder="Enter your password"
                              className="h-12 bg-transparent text-primary_text border-px border-secondary_text/80 focus:border-secondary_text/80 transition-colors duration-300"
                           />
                           <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors duration-300"
                           >
                              {showPassword ? (
                                 <Eye className="w-5 h-5" />
                              ) : (
                                 <EyeOff className="w-5 h-5" />
                              )}
                           </button>
                        </div>
                     </div>

                     <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center">
                           <input
                              type="checkbox"
                              {...register("remember_me")}
                              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                           />
                           <span className="ml-2 text-gray-400">
                              Remember me
                           </span>
                        </label>
                        <a
                           href="#"
                           className="text-red-400 hover:text-red-300 transition-colors duration-300"
                        >
                           Forgot password?
                        </a>
                     </div>

                     <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-primary_text text-background font-medium transition-all cursor-pointer"
                     >
                        {isLoading ? (
                           <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                              <span>Signing in...</span>
                           </div>
                        ) : (
                           "Sign In"
                        )}
                     </Button>
                  </form>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};

export default AdminLogin;
