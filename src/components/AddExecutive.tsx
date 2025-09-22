import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import createExecutive, { Executive } from "@/services/create-executive";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { ApiResponse, type Error } from "./AuthProvider";

function AddExecutive() {
   const queryClient = useQueryClient();

   const { register, handleSubmit } = useForm<Executive>({
      defaultValues: {
         name: "sdfljkl",
         email: "sdf@gmail.com",
         matric_number: "sdfj",
         position_id: "sdjfkl",
         session_id: "sdjk",
         faculty_id: "asdfjk",
         department_id: "slkjfs",
         phone_number: "sdkjl",
         scope: "sdfkjl",
         image: [],
      },
   });

   const mutation = useMutation({
      mutationFn: createExecutive,
      onSuccess: (data: ApiResponse<Executive>) => {
         toast({
            title: "Executive added!",
            description: data?.message ?? "Success",
            className: "bg-gray-300 text-gray-900",
         });
         queryClient.invalidateQueries({ queryKey: ["executives"] });
      },
      onError: (error: ApiResponse<Error>) => {
         toast({
            title: "Error",
            description:
               error.message || "Something went wrong. Please try again.",
            variant: "destructive",
            className: "bg-red-500 text-gray-300 border-none",
         });
      },
   });

   const onSubmit: SubmitHandler<Executive> = async (data) => {
      mutation.mutate(data);
   };

   return (
      <div className="bg-gray-900 w-full">
         <div className="text-gray-400">
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
                                 <Input
                                    id="email"
                                    {...register("email", {
                                       required: true,
                                       pattern:
                                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                    })}
                                    placeholder="Email address"
                                 />
                              </div>
                           </div>

                           <div className="space-y-2">
                              <Label htmlFor="matric_number">
                                 Matric Number *
                              </Label>
                              <div className="relative">
                                 <Input
                                    id="matric_number"
                                    {...register("matric_number", {
                                       required: true,
                                    })}
                                    className=""
                                    placeholder="Enter matric number"
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor="position">Position *</Label>
                              <div className="relative">
                                 <Input
                                    id="position"
                                    {...register("position_id", {
                                       required: true,
                                    })}
                                    className=""
                                    placeholder="Position"
                                 />
                              </div>
                           </div>

                           <div className="space-y-2">
                              <Label htmlFor="session_id">Session *</Label>
                              <div className="relative">
                                 <Input
                                    id="session_id"
                                    {...register("session_id", {
                                       required: true,
                                    })}
                                    className=""
                                    placeholder="Enter session"
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="faculty">Faculty *</Label>
                           <div className="relative">
                              <Input
                                 id="faculty_id"
                                 {...register("faculty_id", {
                                    required: true,
                                 })}
                                 className=""
                                 placeholder="Enter faculty"
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="department">Department *</Label>
                           <div className="relative">
                              <Input
                                 id="department"
                                 {...register("department_id", {
                                    required: true,
                                 })}
                                 className=""
                                 placeholder="Enter department"
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="phone_number">Phone Number *</Label>
                           <div className="relative">
                              <Input
                                 id="phone_number"
                                 {...register("phone_number", {
                                    required: true,
                                 })}
                                 className=""
                                 placeholder="Enter phone number"
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="scope">Scope *</Label>
                           <div className="relative m-0">
                              <Input
                                 id="scope"
                                 {...register("scope", {
                                    required: true,
                                 })}
                                 className=""
                                 placeholder="Enter scope"
                              />
                           </div>
                           {/* <p className="text-red-400 text-xs">error</p> */}
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="image">Featured Image *</Label>
                           <div className="relative">
                              <Input
                                 type="file"
                                 accept="image/*"
                                 {...register("image", {
                                    required: true,
                                 })}
                                 className=""
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
                                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                    <span>Adding...</span>
                                 </div>
                              ) : (
                                 <>Add</>
                              )}
                           </Button>
                        </div>
                     </form>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}

export default AddExecutive;
