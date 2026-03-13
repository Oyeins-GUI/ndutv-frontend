import { BASE_URL } from "@/App";
import { Article } from "@/components/ArticleProvider";
import { ApiResponse, UserRole } from "@/components/AuthProvider";
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

export async function createArticle(article: Omit<NewsData, "author_name">) {
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

export async function getAllAdminArticles(role?: UserRole) {
   const res = await fetch(
      `${BASE_URL}/articles/${role && role === "super_admin" ? "super-admin" : "my-articles"}`,
      {
         credentials: "include",
      },
   );

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.log("article error", error);
      throw new Error(error.message || "Failed to fetch articles");
   }

   const data: ApiResponse<Article[]> = await res.json();

   return data;
}

export async function getArticleById(id: string) {
   const res = await fetch(`${BASE_URL}/articles/${id}`, {
      credentials: "include",
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.log("article error", error);
      throw new Error(error.message || "Failed to fetch articles");
   }

   const data: ApiResponse<Article> = await res.json();

   return data;
}

export async function approveArticle(id: string, article: Article) {
   const { category, content, image_url, is_featured, summary, title } =
      article;

   const res = await fetch(`${BASE_URL}/articles/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         category,
         content,
         image_url,
         is_featured,
         is_approved: true,
         summary,
         title,
      }),
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.log("article error", error);
      throw new Error(error.message || "Failed to fetch articles");
   }

   const data: ApiResponse<Article> = await res.json();

   return data;
}

export async function deleteArticle(id: string) {
   const res = await fetch(`${BASE_URL}/articles/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
   });

   if (!res.ok) {
      const error: ApiResponse<Error> = await res.json();
      console.error(error);
      throw new Error(error.message);
   }

   return;
}
