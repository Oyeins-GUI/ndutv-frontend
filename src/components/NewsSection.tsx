import { Link } from "react-router";
import NewsCard from "./NewsCard";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useArticle } from "@/hooks/use-article";

interface NewsSectionProps {
   title: string;
   category: string;
}

const NewsSection = ({ title }: NewsSectionProps) => {
   const { articles, isLoading } = useArticle();

   return (
      <section className="py-12 bg-surface transition-colors duration-300">
         <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8 animate-slide-in-right">
               <div>
                  <h2 className="text-headline_small font-secondary font-bold text-primary_text uppercase transition-colors duration-300">
                     {title}
                  </h2>
                  <p className="text-body_small text-secondary_text">
                     Stay updated with campus activities
                  </p>
               </div>
               <Link
                  to="/news"
                  className="font-medium text-body_medium text-primary_text font-secondary tracking-wide transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
               >
                  <p className="uppercase">Explore all</p>
                  <ChevronRightIcon className="size-4" />
               </Link>
            </div>

            <div className="container mx-auto px-4 py-8">
               {isLoading ? (
                  <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                     <div className="w-9 aspect-square rounded-full border-4 border-primary_text border-t-transparent animate-spin"></div>
                  </div>
               ) : articles.length === 0 ? (
                  <div className="min-h-screen flex items-center justify-center text-center py-10 text-primary_text bg-background">
                     No national article available
                  </div>
               ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {articles.map((article, index) => (
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
         </div>
      </section>
   );
};

export default NewsSection;
