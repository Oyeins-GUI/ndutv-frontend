import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
   getPlatformConfig,
   updatePlatformConfig,
} from "@/services/platform-config";
import { ApiResponse } from "@/components/AuthProvider";
import { toast } from "@/hooks/use-toast";

export type PlatformConfig = {
   current_session_id: string;
   current_session: string;
   is_publishing_enabled: boolean;
   platform_name: string;
   platform_tagline: string;
};

const PlatformManagement = () => {
   const queryClient = useQueryClient();
   const { data: platformConfig, isLoading: isPlatformConfigLoading } =
      useQuery<PlatformConfig>({
         queryKey: ["platform-config"],
         queryFn: getPlatformConfig,
      });

   const {
      register,
      handleSubmit,
      reset,
      control,
      watch,
      formState: { isDirty, dirtyFields, defaultValues },
   } = useForm<PlatformConfig>({
      defaultValues: {
         platform_name: "",
         platform_tagline: "",
         current_session: "",
         is_publishing_enabled: false,
         current_session_id: "",
      },
   });

   const values = watch();

   const hasChanges =
      isDirty &&
      Object.keys(dirtyFields).some(
         (key) =>
            values[key as keyof PlatformConfig] !==
            defaultValues?.[key as keyof PlatformConfig]
      );

   useEffect(() => {
      if (platformConfig) {
         reset(platformConfig);
      }
   }, [reset, platformConfig]);

   const mutation = useMutation({
      mutationFn: updatePlatformConfig,
      onSuccess: (data: ApiResponse<PlatformConfig>) => {
         toast({
            title: "Platform Config changed!",
            description: data?.message ?? "Success",
            className: "bg-gray-300 text-gray-900",
         });
         queryClient.invalidateQueries({ queryKey: ["platform-config"] });
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

   const handleSave: SubmitHandler<PlatformConfig> = async (data) => {
      mutation.mutate(data);
   };

   return (
      <div className="p-6 space-y-6">
         <div>
            <h1 className="text-3xl font-bold text-foreground">
               Platform Management
            </h1>
            <p className="text-muted-foreground mt-2">
               Configure and manage platform-wide settings and features.
            </p>
         </div>

         <Tabs defaultValue="general" className="w-full">
            <TabsList>
               <TabsTrigger value="general">General</TabsTrigger>
               <TabsTrigger value="features">Features</TabsTrigger>
               {/* <TabsTrigger value="maintenance">Maintenance</TabsTrigger> */}
            </TabsList>

            <TabsContent value="general" className="space-y-6">
               <Card>
                  <CardHeader>
                     <div className="flex items-center gap-2">
                        <CardTitle>Platform Information</CardTitle>
                        {isPlatformConfigLoading && (
                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                     </div>
                     <CardDescription>
                        Basic information about your platform
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <form
                        onSubmit={handleSubmit(handleSave)}
                        className="space-y-4"
                     >
                        <div className="space-y-2">
                           <Label htmlFor="platform_name">Platform Name</Label>
                           <Input
                              id="platform_name"
                              {...register("platform_name", {
                                 required: true,
                              })}
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="platform_tagline">Tagline</Label>
                           <Input
                              id="platform_tagline"
                              {...register("platform_tagline", {
                                 required: true,
                              })}
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="current_session">
                              Current Session
                           </Label>
                           <Input
                              id="current_session"
                              {...register("current_session", {
                                 required: true,
                              })}
                           />
                        </div>
                        <div className="space-y-2 flex items-center justify-between">
                           <div className="space-y-0.5">
                              <Label>Enable Publishing</Label>
                              <p className="text-sm text-muted-foreground">
                                 Allow admins to publish articles
                              </p>
                           </div>
                           <Controller
                              name="is_publishing_enabled"
                              control={control}
                              render={({ field }) => (
                                 <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                 />
                              )}
                           />
                        </div>
                        <Button
                           disabled={!hasChanges || mutation.isPending}
                           type="submit"
                        >
                           {mutation.isPending ? (
                              <div className="flex items-center space-x-2">
                                 <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                 <span>Saving...</span>
                              </div>
                           ) : (
                              "Save Changes"
                           )}
                        </Button>
                     </form>
                  </CardContent>
               </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Feature Toggles</CardTitle>
                     <CardDescription>
                        Enable or disable platform features
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                           <Label>User Comments</Label>
                           <p className="text-sm text-muted-foreground">
                              Allow users to comment on articles
                           </p>
                        </div>
                        <Switch />
                     </div>
                     <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                           <Label>Social Sharing</Label>
                           <p className="text-sm text-muted-foreground">
                              Enable social media sharing buttons
                           </p>
                        </div>
                        <Switch />
                     </div>
                     <Button disabled onClick={() => {}}>
                        Save Changes
                     </Button>
                  </CardContent>
               </Card>
            </TabsContent>
         </Tabs>
      </div>
   );
};

export default PlatformManagement;

{
   /* <TabsContent value="maintenance" className="space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Maintenance Mode</CardTitle>
                     <CardDescription>
                        Control platform availability
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                           <Label>Enable Maintenance Mode</Label>
                           <p className="text-sm text-muted-foreground">
                              Platform will be unavailable to regular users
                           </p>
                        </div>
                        <Switch />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="maintenance-message">
                           Maintenance Message
                        </Label>
                        <Input
                           id="maintenance-message"
                           defaultValue="We're currently performing scheduled maintenance. We'll be back soon!"
                        />
                     </div>
                     <Button onClick={handleSave}>Save Changes</Button>
                  </CardContent>
               </Card>
            </TabsContent> */
}
