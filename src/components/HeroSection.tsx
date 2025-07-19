import NewsCard from "./NewsCard";

const HeroSection = () => {
   const featuredNews = {
      id: "1",
      title: "SUG Announces New Student Welfare Initiatives for 2024 Academic Session",
      excerpt:
         "The Student Union Government has unveiled comprehensive welfare programs aimed at improving student life on campus, including enhanced library facilities, improved cafeteria services, and new recreational activities.",
      image: "photo-1605810230434-7631ac76ec81",
      category: "SUG",
      author: "SUG Press Team",
      date: "2 hours ago",
   };

   const sideStories = [
      {
         id: "2",
         title: "Faculty of Engineering Hosts Annual Tech Innovation Summit",
         category: "Faculty",
         date: "4 hours ago",
      },
      {
         id: "3",
         title: "Computer Science Department Launches New AI Research Lab",
         category: "Department",
         date: "6 hours ago",
      },
      {
         id: "4",
         title: "State Government Increases Education Budget by 15%",
         category: "State",
         date: "8 hours ago",
      },
   ];

   return (
      <section className="bg-white py-8 border-b border-gray-200">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Main featured story */}
               <div className="lg:col-span-2">
                  <div className="group cursor-pointer">
                     <div className="relative overflow-hidden mb-4">
                        <img
                           src={`https://images.unsplash.com/${featuredNews.image}?w=800&q=80`}
                           alt={featuredNews.title}
                           className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                           <span className="bg-red-600 text-white px-3 py-1 text-sm font-medium">
                              {featuredNews.category}
                           </span>
                        </div>
                     </div>
                     <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-red-600 transition-colors">
                        {featuredNews.title}
                     </h1>
                     <p className="text-gray-600 text-lg leading-relaxed mb-4">
                        {featuredNews.excerpt}
                     </p>
                     <div className="flex items-center text-sm text-gray-500">
                        <span className="font-medium">
                           {featuredNews.author}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{featuredNews.date}</span>
                     </div>
                  </div>
               </div>

               {/* Side stories */}
               <div className="space-y-6">
                  <h2 className="text-lg font-bold text-gray-900 border-b border-red-600 pb-2">
                     Latest Updates
                  </h2>
                  {sideStories.map((story) => (
                     <article key={story.id} className="group cursor-pointer">
                        <div className="flex items-start space-x-3">
                           <div className="w-2 h-2 bg-red-600 rounded-full mt-2 shrink-0"></div>
                           <div>
                              <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                 {story.category}
                              </span>
                              <h3 className="text-sm font-medium text-gray-900 leading-tight mb-1 group-hover:text-red-600 transition-colors">
                                 {story.title}
                              </h3>
                              <span className="text-xs text-gray-500">
                                 {story.date}
                              </span>
                           </div>
                        </div>
                     </article>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};

export default HeroSection;
