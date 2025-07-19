import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import NewsSection from "../components/NewsSection";
import Footer from "../components/Footer";

const Index = () => {
   return (
      <div className="min-h-screen bg-gray-50">
         <Header />
         <HeroSection />
         <NewsSection title="Latest News" category="all" />
         <NewsSection title="Trending Stories" category="trending" />
         <Footer />
      </div>
   );
};

export default Index;
