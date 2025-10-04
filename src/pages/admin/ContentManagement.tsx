import "react-quill-new/dist/quill.snow.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Create from "@/components/Create";
import { useAuth } from "@/hooks/use-auth";

const ContentManagement = () => {
   const { user } = useAuth();

   return (
      <div className="p-6">
         <div className="max-w-4xl mx-auto space-y-6">
            <div>
               <h1 className="text-3xl font-bold text-foreground">
                  Content Management
               </h1>
               <p className="text-muted-foreground mt-2">
                  Create and publish news articles for the NDUtv platform
               </p>
            </div>

            <Tabs defaultValue="create" className="w-full">
               <TabsList>
                  <TabsTrigger value="create">Create</TabsTrigger>
                  <TabsTrigger value="Unapproved">Unapproved</TabsTrigger>
                  <TabsTrigger value="Approved">Approved</TabsTrigger>
                  {(user?.role === "super_admin" ||
                     user?.role === "central_exec") && (
                     <TabsTrigger value="Review">Review</TabsTrigger>
                  )}
               </TabsList>

               <TabsContent value="create" className="space-y-6">
                  <Create />
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
};

export default ContentManagement;
