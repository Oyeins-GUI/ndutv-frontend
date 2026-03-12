import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import { useArticle } from "@/hooks/use-article";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function National() {
   const { articles, isLoading } = useArticle();

   // Filter national articles safely
   const nationalArticles =
      articles?.filter(
         (article) => article.category.toLowerCase() === "national",
      ) ?? [];

   return (
      <div className="min-h-screen">
         <Header />

         <section className="bg-surface">
            <div className="container mx-auto px-4 py-4 font-secondary text-primary_text">
               <div className="flex items-center justify-between">
                  <div className="uppercase text-label_small text-primary_text">
                     <p className="text-title_large text-primary_text font-medium">
                        NATIONAL UPDATES
                     </p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-background">
                        <MagnifyingGlassIcon className="size-5" />
                     </div>
                     {/* <div className="p-2 bg-background">
                        <BellIcon className="size-5" />
                     </div> */}
                  </div>
               </div>
            </div>
         </section>

         <section className="bg-background">
            <div className="container mx-auto px-4 py-8">
               {isLoading ? (
                  <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                     <div className="w-9 aspect-square rounded-full border-4 border-primary_text border-t-transparent animate-spin"></div>
                  </div>
               ) : nationalArticles.length === 0 ? (
                  <div className="min-h-screen flex items-center justify-center text-center py-10 text-primary_text bg-background">
                     No national article available
                  </div>
               ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {nationalArticles.map((article, index) => (
                        <div
                           key={article.admin_id}
                           className="animate-fade-in"
                           style={{ animationDelay: `${index * 0.1}s` }}
                        >
                           <NewsCard {...article} />
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </section>

         <Footer />
      </div>
   );
}
