import { useParams, Link } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Calendar, User, Share2, ArrowLeft, Clock } from "lucide-react";

const NewsDetail = () => {
   const { id } = useParams();

   // Mock data - in real app, this would come from an API
   const article = {
      title: "SUG Announces New Student Welfare Initiatives for 2024 Academic Session",
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
      category: "SUG",
      author: "SUG Press Team",
      date: "2 hours ago",
      readTime: "5 min read",
   };

   const relatedArticles = [
      {
         title: "Faculty of Engineering Hosts Annual Tech Summit",
         excerpt: "Students showcase innovative projects in AI and robotics...",
         category: "Faculty",
      },
      {
         title: "New Research Lab Opens in Computer Science Department",
         excerpt:
            "State-of-the-art facility supports AI research initiatives...",
         category: "Department",
      },
   ];

   return (
      <div className="min-h-screen bg-white">
         <Header />

         <article className="py-8">
            <div className="container mx-auto px-4">
               <div className="max-w-4xl mx-auto">
                  {/* Back button */}
                  <Link
                     to="/"
                     className="inline-flex items-center text-red-600 hover:text-red-700 font-medium mb-6 text-sm uppercase tracking-wide"
                  >
                     <ArrowLeft className="w-4 h-4 mr-2" />
                     Back to Home
                  </Link>

                  {/* Article Header */}
                  <div className="mb-8">
                     <div className="mb-4">
                        <span className="bg-red-600 text-white px-3 py-1 text-sm font-medium uppercase tracking-wide">
                           {article.category}
                        </span>
                     </div>

                     <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {article.title}
                     </h1>

                     <div className="flex items-center justify-between border-b border-gray-200 pb-6">
                        <div className="flex items-center space-x-6 text-gray-600 text-sm">
                           <div className="flex items-center">
                              <User className="w-4 h-4 mr-2" />
                              <span className="font-medium">
                                 {article.author}
                              </span>
                           </div>
                           <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              {article.date}
                           </div>
                           <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {article.readTime}
                           </div>
                        </div>
                        <button className="flex items-center text-gray-600 hover:text-red-600 transition-colors text-sm">
                           <Share2 className="w-4 h-4 mr-2" />
                           Share
                        </button>
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
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                     />
                  </div>

                  {/* Related Articles */}
                  <div className="border-t border-gray-200 pt-8">
                     <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Related Articles
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {relatedArticles.map((article, index) => (
                           <div
                              key={index}
                              className="border-l-4 border-red-600 pl-4 hover:bg-gray-50 p-4 transition-colors"
                           >
                              <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                 {article.category}
                              </span>
                              <h3 className="font-bold text-gray-900 mb-2 hover:text-red-600 transition-colors">
                                 {article.title}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                 {article.excerpt}
                              </p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </article>

         <Footer />
      </div>
   );
};

export default NewsDetail;
