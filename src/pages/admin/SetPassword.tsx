import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
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
import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "@/components/AuthProvider";
import { setPassword } from "@/services/admin";
import { toast } from "@/hooks/use-toast";

type FormFields = {
   username: string;
   password: string;
   confirm_password: string;
};

export default function SetPassword() {
   const [params] = useSearchParams();
   const { user } = useAuth();
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const navigate = useNavigate();
   const { register, handleSubmit } = useForm<FormFields>({
      defaultValues: {
         username: "",
         password: "",
         confirm_password: "",
      },
   });
   const token = params.get("token") || "";

   const mutation = useMutation({
      mutationFn: setPassword,
      onSuccess: (
         data: ApiResponse<{
            token: string;
            username: string;
            password: string;
         }>,
      ) => {
         toast({
            title: "Password set successfully",
            description: data?.message ?? "Success",
            className: "bg-gray-300 text-gray-900",
         });
         navigate("/jysq/admin/signin");
      },
      onError: (error: ApiResponse<Error>) => {
         toast({
            title: "Error",
            description:
               error.message || "Something went wrong. Please try again.",
            variant: "error",
            className: "bg-red-500 text-gray-300 border-none",
         });
      },
   });

   const onSubmit: SubmitHandler<FormFields> = async ({
      username,
      password,
      confirm_password,
   }) => {
      if (password === confirm_password && token) {
         mutation.mutate({ token, username, password });
      } else {
         toast({
            title: "Error",
            description: "Passwords mismatch or invalid token",
            className: "bg-gray-300 text-gray-900",
            variant: "error",
         });
      }
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
                  <img src="/logo.png" className="w-14" />

                  <div className="flex flex-col text-left">
                     <span className="text-title_large font-bold font-secondary text-white uppercase tracking-tight">
                        NANS Zone B
                     </span>
                     <span className="text-sm text-gray-400 -mt-1">
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
                     Set Password
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                     Set password to manage NANS ZONE B news platform
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                     <div className="space-y-2">
                        <Label
                           htmlFor="username"
                           className="text-sm font-medium text-gray-300"
                        >
                           Username
                        </Label>
                        <div className="relative">
                           <Input
                              type="text"
                              {...register("username", {
                                 required: "Username name is required",
                                 minLength: {
                                    value: 4,
                                    message:
                                       "Username must be at least 4 characters long",
                                 },
                              })}
                              placeholder="Enter username"
                              required
                              className="h-12 pr-12 text-gray-300 border-gray-600 focus:border-red-400 transition-colors duration-300"
                           />
                        </div>
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
                                 required: "Enter your password",
                                 minLength: {
                                    value: 6,
                                    message:
                                       "Password must be at least 6 characters long",
                                 },
                              })}
                              placeholder="Enter password"
                              required
                              className="h-12 pr-12 text-gray-300 border-gray-600 focus:border-red-400 transition-colors duration-300"
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

                     <div className="space-y-2">
                        <Label
                           htmlFor="confirm_password"
                           className="text-sm font-medium text-gray-300"
                        >
                           Confirm Password
                        </Label>
                        <div className="relative">
                           <Input
                              type={showConfirmPassword ? "text" : "password"}
                              {...register("confirm_password", {
                                 required: "Confirm your password",
                                 minLength: {
                                    value: 6,
                                    message:
                                       "Password must be at least 6 characters long",
                                 },
                              })}
                              placeholder="Confirm password"
                              required
                              className="h-12 pr-12 text-gray-300 border-gray-600 focus:border-red-400 transition-colors duration-300"
                           />
                           <button
                              type="button"
                              onClick={() =>
                                 setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors duration-300"
                           >
                              {showConfirmPassword ? (
                                 <Eye className="w-5 h-5" />
                              ) : (
                                 <EyeOff className="w-5 h-5" />
                              )}
                           </button>
                        </div>
                     </div>

                     <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full h-12 border bg-gray-300 text-gray-900 font-medium transition-all cursor-pointer"
                     >
                        {mutation.isPending ? (
                           <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                              <span>Creating...</span>
                           </div>
                        ) : (
                           "Create Account"
                        )}
                     </Button>
                  </form>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
