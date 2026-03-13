import "react-quill-new/dist/quill.snow.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Create from "@/components/Create";
import { useAuth } from "@/hooks/use-auth";
import { Article } from "@/components/ArticleProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
   approveArticle,
   deleteArticle,
   getAllAdminArticles,
} from "@/services/articles";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router";
import { ApiResponse, UserRole } from "@/components/AuthProvider";

import { X } from "lucide-react";
import { timeAgo } from "@/utils/time";

const ContentManagement = () => {
   const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
   const [dialogOpen, setDialogOpen] = useState(false);

   const openArticle = (article: Article) => {
      setSelectedArticle(article);
      setDialogOpen(true);
   };

   const closeArticle = () => {
      setDialogOpen(false);
      setSelectedArticle(null);
   };

   const { user } = useAuth();
   const { toast } = useToast();
   const [searchParams, setSearchParams] = useSearchParams();

   const tab =
      searchParams.get("tab") ||
      (user?.role === "super_admin" ? "for_review" : "create");

   const handleTabChange = (value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("tab", value);
      setSearchParams(params);
   };

   const {
      data: articles,
      isPending,
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
                  Create and publish news articles for the NANS Zone B platform
               </p>
            </div>

            <>
               <Tabs
                  value={tab}
                  onValueChange={handleTabChange}
                  className="w-full"
               >
                  <TabsList className="flex items-start justify-start gap-2">
                     <TabsTrigger
                        value="create"
                        className="bg-surface text-primary_text rounded-md data-[state=active]:bg-primary_text data-[state=active]:rounded-md data-[state=active]:text-background"
                     >
                        Create
                     </TabsTrigger>
                     {user?.role === "super_admin" && (
                        <TabsTrigger
                           value="for_review"
                           className="bg-surface text-primary_text rounded-md data-[state=active]:bg-primary_text data-[state=active]:rounded-md data-[state=active]:text-background"
                        >
                           For Review
                        </TabsTrigger>
                     )}
                     {user?.role !== "super_admin" && (
                        <TabsTrigger
                           value="unapproved"
                           className="bg-surface text-primary_text rounded-md data-[state=active]:bg-primary_text data-[state=active]:rounded-md data-[state=active]:text-background"
                        >
                           Unapproved
                        </TabsTrigger>
                     )}
                     <TabsTrigger
                        value="approved"
                        className="bg-surface text-primary_text rounded-md data-[state=active]:bg-primary_text data-[state=active]:rounded-md data-[state=active]:text-background"
                     >
                        Approved
                     </TabsTrigger>
                  </TabsList>

                  <TabsContent value="create" className="space-y-6">
                     <Create />
                  </TabsContent>
                  <TabsContent value="for_review" className="space-y-6">
                     {isPending ? (
                        <div className="bg-background text-foreground flex items-center justify-center">
                           <div className="w-9 aspect-square rounded-full border-4 border-primary_text border-t-transparent animate-spin"></div>
                        </div>
                     ) : user?.role === "super_admin" ? (
                        unapprovedArticles.length > 0 ? (
                           unapprovedArticles.map((article) => (
                              <ArticleCard
                                 key={article.id}
                                 id={article.id}
                                 article={article}
                                 role={user.role}
                                 onClick={() => openArticle(article)}
                              />
                           ))
                        ) : (
                           <p className="text-gray-500">
                              No unapproved article
                           </p>
                        )
                     ) : null}
                  </TabsContent>
                  <TabsContent value="unapproved" className="space-y-6">
                     {user?.role === "super_admin" &&
                        (unapprovedArticles.length > 0 ? (
                           unapprovedArticles.map((article) => (
                              <ArticleCard
                                 key={article.id}
                                 id={article.id}
                                 article={article}
                                 role={user.role}
                                 onClick={() => openArticle(article)}
                              />
                           ))
                        ) : (
                           <p className="text-gray-500">
                              No unapproved article
                           </p>
                        ))}
                  </TabsContent>
                  <TabsContent value="approved" className="space-y-6">
                     {user && approvedArticles.length > 0 ? (
                        approvedArticles.map((article) => (
                           <ArticleCard
                              key={article.id}
                              id={article.id}
                              article={article}
                              role={user?.role}
                              onClick={() => openArticle(article)}
                           />
                        ))
                     ) : (
                        <p className="text-gray-500">No approved article</p>
                     )}
                  </TabsContent>
               </Tabs>

               <ArticleDialog
                  article={selectedArticle}
                  open={dialogOpen}
                  onClose={closeArticle}
               />
            </>
         </div>
      </div>
   );
};

