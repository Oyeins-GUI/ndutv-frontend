import { ArrowRightIcon, BellAlertIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router";

const HeroSection = () => {
   const featuredNews = {
      id: "1",
      title: "Website Launch/Webinar: NANS South-South Zone Unveils New Digital Platform",
      excerpt:
         "The National Association of Nigerian Students (NANS) South-South Zone is proud to announce the launch of its new website, designed to enhance communication and engagement with students across the region. The website features a modern design, user-friendly interface, and a wealth of resources for students. To celebrate the launch, NANS South-South Zone will be hosting a webinar on [Date] at [Time], where members can learn about the new features and how to navigate the platform effectively.",
      image: "photo-1605810230434-7631ac76ec81",
      category: "ZONAL",
      author: "NANS Press Team",
      date: "2 hours ago",
   };

   const sideStories = [
      {
         id: "2",
         title: "Faculty of Engineering Hosts Annual Tech Innovation Summit",
         category: "Zonal",
         date: "4 hours ago",
      },
      {
         id: "3",
         title: "Computer Science Department Launches New AI Research Lab",
         category: "National",
         date: "6 hours ago",
      },
      {
         id: "4",
         title: "State Government Increases Education Budget by 15%",
         category: "Zonal",
         date: "8 hours ago",
      },
   ];

   return (
      <section className="bg-background py-8">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Main featured story */}
               {/* Link to view news here */}
               <div className="lg:col-span-2">
                  <Link
                     to={`/${featuredNews.category.toLowerCase()}/${featuredNews.id}`}
                     className="group cursor-pointer"
                  >
                     <div className="relative overflow-hidden mb-4">
                        <img
                           src={`https://images.unsplash.com/${featuredNews.image}?w=800&q=80`}
                           alt={featuredNews.title}
                           className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700 rounded-lg"
                        />
                        <div className="absolute top-4 left-4">
                           <p className="bg-accent text-primary_text px-3 py-1 text-label_medium font-secondary font-medium">
                              {featuredNews.category}
                           </p>
                        </div>
                     </div>
                     <h1 className="text-headline_medium md:text-headline_large font-primary font-bold text-primary_text mb-4 leading-tight group-hover:text-dark-gold transition-colors">
                        {featuredNews.title}
                     </h1>
                     <p className="text-secondary_text font-primary text-body_large leading-relaxed mb-4">
                        {featuredNews.excerpt}
                     </p>
                     <div className="flex items-center justify-between text-label_large text-primary_text font-secondary">
                        <div className="flex flex-col">
                           <span className="font-medium">
                              {featuredNews.author}
                           </span>
                           {/* <span className="mx-2">•</span> */}
                           <span className="uppercase text-label_small">
                              {featuredNews.date}
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
                     {sideStories.map((story) => (
                        <Link
                           to={`/${story.category.toLowerCase()}/${story.id}`}
                           key={story.id}
                        >
                           <article
                              key={story.id}
                              className="group cursor-pointer mb-2"
                           >
                              <div className="flex items-start space-x-3">
                                 {/* <div className="w-2 h-2 bg-bronze rounded-full mt-2 shrink-0"></div> */}
                                 <div>
                                    <p className="flex items-center gap-1 text-label_small text-accent uppercase tracking-wide mb-1 font-secondary font-medium">
                                       <span>•</span>
                                       <span>{story.category}</span>
                                    </p>
                                    <h3 className="text-title_medium font-secondary font-medium text-primary_text leading-tight transition-colors">
                                       {story.title}
                                    </h3>
                                    <span className="text-body_small text-secondary_text">
                                       {story.date}
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
