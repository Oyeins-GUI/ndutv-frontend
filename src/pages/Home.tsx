import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import NewsSection from "../components/NewsSection";
import Footer from "../components/Footer";

const Home = () => {
   return (
      <div className="min-h-screen bg-gray-50">
         <Header />
         <HeroSection />
         <NewsSection title="Recent News" category="all" />
         <Footer />
      </div>
   );
};

export default Home;
