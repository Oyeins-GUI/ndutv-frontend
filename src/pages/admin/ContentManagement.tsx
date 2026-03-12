import "react-quill-new/dist/quill.snow.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Create from "@/components/Create";
import { useAuth } from "@/hooks/use-auth";
import { Article } from "@/components/ArticleProvider";
import { useQuery } from "@tanstack/react-query";
import { getAllAdminArticles } from "@/services/articles";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const ContentManagement = () => {
   const { user } = useAuth();
   const { toast } = useToast();

   const {
      data: articles,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["articles"],
      queryFn: () => getAllAdminArticles(user?.role),
      // staleTime: 5 * 60 * 1000,
   });

   useEffect(() => {
      if (error) {
         toast({
            title: "Failed to fetch articles",
            description: "Something went wrong",
            variant: "error",
         });
      }
   }, [error, toast]);

   const unapprovedArticles =
      articles?.data.filter((article) => !article.is_approved) || [];

   const approvedArticles =
      articles?.data.filter((article) => article.is_approved) || [];

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
                  {user?.role === "super_admin" && (
                     <TabsTrigger value="for_review">For Review</TabsTrigger>
                  )}
                  <TabsTrigger value="unapproved">Unapproved</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
               </TabsList>

               <TabsContent value="create" className="space-y-6">
                  <Create />
               </TabsContent>
               {!isLoading ? (
                  <>
                     <TabsContent value="for_review" className="space-y-6">
                        {user?.role === "super_admin" &&
                           (unapprovedArticles.length > 0 ? (
                              unapprovedArticles.map((article) => (
                                 <ArticleCard
                                    key={article.admin_id}
                                    article={article}
                                 />
                              ))
                           ) : (
                              <p className="text-gray-500">
                                 No unapproved article
                              </p>
                           ))}
                     </TabsContent>
                     <TabsContent value="unapproved" className="space-y-6">
                        {user?.role === "super_admin" &&
                           (unapprovedArticles.length > 0 ? (
                              unapprovedArticles.map((article) => (
                                 <ArticleCard
                                    key={article.admin_id}
                                    article={article}
                                 />
                              ))
                           ) : (
                              <p className="text-gray-500">
                                 No unapproved article
                              </p>
                           ))}
                     </TabsContent>
                     <TabsContent value="approved" className="space-y-6">
                        {user?.role === "super_admin" ? (
                           approvedArticles.length > 0 ? (
                              approvedArticles.map((article) => (
                                 <ArticleCard article={article} />
                              ))
                           ) : (
                              <p className="text-gray-500">
                                 No approved article
                              </p>
                           )
                        ) : approvedArticles.length > 0 ? (
                           approvedArticles.map((article) => (
                              <ArticleCard article={article} />
                           ))
                        ) : (
                           <p className="text-gray-500">No approved article</p>
                        )}
                     </TabsContent>
                  </>
               ) : (
                  <div className="min-h-1/2 bg-background text-foreground flex items-center justify-center">
                     <div className="w-9 aspect-square rounded-full border-4 border-primary_text border-t-transparent animate-spin"></div>
                  </div>
               )}
            </Tabs>
         </div>
      </div>
   );
};

export default ContentManagement;

export function ArticleCard({ article }: { article: Article }) {
   return (
      <div className="bg-surface rounded-lg shadow-md overflow-hidden border border-gray-700">
         <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-48 object-cover"
         />

         <div className="p-4">
            <h3 className="text-lg font-semibold">{article.title}</h3>

            <p className="text-sm text-gray-400 mt-1">{article.summary}</p>

            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
               <span>{article.author_name}</span>
               <span>{new Date(article.created_at).toLocaleDateString()}</span>
            </div>

            <span className="inline-block mt-2 text-xs bg-gray-700 px-2 py-1 rounded">
               {article.category}
            </span>
         </div>
      </div>
   );
}
