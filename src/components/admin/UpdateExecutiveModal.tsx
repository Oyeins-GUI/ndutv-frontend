import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
   useMutation,
   useQueries,
   useQuery,
   useQueryClient,
} from "@tanstack/react-query";
import { ApiResponse } from "../AuthProvider";
import {
   Executive,
   ExecutivePayload,
   updateExecutive,
} from "@/services/create-executive";
import { toast } from "@/hooks/use-toast";
import getPositions from "@/services/get-positions";
import getSession from "@/services/get-session";
import getFaculties from "@/services/get-faculties";
import getDepartments from "@/services/get-departments";
import { useEffect } from "react";

export default function UpdateExecutiveModal({
   executive,
}: {
   executive: Executive;
}) {
   const queryClient = useQueryClient();
   const [positionResult, sessionResult, facultiesResult] = useQueries({
      queries: [
         {
            queryKey: ["positions"],
            queryFn: getPositions,
         },
         {
            queryKey: ["session"],
            queryFn: getSession,
         },
         {
            queryKey: ["faculties"],
            queryFn: getFaculties,
         },
      ],
   });

   const {
      register,
      handleSubmit,
      control,
      watch,
      reset,
      formState: { isDirty, dirtyFields, defaultValues },
   } = useForm<ExecutivePayload>({
      defaultValues: {
         name: executive.name,
         email: executive.email,
         matric_number: executive.matric_number,
         position_id: "",
         session_id: "",
         faculty_id: "",
         department_id: "",
         phone_number: executive.phone_number,
         scope: executive.scope,
         image_url: executive.image_url,
      },
   });
   const values = watch();

   const hasChanges =
      isDirty &&
      Object.keys(dirtyFields).some(
         (key) =>
            values[key as keyof ExecutivePayload] !==
            defaultValues?.[key as keyof ExecutivePayload]
      );

   const { data: departments, isLoading } = useQuery({
      queryKey: ["departments", values.faculty_id],
      queryFn: () => getDepartments(values.faculty_id!),
      enabled: !!values.faculty_id,
   });

   const positionId = positionResult.data?.data.find(
      (position) => position.title === executive.position
   )?.id;
   const sessionId = sessionResult.data?.data.find(
      (session) => session.session === executive.session
   )?.id;
   const facultyId = facultiesResult.data?.data.find(
      (faculty) => faculty.faculty === executive.faculty
   )?.id;
   const departmentId =
      departments &&
      departments.find(
         (department) => department.department === executive.deparment
      )?.id;

   useEffect(() => {
      reset({
         name: executive.name,
         email: executive.email,
         matric_number: executive.matric_number,
         position_id: positionId,
         session_id: sessionId,
         faculty_id: facultyId,
         department_id: departmentId,
         phone_number: executive.phone_number,
         scope: executive.scope,
         image_url: executive.image_url,
      });
   }, [reset, executive, positionId, sessionId, facultyId, departmentId]);

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
               <Label htmlFor="matric_number">Matric Number *</Label>
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
                  <Controller
                     name="position_id"
                     control={control}
                     render={({ field: { value, onChange } }) => (
                        <>
                           <select
                              id="position_id"
                              className="w-full h-10 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
                              required
                              value={value}
                              onChange={onChange}
                           >
                              <option value="" disabled>
                                 {positionResult.isLoading
                                    ? "Loading..."
                                    : "Select Position"}
                              </option>
                              {positionResult.data &&
                                 positionResult.data?.data.map((position) => (
                                    <option
                                       key={position.id}
                                       value={position.id}
                                    >
                                       {position.title}
                                    </option>
                                 ))}
                           </select>
                        </>
                     )}
                  />
               </div>
            </div>

            <div className="space-y-2">
               <Label htmlFor="session_id">Session *</Label>
               <div className="relative">
                  <Controller
                     name="session_id"
                     control={control}
                     render={({ field: { value, onChange } }) => (
                        <>
                           <select
                              id="session_id"
                              className="w-full h-10 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
                              required
                              value={value}
                              onChange={onChange}
                           >
                              <option value="" disabled>
                                 {sessionResult.isLoading
                                    ? "Loading..."
                                    : "Select Session"}
                              </option>
                              {sessionResult.data &&
                                 sessionResult.data?.data.map((session) => (
                                    <option key={session.id} value={session.id}>
                                       {session.session}
                                    </option>
                                 ))}
                           </select>
                        </>
                     )}
                  />
               </div>
            </div>
         </div>

         <div className="space-y-2">
            <Label htmlFor="faculty_id">Faculty *</Label>
            <div className="relative">
               <Controller
                  name="faculty_id"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                     <>
                        <select
                           id="faculty_id"
                           className="w-full h-10 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
                           required
                           value={value}
                           onChange={onChange}
                        >
                           <option value="" disabled>
                              {facultiesResult.isLoading
                                 ? "Loading..."
                                 : "Select Faculty"}
                           </option>
                           {facultiesResult.data &&
                              facultiesResult.data.data.map((faculty) => (
                                 <option key={faculty.id} value={faculty.id}>
                                    {faculty.faculty}
                                 </option>
                              ))}
                        </select>
                     </>
                  )}
               />
            </div>
         </div>

         <div className="space-y-2">
            <Label htmlFor="department_id">Department *</Label>
            <div className="relative">
               <Controller
                  name="department_id"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                     <>
                        <select
                           id="department_id"
                           className="w-full h-10 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
                           required
                           value={value}
                           onChange={onChange}
                        >
                           <option value="" disabled>
                              {isLoading ? "Loading..." : "Select Department"}
                           </option>
                           {departments &&
                              departments.map(({ id, department }) => (
                                 <option key={id} value={id}>
                                    {department}
                                 </option>
                              ))}
                        </select>
                     </>
                  )}
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
               <Controller
                  name="scope"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                     <>
                        <select
                           id="scope"
                           className="w-full h-10 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
                           required
                           value={value}
                           onChange={onChange}
                        >
                           <option value="" disabled>
                              Select Scope
                           </option>
                           <option value="CENTRAL">CENTRAL</option>
                           <option value="FACULTY">FACULTY</option>
                           <option value="DEPARTMENT">DEPARTMENT</option>
                        </select>
                     </>
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
               disabled={mutation.isPending || !hasChanges}
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
   );
}
