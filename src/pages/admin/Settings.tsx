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

const Settings = () => {
   const { toast } = useToast();
   const { user } = useAuth();

   const handleSave = () => {
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
               <TabsTrigger value="notifications">Notifications</TabsTrigger>
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
                     <Button onClick={handleSave}>Save Changes</Button>
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
                  <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                           Current Password
                        </Label>
                        <Input id="currentPassword" type="password" />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                           Confirm New Password
                        </Label>
                        <Input id="confirmPassword" type="password" />
                     </div>
                     <Button onClick={handleSave}>Update Password</Button>
                  </CardContent>
               </Card>

               <Card>
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
               </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
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
            </TabsContent>
         </Tabs>
      </div>
   );
};

export default Settings;
