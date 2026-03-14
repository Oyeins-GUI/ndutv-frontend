import { Link } from "react-router";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Article } from "./ArticleProvider";
import { formatArticleDate } from "@/utils/date";

const NewsCard = (article: Article) => {
   return (
      <article className="group border border-divider rounded-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] animate-fade-in">
         <Link
            to={`/${article.category.toLowerCase()}/${article.id}`}
            className="block"
         >
            <div className="relative overflow-hidden rounded-t-lg">
               <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
               />
            </div>

            <div className="p-6">
               <button className="bg-accent text-label_small text-primary_text rounded-md px-2 py-1 mb-2 font-medium uppercase tracking-wide">
                  {article.category}
               </button>

               <h2 className="text-title_medium font-secondary font-bold text-primary_text mb-3 leading-tight group-hover:text-primary-gold transition-colors duration-300 truncate">
                  {article.title}
               </h2>

               <h2 className="text-body_medium font-primary text-primary_text h-12 mb-3 leading-tight group-hover:text-primary-gold transition-colors duration-300 truncate">
                  {article.summary}
               </h2>

               <div className="flex items-center justify-between">
                  <div className="flex items-center text-body_small text-secondary_text transform group-hover:-translate-x-1 transition-transform duration-300">
                     Published {formatArticleDate(article.created_at)}
                  </div>
                  <ArrowRightIcon className="size-4 text-secondary_text group-hover:opacity-100 transition-opacity duration-300" />
               </div>
            </div>
         </Link>
      </article>
   );
};

export default NewsCard;