export default ContentManagement;

export function ArticleCard({
   id,
   role,
   article,
   onClick,
}: {
   id: string;
   role: UserRole;
   article: Article;
   onClick?: () => void;
}) {
   const { toast } = useToast();
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: () => approveArticle(id, article),
      onSuccess: (data: ApiResponse<Article>) => {
         toast({
            title: "Approved successfully!",
            description: data?.message ?? "Article updated successfully",
            className: "bg-gray-300 text-gray-900",
         });
         queryClient.invalidateQueries({ queryKey: ["articles"] });
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

   const deleteArticleMutation = useMutation({
      mutationFn: () => deleteArticle(id),
      onSuccess: () => {
         toast({
            title: "Deleted!",
            description: "Article deleted successfully",
            className: "bg-gray-300 text-gray-900",
         });
         queryClient.invalidateQueries({ queryKey: ["articles"] });
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

   return (
      <div
         onClick={onClick}
         className="bg-surface rounded-lg shadow-md overflow-hidden border border-gray-700 flex items-stretch"
      >
         {/* Image */}
         <div className="w-28 flex-shrink-0">
            <img
               src={article.image_url}
               alt={article.title}
               className="w-full h-full object-cover"
            />
         </div>

         {/* Content */}
         <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
            <div>
               <h3 className="text-lg font-semibold truncate">
                  {article.title}
               </h3>

               <p className="text-body_medium text-secondary_text mt-1 truncate">
                  {article.summary}
               </p>
            </div>

            <div className="mt-3 space-y-2">
               <div className="flex items-center justify-between text-xs text-secondary_text/80">
                  <span className="">{article.author_name}</span>
                  <span className="">{timeAgo(article.created_at)}</span>
               </div>

               <div className="flex items-center justify-between">
                  <span className="text-xs bg-secondary_text text-primary px-2 py-1 rounded">
                     {article.category}
                  </span>

                  <div className="flex items-center gap-2">
                     {role === "super_admin" && !article.is_approved && (
                        <button
                           onClick={() => mutation.mutate()}
                           className="text-xs bg-primary_text hover:bg-primary_text/80 text-background px-3 py-1 rounded transition"
                        >
                           {mutation.isPending ? "Approving..." : "Approve"}
                        </button>
                     )}

                     {role === "super_admin" && !article.is_approved && (
                        <button
                           onClick={() => deleteArticleMutation.mutate()}
                           className="text-xs bg-error hover:bg-error/90 text-on_error px-3 py-1 rounded transition"
                        >
                           {mutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

interface ArticleDialogProps {
   article: Article | null;
   open: boolean;
   onClose: () => void;
}

export function ArticleDialog({ article, open, onClose }: ArticleDialogProps) {
   if (!article || !open) return null;

   return (
      <div
         className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6"
         onClick={onClose} // click outside to close
      >
         <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto relative p-6"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
         >
            {/* Close Button */}
            <button
               onClick={onClose}
               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
               <X className="w-5 h-5" />
            </button>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold break-words">
               {article.title}
            </h2>

            <div className="mt-4 space-y-4">
               {/* Image */}
               {article.image_url && (
                  <img
                     src={article.image_url}
                     alt={article.title}
                     className="w-full max-w-full max-h-96 object-cover rounded-md"
                  />
               )}

               {/* Author + Date */}
               <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="break-words">{article.author_name}</span>
                  <span>{timeAgo(article.created_at)}</span>
               </div>

               {/* Category */}
               <span className="inline-blockbg-gray-700 text-gray-200 px-2 py-1 rounded text-xs break-words">
                  {article.category}
               </span>

               {/* Summary */}
               <p className="text-gray-700 dark:text-gray-200 break-words">
                  {article.summary}
               </p>

               {/* Content */}
               <div
                  className="prose max-w-full break-words dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: article.content }}
               />
            </div>
         </div>
      </div>
   );
}
