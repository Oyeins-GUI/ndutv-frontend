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
            password: string;
         }>
      ) => {
         toast({
            title: "Password set successfully",
            description: data?.message ?? "Success",
            className: "bg-gray-300 text-gray-900",
         });
         navigate("/admin/signin");
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
      password,
      confirm_password,
   }) => {
      if (password === confirm_password && token) {
         mutation.mutate({ token, password });
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
         navigate("/admin/dashboard");
      }
   }, [user, navigate]);

   return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
         <div className="w-full max-w-md">
            <div className="text-center mb-8 flex items-center justify-between">
               <Link
                  to="/"
                  className="inline-flex items-center space-x-3 group mb-6"
               >
                  <img src="/logo.png" className="w-10" />

                  <div className="flex flex-col text-left">
                     <span className="text-3xl font-bold text-white tracking-tight">
                        NDUtv
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
                  Back to Homepage
               </Link>
            </div>

            <Card className="shadow-2xl border-0 bg-gray-800/80 backdrop-blur-sm">
               <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-white">
                     Create Account
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                     Set password to manage NDUtv news platform
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
