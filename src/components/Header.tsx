import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import {
   HomeIcon,
   ChevronRightIcon,
   GlobeEuropeAfricaIcon,
   UserGroupIcon,
   BuildingLibraryIcon,
} from "@heroicons/react/24/solid";

const links = [
   { to: "/", label: "Home", icon: HomeIcon },
   { to: "/zonal", label: "Zonal", icon: GlobeEuropeAfricaIcon },
   { to: "/national", label: "National", icon: BuildingLibraryIcon },
   { to: "/executives", label: "Executives", icon: UserGroupIcon },
];

const Header = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <header className="bg-surface shadow-sm sticky top-0 z-50 transition-colors duration-300 font-secondary">
         <div className="container mx-auto px-4 max-w-7xl">
            {/* Top bar with logo and main nav */}
            <div className="flex items-center justify-between py-3 min-h-[60px]">
               <Link
                  to="/"
                  className="flex items-center space-x-2 group shrink-0"
               >
                  <img src="/logo.png" className="w-20" />

                  <div className="flex flex-col">
                     <span className="opacity-85 text-title_large font-bold uppercase text-primary-text tracking-tight transition-colors duration-300">
                        Nans Zone B
                     </span>
                     <span className="text-secondary_text uppercase text-label_small -mt-0.5 transition-colors duration-300">
                        South-South Region
                     </span>
                  </div>
               </Link>

               <div className="hidden lg:flex items-center space-x-6 flex-1 justify-end">
                  <nav className="flex items-center space-x-2 xl:space-x-4 font-secondary">
                     {links.map((link) => (
                        <NavLink
                           key={link.to}
                           to={link.to}
                           className={({ isActive }) =>
                              isActive
                                 ? "bg-primary_text text-primary rounded-lg px-3 py-1 font-secondary"
                                 : "text-title_medium text-primary_text font-secondary transition-all duration-300 text-sm tracking-wide transform hover:bg-primary-text hover:text-primary rounded-lg px-3 py-1"
                           }
                        >
                           {link.label}
                           <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-hover transition-all duration-300 group-hover:w-full"></span>
                        </NavLink>
                     ))}
                  </nav>
               </div>

               <button
                  onClick={toggleMenu}
                  className="lg:hidden p-2 rounded transition-all duration-300 shrink-0"
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
                        <NavLink
                           key={link.to}
                           to={link.to}
                           className={({ isActive }) =>
                              isActive
                                 ? "bg-primary_text text-primary rounded-lg p-3"
                                 : "text-title_medium text-primary_text transition-all duration-300 text-sm tracking-wide transform p-3 hover:bg-primary_text hover:text-primary rounded-lg"
                           }
                           style={{ animationDelay: `${index * 0.1}s` }}
                           onClick={() => setIsMenuOpen(false)}
                        >
                           {({ isActive }) => (
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-2">
                                    {link.icon && (
                                       <link.icon className="w-5 h-5" />
                                    )}
                                    <p className="ml-2">{link.label}</p>
                                 </div>

                                 {!isActive && (
                                    <ChevronRightIcon className="w-4 h-4" />
                                 )}
                              </div>
                           )}
                        </NavLink>
                     ))}
                  </nav>
               </div>
               <div></div>
            </div>
         </div>
      </header>
   );
};

export default Header;
