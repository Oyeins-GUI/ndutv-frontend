import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { ApiResponse, type Error } from "./AuthProvider";
import { addPosition, Position } from "@/services/positions";

export default function AddExecPositionModal() {
   const queryClient = useQueryClient();
   const { register, handleSubmit } = useForm<{
      position: string;
      title: string;
      description: string;
   }>({
      defaultValues: {
         position: "",
         title: "",
         description: "",
      },
   });

   const mutation = useMutation({
      mutationFn: addPosition,
      onSuccess: (data: ApiResponse<Position[]>) => {
         toast({
            title: "Position added!",
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
            variant: "error",
            className: "bg-red-500 text-gray-300 border-none",
         });
      },
   });

   const onSubmit: SubmitHandler<{
      position: string;
      title: string;
      description: string;
   }> = async (data) => {
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
                        <span>Position Details</span>
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        noValidate
                     >
                        <div className="space-y-2">
                           <Label htmlFor="position">Position *</Label>
                           <Input
                              id="position"
                              {...register("position", { required: true })}
                              placeholder="Enter position"
                              required
                              className=""
                           />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor="title">Title *</Label>
                              <Input
                                 id="title"
                                 {...register("title", {
                                    required: true,
                                 })}
                                 placeholder="Enter title"
                                 required
                                 className=""
                              />
                           </div>

                           <div className="space-y-2">
                              <Label htmlFor="description">Description *</Label>
                              <Input
                                 id="description"
                                 {...register("description", {
                                    required: true,
                                 })}
                                 placeholder="Enter description"
                                 required
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
