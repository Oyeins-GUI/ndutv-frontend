import { useParams, Link } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
   // BookmarkIcon,
   ChevronLeftIcon,
   // EllipsisVerticalIcon,
   ShareIcon,
} from "@heroicons/react/24/solid";
import { getArticleById } from "@/services/articles";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { timeAgo } from "@/utils/time";
import Seo from "@/components/Seo";

const NewsDetail = () => {
   const { id } = useParams();
   const { toast } = useToast();

   const {
      data: article,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["article", id],
      queryFn: () => getArticleById(id || ""),
      staleTime: 5 * 60 * 1000,
      enabled: !!id,
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

   const handleShare = async () => {
      if (navigator.share) {
         try {
            await navigator.share({
               title: article?.data.title,
               text: article?.data.summary,
               url: window.location.href,
            });
            console.log("Content shared successfully");
         } catch (error) {
            console.error("Error sharing:", error);
         }
      } else {
         alert(
            "Web Share API is not supported in your browser. You can manually copy the link: " +
               window.location.href,
         );
         navigator.clipboard.writeText(window.location.href);
      }
   };

   return (
      <>
         {article?.success && (
            <Seo
               title={article?.data.title}
               description={article?.data.summary}
               image={article?.data.image_url}
               canonical={`https://www.nanszoneb.org/${article?.data.category}/${article?.data.id}`}
               schemaMarkup={{
                  "@context": "https://schema.org",
                  "@type": "NewsArticle",
                  headline: article?.data.title,
                  image: article?.data.image_url,
                  datePublished: new Date(
                     article.data.created_at,
                  ).toISOString(),
                  author: {
                     "@type": "Person",
                     name: article?.data.author_name,
                  },
                  publisher: {
                     "@type": "Organization",
                     name: "NANS Zone B South-South",
                     logo: {
                        "@type": "ImageObject",
                        url: "https://www.nanszoneb.org/logo.png",
                     },
                  },
               }}
            />
         )}
         <div className="min-h-screen bg-white">
            <Header />

            {!isLoading ? (
               <article className="py-8 bg-background">
                  <div className="container mx-auto px-4">
                     <div className="max-w-4xl mx-auto">
                        {/* Back button */}
                        <div className="flex items-center justify-between mb-6">
                           <Link to="/zonal" className="">
                              <ChevronLeftIcon className="size-6 text-primary_text" />
                           </Link>
                           <div className="flex items-center gap-6">
                              {/* <BookmarkIcon className="size-6 text-primary_text" /> */}
                              <button
                                 onClick={handleShare}
                                 className="cursor-pointer"
                              >
                                 <ShareIcon className="size-6 text-primary_text" />
                              </button>
                              {/* <EllipsisVerticalIcon className="size-6 text-primary_text" /> */}
                           </div>
                        </div>

                        {/* Article Header */}
                        <div className="mb-8">
                           <div className="mb-4">
                              <span className="bg-surface font-secondary text-primary_text px-3 py-1 text-sm font-medium uppercase tracking-wide">
                                 {article?.data.category}
                              </span>
                           </div>

                           <h1 className="text-headline_medium font-bold text-primary_text mb-3 leading-tight">
                              {article?.data.title}
                           </h1>

                           <div className="flex items-center justify-between border-b border-primary_text/10 pb-6">
                              <div className="flex items-center space-x-6 text-gray-600 text-sm">
                                 <div className="flex flex-col">
                                    <p className="font-medium text-primary_text text-body_medium">
                                       {article?.data.author_name}
                                    </p>
                                    <p className="text-body_small text-secondary_text">
                                       Published •{" "}
                                       {timeAgo(
                                          article?.data.created_at as string,
                                       )}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Featured Image */}
                        <div className="mb-8">
                           <img
                              src={article?.data.image_url}
                              alt={article?.data.title}
                              className="w-full h-64 md:h-96 object-cover"
                           />
                        </div>

                        {/* Article Content */}
                        <div className="bg-white mb-12">
                           <div
                              className="prose prose-lg max-w-full break-words bg-background text-primary_text leading-relaxed"
                              dangerouslySetInnerHTML={{
                                 __html: article?.data.content as string,
                              }}
                           />
                        </div>

                        {/* Related Articles */}
                        {/* <div className="border-t border-primary_text/10 pt-8">
                     <h2 className="text-title_medium font-secondary font-bold text-primary_text mb-6">
                        Related Articles
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {relatedArticles.map((article, index) => (
                           <div
                              key={index}
                              className="border-l-4 border-accent p-4 transition-colors flex items-start gap-4"
                           >
                              <div>
                                 <img
                                    src={`https://images.unsplash.com/${article.image}?w=1200&q=80`}
                                    alt={article.title}
                                    className="h-24 aspect-square object-cover"
                                 />
                              </div>

                              <div>
                                 <span className="text-xs text-accent uppercase tracking-wide font-medium">
                                    {article.category}
                                 </span>
                                 <h3 className="font-bold font-secondary text-primary_text mb-2 transition-colors">
                                    {article.title}
                                 </h3>
                                 <p className="text-secondary_text text-label_medium">
                                    2h ago • 4 min read
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div> */}

                        {/* <Newsletter /> */}
                     </div>
                  </div>
               </article>
            ) : (
               <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                  <div className="w-9 aspect-square rounded-full border-4 border-primary_text border-t-transparent animate-spin"></div>
               </div>
            )}

            <Footer />
         </div>
      </>
   );
};

export default NewsDetail;
