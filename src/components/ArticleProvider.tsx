import { ArticleContext } from "@/hooks/use-article";
import { useToast } from "@/hooks/use-toast";
import { getArticles } from "@/services/articles";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

export type ArticleContextType = {
   articles: Article[];
   isLoading: boolean;
   refetchArticles: () => void;
};

export type Article = {
   admin_id: string;
   author_name: string;
   title: string;
   content: string;
   summary: string;
   image_url: string;
   category: string;
   is_featured: boolean;
   is_approved: boolean;
   created_at: string;
};

export function ArticleProvider({
   children,
   ...props
}: {
   children: React.ReactNode;
}) {
   const { toast } = useToast();

   const {
      data: articles,
      isLoading,
      error,
      refetch,
   } = useQuery({
      queryKey: ["articles"],
      queryFn: () => getArticles({}),
      staleTime: 5 * 60 * 1000,
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

   return (
      <ArticleContext
         {...props}
         value={{
            articles: articles?.data ?? [],
            isLoading,
            refetchArticles: refetch,
         }}
      >
         {children}
      </ArticleContext>
   );
}
