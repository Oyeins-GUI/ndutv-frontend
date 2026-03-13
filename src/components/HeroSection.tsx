import { useArticle } from "@/hooks/use-article";
import { timeAgo } from "@/utils/time";
import { ArrowRightIcon, BellAlertIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router";

const HeroSection = () => {
   const { articles } = useArticle();
   const featuredArticle =
      articles
         ?.filter((article) => article.is_featured)
         ?.sort((a, b) => {
            const dateA = new Date(a.created_at || "").getTime();
            const dateB = new Date(b.created_at || "").getTime();
            return dateB - dateA;
         })?.[0] ?? null;

   if (!articles || articles.length === 0) {
      return (
         <div className="min-h-screen flex items-center justify-center text-center py-10 text-primary_text bg-background">
            No articles available
         </div>
      );
   }

   return (
      <section className="bg-background py-8">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Main featured story */}
               {/* Link to view news here */}
               <div className="lg:col-span-2">
                  <Link
                     to={`/${featuredArticle?.category.toLowerCase()}/${featuredArticle?.id}`}
                     className="group cursor-pointer"
                  >
                     <div className="relative overflow-hidden mb-4">
                        <img
                           src={featuredArticle?.image_url}
                           alt={featuredArticle?.title}
                           className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700 rounded-lg"
                        />
                        <div className="absolute top-4 left-4">
                           <p className="bg-accent text-primary_text px-3 py-1 text-label_medium font-secondary font-medium">
                              {featuredArticle?.category}
                           </p>
                        </div>
                     </div>
                     <h1 className="text-headline_medium md:text-headline_large font-primary font-bold text-primary_text mb-4 leading-tight group-hover:text-dark-gold transition-colors">
                        {featuredArticle?.title}
                     </h1>
                     <p className="text-secondary_text font-primary text-body_large leading-relaxed mb-4">
                        {featuredArticle?.summary}
                     </p>
                     <div className="flex items-center justify-between text-label_large text-primary_text font-secondary">
                        <div className="flex flex-col">
                           <span className="font-medium">
                              By {featuredArticle?.author_name}
                           </span>
                           {/* <span className="mx-2">•</span> */}
                           <span className="uppercase text-label_small">
                              {timeAgo(featuredArticle?.created_at)}
                           </span>
                        </div>

                        <div className="flex items-center gap-3">
                           <p className="bg-primary_text px-2 py-2 rounded-full text-background text-body_small transition-colors uppercase">
                              Read full story
                           </p>
                           <ArrowRightIcon className="size-4 text-primary-text" />
                        </div>
                     </div>
                  </Link>
               </div>

               {/* Side stories */}
               <div className="space-y-6 bg-surface rounded-lg p-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <h2 className="text-title_medium font-bold text-primary_text uppercase font-secondary">
                           Latest Updates
                        </h2>
                        <div className="w-12 h-1 bg-primary_text mt-0 transform origin-left"></div>
                     </div>
                     <BellAlertIcon className="size-5 text-accent" />
                  </div>
                  <div>
                     {articles.slice(1, 5).map((article) => (
                        <Link
                           to={`/${article.category.toLowerCase()}/${article.id}`}
                           key={article.id}
                        >
                           <article
                              key={article.id}
                              className="group cursor-pointer mb-2"
                           >
                              <div className="flex items-start space-x-3">
                                 {/* <div className="w-2 h-2 bg-bronze rounded-full mt-2 shrink-0"></div> */}
                                 <div>
                                    <p className="flex items-center gap-1 text-label_small text-accent uppercase tracking-wide mb-1 font-secondary font-medium">
                                       <span>•</span>
                                       <span>{article.category}</span>
                                    </p>
                                    <h3 className="text-title_medium font-secondary font-medium text-primary_text leading-tight transition-colors">
                                       {article.title}
                                    </h3>
                                    <span className="text-body_small text-secondary_text">
                                       {timeAgo(article.created_at)}
                                    </span>
                                 </div>
                              </div>
                           </article>
                        </Link>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default HeroSection;
