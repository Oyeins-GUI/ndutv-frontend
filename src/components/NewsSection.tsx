import { Link } from "react-router";
import NewsCard from "./NewsCard";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

interface NewsSectionProps {
   title: string;
   category: string;
}

const NewsSection = ({ title }: NewsSectionProps) => {
   const sampleNews = [
      {
         id: "2",
         title: "Faculty of Engineering Hosts Annual Tech Innovation Summit",
         excerpt:
            "Students showcase cutting-edge projects in AI, robotics, and sustainable technology. The summit attracts industry leaders and potential employers.",
         image: "photo-1498050108023-c5249f4df085",
         category: "Faculty",
         author: "Engineering Faculty",
         date: "4 hours ago",
      },
      {
         id: "3",
         title: "Computer Science Department Launches New AI Research Lab",
         excerpt:
            "State-of-the-art facility equipped with high-performance computing resources will support student and faculty research in machine learning and artificial intelligence.",
         image: "photo-1461749280684-dccba630e2f6",
         category: "Department",
         author: "CS Department",
         date: "6 hours ago",
      },
      {
         id: "4",
         title: "State Government Increases Education Budget by 15%",
         excerpt:
            "The state government announces significant investment in higher education, with funds allocated for infrastructure development and scholarship programs.",
         image: "photo-1466442929976-97f336a657be",
         category: "State",
         author: "State Correspondent",
         date: "8 hours ago",
      },
      {
         id: "5",
         title: "New Student Housing Complex Opens on Campus",
         excerpt:
            "Modern accommodation facility provides comfortable living spaces for 500 students with study areas, recreational facilities, and high-speed internet.",
         image: "photo-1555854877-bab0e564b8d5",
         category: "Campus",
         author: "Campus Reporter",
         date: "12 hours ago",
      },
      {
         id: "6",
         title: "National University Games Set to Begin Next Month",
         excerpt:
            "Niger Delta University will participate in various sporting events as part of the annual national university games competition.",
         image: "photo-1571019613454-1cb2f99b2d8b",
         category: "Sports",
         author: "Sports Desk",
         date: "1 day ago",
      },
      {
         id: "7",
         title: "Research Grant Awards Announced for Faculty Members",
         excerpt:
            "University faculty members receive substantial research grants to support innovative projects in environmental science and renewable energy.",
         image: "photo-1532094349884-543bc11b234d",
         category: "Research",
         author: "Research Office",
         date: "1 day ago",
      },
   ];

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {sampleNews.map((news, index) => (
                  <div
                     key={news.id}
                     className="animate-fade-in"
                     style={{ animationDelay: `${index * 0.1}s` }}
                  >
                     <NewsCard {...news} />
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default NewsSection;
