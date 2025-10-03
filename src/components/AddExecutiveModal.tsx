import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import createExecutive, { ExecutivePayload } from "@/services/create-executive";
import {
   useMutation,
   useQueries,
   useQuery,
   useQueryClient,
} from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { ApiResponse, type Error } from "./AuthProvider";
import getPositions from "@/services/get-positions";
import getSession from "@/services/get-session";
import getFaculties from "@/services/get-faculties";
import getDepartments from "@/services/get-departments";

function AddExecutive() {
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

   const { register, handleSubmit, control, watch } = useForm<ExecutivePayload>(
      {
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
            image_url: [],
         },
      }
   );
   const values = watch();

   const { data: departments, isLoading } = useQuery({
      queryKey: ["departments", values.faculty_id],
      queryFn: () => getDepartments(values.faculty_id!),
      enabled: !!values.faculty_id,
   });

   const mutation = useMutation({
      mutationFn: createExecutive,
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
                                 <Controller
                                    name="position_id"
                                    control={control}
                                    render={({
                                       field: { value, onChange },
                                    }) => (
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
                                             {positionResult.data?.success &&
                                                positionResult.data?.data.map(
                                                   (position) => (
                                                      <option
                                                         key={position.id}
                                                         value={position.id}
                                                      >
                                                         {position.title}
                                                      </option>
                                                   )
                                                )}
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
                                    render={({
                                       field: { value, onChange },
                                    }) => (
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
                                             {sessionResult.data?.success &&
                                                sessionResult.data?.data.map(
                                                   (session) => (
                                                      <option
                                                         key={session.id}
                                                         value={session.id}
                                                      >
                                                         {session.session}
                                                      </option>
                                                   )
                                                )}
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
                                          {facultiesResult.data?.success &&
                                             facultiesResult.data.data.map(
                                                (faculty) => (
                                                   <option
                                                      key={faculty.id}
                                                      value={faculty.id}
                                                   >
                                                      {faculty.faculty}
                                                   </option>
                                                )
                                             )}
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
                                             {isLoading
                                                ? "Loading..."
                                                : "Select Department"}
                                          </option>
                                          {departments &&
                                             departments.map(
                                                ({ id, department }) => (
                                                   <option key={id} value={id}>
                                                      {department}
                                                   </option>
                                                )
                                             )}
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
                                          <option value="CENTRAL">
                                             CENTRAL
                                          </option>
                                          <option value="FACULTY">
                                             FACULTY
                                          </option>
                                          <option value="DEPARTMENT">
                                             DEPARTMENT
                                          </option>
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
