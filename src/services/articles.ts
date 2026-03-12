import { BASE_URL } from "@/App";
import { Article } from "@/components/ArticleProvider";
import { ApiResponse } from "@/components/AuthProvider";
import { NewsData } from "@/components/Create";
import uploadImage from "./upload-image";

export async function getArticles({ is_featured }: { is_featured?: boolean }) {
   const params = new URLSearchParams({
      page: "1",
      limit: "10",
   });

   if (is_featured !== undefined) {
      params.append("is_featured", String(is_featured));
   }

   const res = await fetch(`${BASE_URL}/articles?${params.toString()}`, {
      credentials: "include",
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.log("article error", error);
      throw new Error(error.message || "Failed to fetch articles");
   }

   const data: ApiResponse<Article[]> = await res.json();

   return data;
}

export async function createArticle(article: Omit<NewsData, "is_featured">) {
   const file = (article.image_url as File[])?.[0];
   const imageUrl = file ? await uploadImage(file) : "";

   const articleData = {
      ...article,
      image_url: imageUrl,
   };

   const res = await fetch(`${BASE_URL}/articles`, {
      method: "POST",
      credentials: "include",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.log("article error", error);
      throw new Error(error.message || "Failed to fetch articles");
   }

   const data: ApiResponse<Article[]> = await res.json();

   return data;
}
