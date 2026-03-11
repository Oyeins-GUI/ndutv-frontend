import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import createExecutive, { ExecutivePayload } from "@/services/create-executive";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { ApiResponse, type Error } from "./AuthProvider";
import { getPositions } from "@/services/positions";

function AddExecutive() {
   const queryClient = useQueryClient();
   const { register, handleSubmit, control } = useForm<ExecutivePayload>({
      defaultValues: {
         name: "",
         position_id: "",
         exec_type: "",
         year: "",
         image_url: [],
      },
   });

   const { data: execPositions } = useQuery({
      queryKey: ["exec_positions"],
      queryFn: getPositions,
      retry: false,
   });

   const mutation = useMutation({
      mutationFn: createExecutive,
      onSuccess: (data: ApiResponse<ExecutivePayload>) => {
         queryClient.invalidateQueries({ queryKey: ["executives"] });
         toast({
            title: "Executive added!",
            description: data?.message ?? "Success",
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

   const onSubmit: SubmitHandler<ExecutivePayload> = async (data) => {
      // console.log("data: ", data);
      mutation.mutate(data);
   };

   return (
      <div className="bg-background w-full">
         <div className="text-primary_text">
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
                              className=""
                           />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor="position_id">Position *</Label>
                              <div className="relative">
                                 <Controller
                                    name="position_id"
                                    control={control}
                                    render={({
                                       field: { value, onChange },
                                    }) => (
                                       <select
                                          id="position_id"
                                          className="w-full h-10 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
                                          required
                                          value={value}
                                          onChange={onChange}
                                       >
                                          <option value="" disabled>
                                             Select a position
                                          </option>
                                          {execPositions?.success &&
                                             execPositions.data.map(
                                                (position) => (
                                                   <option
                                                      key={position.id}
                                                      value={position.id}
                                                   >
                                                      {position.title}
                                                   </option>
                                                ),
                                             )}
                                       </select>
                                    )}
                                 />
                              </div>
                           </div>

                           <div className="space-y-2">
                              <Label htmlFor="year">Year *</Label>
                              <Input
                                 id="year"
                                 {...register("year", { required: true })}
                                 placeholder="Enter year"
                                 required
                                 className=""
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="exec_type">Executive type *</Label>
                           <div className="relative">
                              <Controller
                                 name="exec_type"
                                 control={control}
                                 render={({ field: { value, onChange } }) => (
                                    <select
                                       id="exec_type"
                                       className="w-full h-10 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
                                       required
                                       value={value}
                                       onChange={onChange}
                                    >
                                       <option value="" disabled>
                                          Select executive type
                                       </option>
                                       <option value="zonal">Zonal</option>
                                       <option value="jcc">JCC</option>
                                    </select>
                                 )}
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="image_url">Featured Image *</Label>
                           <div className="relative">
                              <Input
                                 type="file"
                                 accept="image/*"
                                 {...register("image_url", {
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
