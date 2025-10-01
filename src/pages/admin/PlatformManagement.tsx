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
// import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubmitHandler, useForm } from "react-hook-form";

type PlatformSettings = {
   platformName: string;
   tagline: string;
   contactEmail: string;
   currentSession: string;
};

const PlatformManagement = () => {
   const { register, handleSubmit } = useForm<PlatformSettings>({
      defaultValues: {
         platformName: "NDUtv",
         tagline: "Your source for campus news",
         contactEmail: "admin@ndutv.com",
         currentSession: "2024/2025",
      },
   });

   const handleSave: SubmitHandler<PlatformSettings> = (data) => {
      console.log("Saved data:", data);
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
               <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Platform Information</CardTitle>
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
                           <Label htmlFor="platform-name">Platform Name</Label>
                           <Input
                              id="platform-name"
                              {...register("platformName", {
                                 required: true,
                              })}
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="platform-tagline">Tagline</Label>
                           <Input
                              id="platform-tagline"
                              {...register("tagline", {
                                 required: true,
                              })}
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="platform-email">Contact Email</Label>
                           <Input
                              id="platform-email"
                              type="email"
                              {...register("contactEmail", {
                                 required: true,
                                 pattern:
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                              })}
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="current-session">
                              Current Session
                           </Label>
                           <Input
                              id="current-session"
                              {...register("currentSession", {
                                 required: true,
                              })}
                           />
                        </div>
                        <Button onClick={() => {}}>Save Changes</Button>
                     </form>
                  </CardContent>
               </Card>
            </TabsContent>

            {/* <TabsContent value="features" className="space-y-6">
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
                     <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                           <Label>Dark Mode</Label>
                           <p className="text-sm text-muted-foreground">
                              Allow users to toggle dark mode
                           </p>
                        </div>
                        <Switch />
                     </div>
                     <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                           <Label>Email Notifications</Label>
                           <p className="text-sm text-muted-foreground">
                              Send email updates to subscribers
                           </p>
                        </div>
                        <Switch />
                     </div>
                     <Button onClick={handleSave}>Save Changes</Button>
                  </CardContent>
               </Card>
            </TabsContent> */}

            {/* <TabsContent value="maintenance" className="space-y-6">
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
            </TabsContent> */}
         </Tabs>
      </div>
   );
};

export default PlatformManagement;
