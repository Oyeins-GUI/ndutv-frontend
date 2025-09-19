import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
   Upload,
   Save,
   User as UserIcon,
   PlusIcon,
   ArrowLeft,
} from "lucide-react";
import AdminDashboardHeader from "@/components/AdminDashboardHeader";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth";
import createExecutive, { Executive } from "@/utils/create-executive";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { ApiResponse, type Error } from "./AuthProvider";
import { Link } from "react-router";

function AddExecutive() {
   const { logout } = useAuth();
   const queryClient = useQueryClient();

   const { register, handleSubmit } = useForm<Executive>({
      defaultValues: {
         name: "",
         email: "",
         matric_number: "",
         position_id: "",
         session_id: "",
         faculty_id: "",
         department_id: "",
         phone_number: "",
         scope: "",
         image: [],
      },
   });

   const mutation = useMutation({
      mutationFn: createExecutive,
      onSuccess: (data: ApiResponse<Executive>) => {
         toast({
            title: "Executive added!",
            description: data?.message ?? "Success",
            className: "text-gray-900 border bg-gray-300",
         });
         queryClient.invalidateQueries({ queryKey: ["executives"] });
      },
      onError: (error: ApiResponse<Error>) => {
         toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
            className: "text-gray-900 border bg-gray-300",
         });
      },
   });

   const onSubmit: SubmitHandler<Executive> = async (data) => {
      mutation.mutate(data);
   };

   return (
      <div className="min-h-screen bg-gray-900 transition-colors duration-300">
         <AdminDashboardHeader handleLogout={logout} />

         <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
               <div className="mb-8 flex items-center justify-between">
                  <div>
                     <h1 className="text-3xl font-bold text-white mb-2">
                        Add an Executive
                     </h1>
                     <p className="text-gray-400">
                        Add an executive to the NDUtv platform
                     </p>
                  </div>
                  <Link
                     to="/admin/dashboard"
                     className="inline-flex items-center text-sm text-gray-400 hover:text-red-400 transition-colors duration-300"
                  >
                     <ArrowLeft className="w-4 h-4 mr-1" />
                     Back to Dashboard
                  </Link>
               </div>

               <div className="text-gray-400">
                  {/* Main Form */}
                  <div className="">
                     <Card className="shadow-lg">
                        <CardHeader>
                           <CardTitle className="flex items-center space-x-2">
                              <Save className="w-5 h-5" />
                              <span>Executive Details</span>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <form
                              onSubmit={handleSubmit(onSubmit)}
                              className="grid grid-cols-1 md:grid-cols-2 gap-6"
                              noValidate
                           >
                              <div className="space-y-2">
                                 <Label htmlFor="name">Name *</Label>
                                 <Input
                                    id="name"
                                    {...register("name", { required: true })}
                                    placeholder="Enter name"
                                    required
                                    className="text-lg font-medium"
                                 />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <div className="relative">
                                       <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                       <Input
                                          id="email"
                                          {...register("email", {
                                             required: true,
                                             pattern:
                                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                          })}
                                          className="pl-10"
                                          placeholder="Email address"
                                       />
                                    </div>
                                 </div>

                                 <div className="space-y-2">
                                    <Label htmlFor="matric_number">
                                       Matric Number *
                                    </Label>
                                    <div className="relative">
                                       <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                       <Input
                                          id="matric_number"
                                          {...register("matric_number", {
                                             required: true,
                                          })}
                                          className="pl-10"
                                          placeholder="Enter matric number"
                                       />
                                    </div>
                                 </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div className="space-y-2">
                                    <Label htmlFor="position">Position *</Label>
                                    <div className="relative">
                                       <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                       <Input
                                          id="position"
                                          {...register("position_id", {
                                             required: true,
                                          })}
                                          className="pl-10"
                                          placeholder="Position"
                                       />
                                    </div>
                                 </div>

                                 <div className="space-y-2">
                                    <Label htmlFor="session_id">
                                       Session *
                                    </Label>
                                    <div className="relative">
                                       <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                       <Input
                                          id="session_id"
                                          {...register("session_id", {
                                             required: true,
                                          })}
                                          className="pl-10"
                                          placeholder="Enter session"
                                       />
                                    </div>
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor="faculty">Faculty *</Label>
                                 <div className="relative">
                                    <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                       id="faculty_id"
                                       {...register("faculty_id", {
                                          required: true,
                                       })}
                                       className="pl-10"
                                       placeholder="Enter faculty"
                                    />
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor="department">
                                    Department *
                                 </Label>
                                 <div className="relative">
                                    <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                       id="department"
                                       {...register("department_id", {
                                          required: true,
                                       })}
                                       className="pl-10"
                                       placeholder="Enter department"
                                    />
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor="phone_number">
                                    Phone Number *
                                 </Label>
                                 <div className="relative">
                                    <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                       id="phone_number"
                                       {...register("phone_number", {
                                          required: true,
                                       })}
                                       className="pl-10"
                                       placeholder="Enter phone number"
                                    />
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor="scope">Scope *</Label>
                                 <div className="relative">
                                    <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                       id="scope"
                                       {...register("scope", {
                                          required: true,
                                       })}
                                       className="pl-10"
                                       placeholder="Enter scope"
                                    />
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor="image">Featured Image</Label>
                                 <div className="relative">
                                    <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                       type="file"
                                       accept="image/*"
                                       {...register("image", {
                                          required: true,
                                       })}
                                       className="pl-10"
                                    />
                                 </div>
                              </div>

                              <div className="flex items-center space-x-4 pt-4">
                                 <Button
                                    type="submit"
                                    disabled={mutation.isPending}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-medium transition-all"
                                 >
                                    {mutation.isPending ? (
                                       <div className="flex items-center space-x-2">
                                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                          <span>Inviting...</span>
                                       </div>
                                    ) : (
                                       <>
                                          <PlusIcon className="w-4 h-4 mr-2" />
                                          Add Executive
                                       </>
                                    )}
                                 </Button>
                              </div>
                           </form>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default AddExecutive;
