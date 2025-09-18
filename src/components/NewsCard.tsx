import { Link } from "react-router";
import { Clock, User } from "lucide-react";

interface NewsCardProps {
   id: string;
   title: string;
   excerpt: string;
   image: string;
   category: string;
   author: string;
   date: string;
   featured?: boolean;
}

const NewsCard = ({
   id,
   title,
   excerpt,
   image,
   category,
   author,
   date,
}: // featured = false,
NewsCardProps) => {
   return (
      <article className="group bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] animate-fade-in">
         <Link to={`/news/${id}`} className="block">
            <div className="relative overflow-hidden rounded-t-lg">
               <img
                  src={`https://images.unsplash.com/${image}?w=600&q=80`}
                  alt={title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               <div className="absolute top-3 left-3 transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="bg-red-600 text-white px-3 py-1 text-xs font-medium uppercase tracking-wide rounded-full shadow-lg">
                     {category}
                  </span>
               </div>
            </div>

            <div className="p-6">
               <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
                  {title}
               </h2>

               <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3 transition-colors duration-300">
                  {excerpt}
               </p>

               <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center transform group-hover:translate-x-1 transition-transform duration-300">
                     <User className="w-3 h-3 mr-1" />
                     <span className="font-medium">{author}</span>
                  </div>
                  <div className="flex items-center transform group-hover:-translate-x-1 transition-transform duration-300">
                     <Clock className="w-3 h-3 mr-1" />
                     <span>{date}</span>
                  </div>
               </div>
            </div>
         </Link>
      </article>
   );
};

export default NewsCard;
