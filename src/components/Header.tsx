import { useState } from "react";
import { Link } from "react-router";
import { Menu, X, Search, Play } from "lucide-react";
// import ThemeToggle from "./ThemeToggle";

const links = [
   { to: "/sug", label: "SUG" },
   { to: "/faculty", label: "Faculty" },
   { to: "/department", label: "Department" },
   { to: "/state", label: "State" },
   { to: "/national", label: "National" },
];

const Header = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
         <div className="container mx-auto px-4 max-w-7xl">
            {/* Top bar with logo and main nav */}
            <div className="flex items-center justify-between py-3 min-h-[60px]">
               <Link
                  to="/"
                  className="flex items-center space-x-2 group shrink-0"
               >
                  <div className="bg-red-600 p-2 rounded group-hover:bg-red-700 transition-all duration-300 group-hover:scale-105">
                     <Play className="w-5 h-5 text-white transform group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">
                        NDUtv
                     </span>
                     <span className="text-xs text-gray-400 -mt-0.5 transition-colors duration-300 hidden sm:block">
                        University News
                     </span>
                  </div>
               </Link>

               <div className="hidden lg:flex items-center space-x-6 flex-1 justify-end">
                  <nav className="flex space-x-4 xl:space-x-6">
                     {links.map((link) => (
                        <Link
                           key={link.to}
                           to={link.to}
                           className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 font-medium text-sm uppercase tracking-wide relative group"
                        >
                           {link.label}
                           <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                     ))}
                  </nav>

                  <div className="relative flex items-center space-x-3 shrink-0">
                     <input
                        type="search"
                        className="border-white border-2 w-xs bg-white p-1 rounded outline-none"
                        placeholder="Search..."
                     />
                     <Search className="absolute top-1/2 left-[90%] -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-point transition-all" />
                     {/* <ThemeToggle /> */}
                  </div>
               </div>

               <button
                  onClick={toggleMenu}
                  className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-all duration-300 shrink-0"
               >
                  <div className="relative w-6 h-6">
                     <Menu
                        className={`w-6 h-6 text-gray-700 dark:text-gray-300 absolute transition-all duration-300 ${
                           isMenuOpen
                              ? "opacity-0 rotate-180"
                              : "opacity-100 rotate-0"
                        }`}
                     />
                     <X
                        className={`w-6 h-6 text-gray-700 dark:text-gray-300 absolute transition-all duration-300 ${
                           isMenuOpen
                              ? "opacity-100 rotate-0"
                              : "opacity-0 -rotate-180"
                        }`}
                     />
                  </div>
               </button>
            </div>

            {/* Mobile menu */}
            <div
               className={`lg:hidden overflow-hidden transition-all duration-300 ${
                  isMenuOpen ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"
               }`}
            >
               <div className="border-t dark:border-gray-700 pt-4">
                  <nav className="flex flex-col space-y-3">
                     {links.map((link, index) => (
                        <Link
                           key={link.to}
                           to={link.to}
                           className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 py-2 px-2 text-sm font-medium uppercase tracking-wide transform hover:translate-x-2"
                           style={{ animationDelay: `${index * 0.1}s` }}
                           onClick={() => setIsMenuOpen(false)}
                        >
                           {link.label}
                        </Link>
                     ))}
                     {/* <div className="pt-4 border-t dark:border-gray-700 flex items-center justify-center">
                        <ThemeToggle />
                     </div> */}
                  </nav>
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
