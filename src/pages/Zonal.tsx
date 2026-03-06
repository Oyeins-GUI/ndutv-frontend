import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Zonal() {
   const sampleNews = [
      {
         id: "2",
         title: "Faculty of Engineering Hosts Annual Tech Innovation Summit",
         excerpt:
            "Students showcase cutting-edge projects in AI, robotics, and sustainable technology. The summit attracts industry leaders and potential employers.",
         image: "photo-1498050108023-c5249f4df085",
         category: "National",
         author: "Engineering Faculty",
         date: "4 hours ago",
      },
      {
         id: "3",
         title: "Computer Science Department Launches New AI Research Lab",
         excerpt:
            "State-of-the-art facility equipped with high-performance computing resources will support student and faculty research in machine learning and artificial intelligence.",
         image: "photo-1461749280684-dccba630e2f6",
         category: "Zonal",
         author: "CS Department",
         date: "6 hours ago",
      },
      {
         id: "4",
         title: "State Government Increases Education Budget by 15%",
         excerpt:
            "The state government announces significant investment in higher education, with funds allocated for infrastructure development and scholarship programs.",
         image: "photo-1466442929976-97f336a657be",
         category: "National",
         author: "State Correspondent",
         date: "8 hours ago",
      },
      {
         id: "5",
         title: "New Student Housing Complex Opens on Campus",
         excerpt:
            "Modern accommodation facility provides comfortable living spaces for 500 students with study areas, recreational facilities, and high-speed internet.",
         image: "photo-1555854877-bab0e564b8d5",
         category: "Zonal",
         author: "Campus Reporter",
         date: "12 hours ago",
      },
      {
         id: "6",
         title: "National University Games Set to Begin Next Month",
         excerpt:
            "Niger Delta University will participate in various sporting events as part of the annual national university games competition.",
         image: "photo-1571019613454-1cb2f99b2d8b",
         category: "Zonal",
         author: "Sports Desk",
         date: "1 day ago",
      },
      {
         id: "7",
         title: "Research Grant Awards Announced for Faculty Members",
         excerpt:
            "University faculty members receive substantial research grants to support innovative projects in environmental science and renewable energy.",
         image: "photo-1532094349884-543bc11b234d",
         category: "National",
         author: "Research Office",
         date: "1 day ago",
      },
   ];

   return (
      <div className="min-h-screen">
         <Header />

         <section className="bg-surface">
            <div className="container mx-auto px-4 py-4 font-secondary text-primary_text">
               <div className="flex items-center justify-between">
                  <div className="uppercase text-label_small text-primary_text">
                     <p className="text-title_large text-primary_text font-medium">
                        ZONAL UPDATES
                     </p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-background">
                        <MagnifyingGlassIcon className="size-5" />
                     </div>
                     <div className="p-2 bg-background">
                        <BellIcon className="size-5" />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className="bg-background">
            <div className="container mx-auto px-4 py-8">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sampleNews
                     .filter((news) => news.category.toLowerCase() === "zonal")
                     .map((news, index) => (
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

         <Footer />
      </div>
   );
}
