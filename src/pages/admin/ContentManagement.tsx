import "react-quill-new/dist/quill.snow.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Create from "@/components/Create";
// import { useAuth } from "@/hooks/use-auth";

const ContentManagement = () => {
   // const { user } = useAuth();

   return (
      <div className="p-6">
         <div className="max-w-4xl mx-auto space-y-6">
            <div>
               <h1 className="text-headline_large font-secondary font-bold text-primary_text">
                  Content Management
               </h1>
               <p className="font-primary text-secondary_text">
                  Create and publish news articles for the NDUtv platform
               </p>
            </div>

            <Tabs defaultValue="create" className="w-full">
               <TabsList>
                  <TabsTrigger value="create">Create</TabsTrigger>
                  {/* {(user?.role === "super_admin") && (
                     <TabsTrigger value="Review">Review</TabsTrigger>
                  )} */}
                  <TabsTrigger value="Unapproved">Unapproved</TabsTrigger>
                  <TabsTrigger value="Approved">Approved</TabsTrigger>
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
