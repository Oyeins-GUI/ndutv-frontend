import { useEffect } from "react";
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
import { ArrowLeft } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "@/components/AuthProvider";
import { initAdmin } from "@/services/admin";
import { toast } from "@/hooks/use-toast";

type FormFields = {
   email: string;
   role: string;
};

export default function InitPassword() {
   const { user } = useAuth();
   const navigate = useNavigate();
   const { register, handleSubmit } = useForm<FormFields>({
      defaultValues: {
         email: "",
      },
   });

   const mutation = useMutation({
      mutationFn: initAdmin,
      onSuccess: (
         data: ApiResponse<{
            email: string;
         }>,
      ) => {
         toast({
            title: "Check your email",
            description:
               data?.message ??
               "Set your password through the link provided in the mail",
            className: "bg-gray-300 text-gray-900",
         });
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

   const onSubmit: SubmitHandler<FormFields> = async ({ email }) => {
      mutation.mutate({ email });
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
                     <span className="text-title_large font-secondary font-bold uppercase text-primary_text tracking-tight">
                        nans zone b
                     </span>
                     <span className="text-label_medium font-secondary text-secondary_text -mt-1">
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
                           htmlFor="email"
                           className="text-sm font-medium text-gray-300"
                        >
                           Email
                        </Label>
                        <Input
                           type="text"
                           {...register("email", {
                              required: "Email is required",
                              pattern:
                                 /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                           })}
                           placeholder="Enter your email"
                           required
                           className="h-12 pr-12 text-gray-300 border-gray-600 focus:border-red-400 transition-colors duration-300"
                        />
                     </div>

                     <div className="space-y-2">
                        <Label
                           htmlFor="role"
                           className="text-sm font-medium text-gray-300"
                        >
                           Role
                        </Label>
                        <Input
                           type="text"
                           {...register("role", {
                              required: "Role is required",
                           })}
                           placeholder="Enter role"
                           required
                           className="h-12 pr-12 text-gray-300 border-gray-600 focus:border-red-400 transition-colors duration-300"
                        />
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
