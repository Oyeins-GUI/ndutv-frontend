import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "../AuthProvider";
import {
   Executive,
   ExecutivePayload,
   updateExecutive,
} from "@/services/create-executive";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function UpdateExecutiveModal({
   executive,
}: {
   executive: Executive;
}) {
   const queryClient = useQueryClient();
   const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { isDirty, dirtyFields, defaultValues },
   } = useForm<ExecutivePayload>({
      defaultValues: {
         name: executive.name,
         position: "",
         year: "",
         image_url: executive.image_url,
      },
   });
   const values = watch();

   const hasChanges =
      isDirty &&
      Object.keys(dirtyFields).some(
         (key) =>
            values[key as keyof ExecutivePayload] !==
            defaultValues?.[key as keyof ExecutivePayload],
      );

   useEffect(() => {
      reset({
         name: executive.name,
         position: executive.position,
         year: executive.year,
         image_url: executive.image_url,
      });
   }, [reset, executive]);

   const mutation = useMutation({
      mutationFn: updateExecutive,
      onSuccess: (data: ApiResponse<ExecutivePayload>) => {
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
            variant: "error",
            className: "bg-red-500 text-gray-300 border-none",
         });
      },
   });

   const onSubmit: SubmitHandler<ExecutivePayload> = async (data) => {
      mutation.mutate(data);
   };

   return (
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
               <Label htmlFor="name">Name *</Label>
               <div className="relative">
                  <Input
                     id="name"
                     {...register("name", {
                        required: true,
                        // pattern:
                        //    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                     })}
                     placeholder="Name"
                  />
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
               <Label htmlFor="position">Position *</Label>
               <Input
                  id="position"
                  {...register("position", {
                     required: true,
                  })}
                  className=""
                  placeholder="Enter position"
               />
            </div>

            <div className="space-y-2">
               <Label htmlFor="year">Year *</Label>
               <Input
                  id="year"
                  {...register("year", {
                     required: true,
                  })}
                  className=""
                  placeholder="Enter year"
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
               disabled={mutation.isPending || !hasChanges}
               className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-medium transition-all"
            >
               {mutation.isPending ? (
                  <div className="flex items-center space-x-2">
                     <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                     <span>Updating...</span>
                  </div>
               ) : (
                  <>Update</>
               )}
            </Button>
         </div>
      </form>
   );
}
