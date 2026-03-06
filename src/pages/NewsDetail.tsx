import { useParams, Link } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
   BookmarkIcon,
   ChevronLeftIcon,
   EllipsisVerticalIcon,
   ShareIcon,
} from "@heroicons/react/24/solid";
import Newsletter from "@/components/Newsletter";

const NewsDetail = () => {
   const { id } = useParams();
   console.log(id);

   // Mock data - in real app, this would come from an API
   const article = {
      title: "NANS Zone B: Advocating for Student Welfare in the Digital Age",
      content: `
      <p>The Student Union Government (SUG) has unveiled a comprehensive set of welfare programs designed to enhance the quality of life for all students on campus. These initiatives, which will be implemented throughout the 2024 academic session, represent the largest investment in student welfare in the university's recent history.</p>
      
      <h3>Key Initiatives Include:</h3>
      
      <h4>Enhanced Library Services</h4>
      <p>The university library will now operate 24/7 during exam periods, with additional study spaces, improved Wi-Fi connectivity, and extended access to digital resources. New silent study pods and collaborative workspaces have been installed to accommodate different learning preferences.</p>
      
      <h4>Improved Cafeteria Services</h4>
      <p>In response to student feedback, the SUG has worked with the administration to improve meal quality and expand menu options. The cafeteria will now offer more healthy choices, including vegetarian and vegan options, at affordable prices.</p>
      
      <h4>New Recreational Facilities</h4>
      <p>A new recreational center featuring modern fitness equipment, indoor games, and relaxation areas is set to open next month. The facility will be available to all students free of charge and will include organized sports leagues and fitness classes.</p>
      
      <h4>Mental Health Support</h4>
      <p>Recognizing the importance of mental health, the SUG has established a peer counseling program and expanded access to professional mental health services. Students can now access confidential counseling sessions and stress management workshops.</p>
      
      <p>SUG President, Jane Doe, commented: "These initiatives reflect our commitment to creating a supportive environment where every student can thrive academically and personally. We've listened to student concerns and worked tirelessly to implement meaningful changes."</p>
      
      <p>The programs are funded through a combination of SUG allocations, university support, and partnerships with local businesses. Implementation will begin immediately, with full rollout expected by the end of the month.</p>
    `,
      image: "photo-1605810230434-7631ac76ec81",
      category: "Zonal",
      author: "SUG Press Team",
      excerpt: "",
      date: "2 hours ago",
      readTime: "5 min read",
   };

   const relatedArticles = [
      {
         title: "Faculty of Engineering Hosts Annual Tech Summit",
         excerpt: "Students showcase innovative projects in AI and robotics...",
         category: "National",
         image: "photo-1605810230434-7631ac76ec81",
      },
      {
         title: "New Research Lab Opens in Computer Science Department",
         excerpt:
            "State-of-the-art facility supports AI research initiatives...",
         category: "Zonal",
         image: "photo-1605810230434-7631ac76ec81",
      },
   ];

   const handleShare = async () => {
      if (navigator.share) {
         try {
            await navigator.share({
               title: article.title,
               text: article.excerpt,
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
      <div className="min-h-screen bg-white">
         <Header />

         <article className="py-8 bg-background">
            <div className="container mx-auto px-4">
               <div className="max-w-4xl mx-auto">
                  {/* Back button */}
                  <div className="flex items-center justify-between mb-6">
                     <Link to="/zonal" className="">
                        <ChevronLeftIcon className="size-6 text-primary_text" />
                     </Link>
                     <div className="flex items-center gap-6">
                        <BookmarkIcon className="size-6 text-primary_text" />
                        <button
                           onClick={handleShare}
                           className="cursor-pointer"
                        >
                           <ShareIcon className="size-6 text-primary_text" />
                        </button>
                        <EllipsisVerticalIcon className="size-6 text-primary_text" />
                     </div>
                  </div>

                  {/* Article Header */}
                  <div className="mb-8">
                     <div className="mb-4">
                        <span className="bg-surface font-secondary text-primary_text px-3 py-1 text-sm font-medium uppercase tracking-wide">
                           {article.category}
                        </span>
                     </div>

                     <h1 className="text-headline_medium font-bold text-primary_text mb-3 leading-tight">
                        {article.title}
                     </h1>

                     <div className="flex items-center justify-between border-b border-primary_text/10 pb-6">
                        <div className="flex items-center space-x-6 text-gray-600 text-sm">
                           <div className="flex flex-col">
                              <p className="font-medium text-primary_text text-body_medium">
                                 {article.author}
                              </p>
                              <p className="text-body_small text-secondary_text">
                                 Published {article.date} • {article.readTime}
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Featured Image */}
                  <div className="mb-8">
                     <img
                        src={`https://images.unsplash.com/${article.image}?w=1200&q=80`}
                        alt={article.title}
                        className="w-full h-64 md:h-96 object-cover"
                     />
                  </div>

                  {/* Article Content */}
                  <div className="bg-white mb-12">
                     <div
                        className="prose prose-lg max-w-none bg-background text-primary_text leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                     />
                  </div>

                  {/* Related Articles */}
                  <div className="border-t border-primary_text/10 pt-8">
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
                  </div>

                  <Newsletter />
               </div>
            </div>
         </article>

         <Footer />
      </div>
   );
};

export default NewsDetail;
