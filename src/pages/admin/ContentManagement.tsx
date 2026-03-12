import "react-quill-new/dist/quill.snow.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Create from "@/components/Create";
import { useAuth } from "@/hooks/use-auth";
import { useArticle } from "@/hooks/use-article";
import { Article } from "@/components/ArticleProvider";

const ContentManagement = () => {
   const { user } = useAuth();
   const { articles } = useArticle();

   const approvedArticles = articles.filter(
      (article) => article.is_approved === true,
   );
   const unApprovedArticles = articles.filter(
      (article) => article.is_approved === false,
   );
   const userArticles = articles.filter(
      (article) => article.author_name === user?.name,
   );
   const approvedArticleForUser = userArticles.filter(
      (article) => article.is_approved === true,
   );
   const unApprovedArticleForUser = userArticles.filter(
      (article) => article.is_approved === false,
   );

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
               <TabsContent value="for_review" className="space-y-6">
                  {unApprovedArticles.length > 0 ? (
                     unApprovedArticles.map((article) => (
                        <ArticleCard article={article} />
                     ))
                  ) : (
                     <p className="text-gray-500">No articles for review</p>
                  )}
               </TabsContent>
               <TabsContent value="unapproved" className="space-y-6">
                  {user?.role === "super_admin" ? (
                     unApprovedArticles.length > 0 ? (
                        unApprovedArticles.map((article) => (
                           <ArticleCard article={article} />
                        ))
                     ) : (
                        <p className="text-gray-500">No unapproved article</p>
                     )
                  ) : unApprovedArticleForUser.length > 0 ? (
                     unApprovedArticleForUser.map((article) => (
                        <ArticleCard article={article} />
                     ))
                  ) : (
                     <p className="text-gray-500">No unapproved article</p>
                  )}
               </TabsContent>
               <TabsContent value="approved" className="space-y-6">
                  {user?.role === "super_admin" ? (
                     approvedArticles.length > 0 ? (
                        approvedArticles.map((article) => (
                           <ArticleCard article={article} />
                        ))
                     ) : (
                        <p className="text-gray-500">No approved article</p>
                     )
                  ) : approvedArticles.length > 0 ? (
                     approvedArticleForUser.map((article) => (
                        <ArticleCard article={article} />
                     ))
                  ) : (
                     <p className="text-gray-500">No approved article</p>
                  )}
               </TabsContent>
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
