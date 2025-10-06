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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Settings = () => {
   const { toast } = useToast();
   const { user } = useAuth();

   const [showPassword, setShowPassword] = useState(false);

   const { register, handleSubmit } = useForm({
      defaultValues: {
         current_password: "",
         new_password: "",
         confirm_new_password: "",
      },
   });

   const handleUpdate: SubmitHandler<{
      current_password: string;
      new_password: string;
      confirm_new_password: string;
   }> = (data) => {
      console.log(data);
      toast({
         title: "Settings Saved",
         description: "Your settings have been updated successfully",
      });
   };

   return (
      <div className="p-6 space-y-6">
         <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-2">
               Manage your account and application preferences.
            </p>
         </div>

         <Tabs defaultValue="profile" className="w-full">
            <TabsList>
               <TabsTrigger value="profile">Profile</TabsTrigger>
               <TabsTrigger value="security">Security</TabsTrigger>
               {/* <TabsTrigger value="notifications">Notifications</TabsTrigger> */}
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Profile Information</CardTitle>
                     <CardDescription>
                        Update your personal information
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="username">User Name</Label>
                        <Input id="username" defaultValue={user?.name} />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                           id="email"
                           type="email"
                           defaultValue={user?.email}
                        />
                     </div>
                     <Button>Save Changes</Button>
                  </CardContent>
               </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Change Password</CardTitle>
                     <CardDescription>
                        Update your password to keep your account secure
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <form
                        className="space-y-3"
                        onSubmit={handleSubmit(handleUpdate)}
                     >
                        <div className="space-y-2">
                           <Label htmlFor="current_password">
                              Current Password
                           </Label>
                           <div className="relative">
                              <Input
                                 type={showPassword ? "text" : "password"}
                                 {...register("current_password", {
                                    required: "Current password is required",
                                    minLength: {
                                       value: 6,
                                       message:
                                          "Current password must be at least 6 characters long",
                                    },
                                 })}
                                 placeholder="Enter your password"
                                 required
                                 className="h-12 pr-12 text-gray-300 border-gray-600 focus:border-red-400 transition-colors duration-300"
                              />
                              <button
                                 type="button"
                                 onClick={() => setShowPassword(!showPassword)}
                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors duration-300"
                              >
                                 {showPassword ? (
                                    <Eye className="w-5 h-5" />
                                 ) : (
                                    <EyeOff className="w-5 h-5" />
                                 )}
                              </button>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="new_password">New Password</Label>
                           <div className="relative">
                              <Input
                                 type={showPassword ? "text" : "password"}
                                 {...register("new_password", {
                                    required: "New password is required",
                                    minLength: {
                                       value: 6,
                                       message:
                                          "New password must be at least 6 characters long",
                                    },
                                 })}
                                 placeholder="Enter a new password"
                                 required
                                 className="h-12 pr-12 text-gray-300 border-gray-600 focus:border-red-400 transition-colors duration-300"
                              />
                              <button
                                 type="button"
                                 onClick={() => setShowPassword(!showPassword)}
                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors duration-300"
                              >
                                 {showPassword ? (
                                    <Eye className="w-5 h-5" />
                                 ) : (
                                    <EyeOff className="w-5 h-5" />
                                 )}
                              </button>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="confirm_new_password">
                              Confirm New Password
                           </Label>
                           <div className="relative">
                              <Input
                                 type={showPassword ? "text" : "password"}
                                 {...register("confirm_new_password", {
                                    required:
                                       "Confirm new password is required",
                                    minLength: {
                                       value: 6,
                                       message:
                                          "Confirm new password must be at least 6 characters long",
                                    },
                                 })}
                                 placeholder="Confirm new password"
                                 required
                                 className="h-12 pr-12 text-gray-300 border-gray-600 focus:border-red-400 transition-colors duration-300"
                              />
                              <button
                                 type="button"
                                 onClick={() => setShowPassword(!showPassword)}
                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors duration-300"
                              >
                                 {showPassword ? (
                                    <Eye className="w-5 h-5" />
                                 ) : (
                                    <EyeOff className="w-5 h-5" />
                                 )}
                              </button>
                           </div>
                        </div>
                        <Button>Update Password</Button>
                     </form>
                  </CardContent>
               </Card>

               {/* <Card>
                  <CardHeader>
                     <CardTitle>Two-Factor Authentication</CardTitle>
                     <CardDescription>
                        Add an extra layer of security to your account
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-muted-foreground mb-4">
                        Two-factor authentication is currently disabled for your
                        account.
                     </p>
                     <Button variant="outline">Enable 2FA</Button>
                  </CardContent>
               </Card> */}
            </TabsContent>

            {/* <TabsContent value="notifications" className="space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Email Notifications</CardTitle>
                     <CardDescription>
                        Manage your email notification preferences
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="font-medium">New User Registrations</p>
                           <p className="text-sm text-muted-foreground">
                              Get notified when new users join
                           </p>
                        </div>
                        <input
                           type="checkbox"
                           defaultChecked
                           className="w-4 h-4"
                        />
                     </div>
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="font-medium">New Content Published</p>
                           <p className="text-sm text-muted-foreground">
                              Get notified about new articles
                           </p>
                        </div>
                        <input
                           type="checkbox"
                           defaultChecked
                           className="w-4 h-4"
                        />
                     </div>
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="font-medium">Weekly Reports</p>
                           <p className="text-sm text-muted-foreground">
                              Receive weekly analytics reports
                           </p>
                        </div>
                        <input type="checkbox" className="w-4 h-4" />
                     </div>
                     <Button onClick={handleSave}>Save Preferences</Button>
                  </CardContent>
               </Card>
            </TabsContent> */}
         </Tabs>
      </div>
   );
};

export default Settings;
