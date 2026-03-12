import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import NewsSection from "../components/NewsSection";
import Footer from "../components/Footer";
import { useArticle } from "@/hooks/use-article";

const Home = () => {
   const { articles, isLoading } = useArticle();

   const hasArticles = Array.isArray(articles) && articles.length > 0;

   return (
      <div className="min-h-screen bg-gray-50">
         <Header />

         {isLoading ? (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
               <div className="w-9 aspect-square rounded-full border-4 border-primary_text border-t-transparent animate-spin"></div>
            </div>
         ) : hasArticles ? (
            <>
               <HeroSection />
               <NewsSection title="Recent News" category="all" />
            </>
         ) : (
            <div className="min-h-screen flex items-center justify-center text-center py-10 text-primary_text bg-background">
               No articles available
            </div>
         )}

         <Footer />
      </div>
   );
};

export default Home;
