import { createContext, useContext } from "react";
import { ArticleContextType } from "@/components/ArticleProvider";

export const ArticleContext = createContext<ArticleContextType | null>(null);

export const useArticle = () => {
   const context = useContext(ArticleContext);

   if (context === null)
      throw new Error("useArticle must be used within an ArticleContext");

   return context;
};
