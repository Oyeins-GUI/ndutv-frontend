import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import {
   HomeIcon,
   ChevronRightIcon,
   GlobeEuropeAfricaIcon,
   UserGroupIcon,
   BuildingLibraryIcon,
   ChevronDownIcon,
} from "@heroicons/react/24/solid";
import ThemeToggle from "./ThemeToggle";

const links = [
   { to: "/", label: "Home", icon: HomeIcon },
   { to: "/zonal", label: "Zonal", icon: GlobeEuropeAfricaIcon },
   { to: "/national", label: "National", icon: BuildingLibraryIcon },
   {
      to: "/executives",
      label: "Executives",
      icon: UserGroupIcon,
      children: [
         { to: "/executives/zonal", label: "Zonal Executives" },
         { to: "/executives/jcc", label: "JCC Executives" },
      ],
   },
];

const Header = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [openDropdown, setOpenDropdown] = useState<string | null>(null);

   const toggleNavDropdown = (path: string) => {
      setOpenDropdown((prev) => (prev === path ? null : path));
   };

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <header className="bg-surface shadow-sm z-50 transition-colors duration-300 font-secondary">
         <div className="container mx-auto px-4 max-w-7xl">
            {/* Top bar with logo and main nav */}
            <div className="flex items-center justify-between py-3 min-h-[60px]">
               <Link
                  to="/"
                  className="flex items-center space-x-2 group shrink-0"
               >
                  <img src="/logo.png" className="w-20" />

                  <div className="flex flex-col">
                     <span className="opacity-85 text-title_large font-bold uppercase text-primary_text tracking-tight transition-colors duration-300">
                        Nans Zone B
                     </span>
                     <span className="text-secondary_text uppercase text-label_small -mt-0.5 transition-colors duration-300">
                        South-South Region
                     </span>
                  </div>
               </Link>

               <div className="hidden lg:flex items-center space-x-6 flex-1 justify-end">
                  <nav className="hidden md:flex items-center gap-6">
                     {links.map((link) => {
                        const isOpen = openDropdown === link.to;

                        const isChildActive =
                           link.children?.some((child) =>
                              location.pathname.startsWith(child.to),
                           ) ?? false;

                        const isParentActive =
                           location.pathname.startsWith(link.to) ||
                           isChildActive;

                        if (!link.children) {
                           return (
                              <NavLink
                                 key={link.to}
                                 to={link.to}
                                 className={({ isActive }) =>
                                    `text-sm font-medium transition ${
                                       isActive
                                          ? "text-primary_text "
                                          : "text-primary_text hover:text-secondary_text"
                                    }`
                                 }
                              >
                                 {link.label}
                              </NavLink>
                           );
                        }

                        return (
                           <div key={link.to} className="relative">
                              <button
                                 onClick={() => toggleNavDropdown(link.to)}
                                 className={`flex items-center gap-1 text-sm font-medium transition ${
                                    isParentActive
                                       ? "text-primary_text"
                                       : "text-primary_text hover:text-secondary_text"
                                 }`}
                              >
                                 {link.label}

                                 <ChevronDownIcon
                                    className={`w-4 h-4 transition-transform ${
                                       isOpen ? "rotate-180" : ""
                                    }`}
                                 />
                              </button>

                              {isOpen && (
                                 <div className="absolute top-full right-0 mt-2 w-48 bg-surface shadow-lg rounded-md py-2 z-50">
                                    {link.children.map((child) => (
                                       <NavLink
                                          key={child.to}
                                          to={child.to}
                                          className={({ isActive }) =>
                                             `block px-4 py-2 text-sm transition ${
                                                isActive
                                                   ? "bg-primary_text text-background hover:text-primary/80"
                                                   : "text-primary_text hover:bg-surface/50 hover:text-secondary_text"
                                             }`
                                          }
                                       >
                                          {child.label}
                                       </NavLink>
                                    ))}
                                 </div>
                              )}
                           </div>
                        );
                     })}
                  </nav>
                  <ThemeToggle />
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
               <div className="border-t border-surface pt-4">
                  <nav className="flex flex-col space-y-3">
                     {links.map((link) => {
                        const isOpen = openDropdown === link.to;

                        return (
                           <div key={link.to} className="flex flex-col">
                              {/* If link has children → Button */}
                              {link.children ? (
                                 <button
                                    onClick={() => toggleNavDropdown(link.to)}
                                    className="text-title_medium text-primary_text transition-all duration-300 text-sm tracking-wide transform p-3 hover:bg-background hover:text-primary rounded-lg flex items-center justify-between"
                                 >
                                    <div className="flex items-center gap-2 ">
                                       {link.icon && (
                                          <link.icon className="w-5 h-5" />
                                       )}
                                       <p>{link.label}</p>
                                    </div>

                                    <ChevronRightIcon
                                       className={`w-4 h-4 transition-transform duration-300 ${
                                          isOpen ? "rotate-90" : ""
                                       }`}
                                    />
                                 </button>
                              ) : (
                                 /* If link has no children → NavLink */
                                 <NavLink
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                       `flex items-center gap-2 p-3 rounded-lg text-sm transition-all duration-300 ${
                                          isActive
                                             ? "bg-primary_text text-background"
                                             : "text-primary_text hover:bg-primary_text hover:text-primary"
                                       }`
                                    }
                                 >
                                    {link.icon && (
                                       <link.icon className="w-5 h-5" />
                                    )}
                                    <p>{link.label}</p>
                                 </NavLink>
                              )}

                              {/* Children */}
                              {link.children && (
                                 <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                       isOpen
                                          ? "max-h-40 opacity-100"
                                          : "max-h-0 opacity-0"
                                    }`}
                                 >
                                    <div className="ml-8 flex flex-col gap-2 pt-2">
                                       {link.children.map((child) => (
                                          <NavLink
                                             key={child.to}
                                             to={child.to}
                                             onClick={() =>
                                                setIsMenuOpen(false)
                                             }
                                             className={({ isActive }) =>
                                                `text-sm rounded-md px-2 py-1 ${
                                                   isActive
                                                      ? "bg-primary_text text-background"
                                                      : "text-secondary_text hover:text-primary_text"
                                                }`
                                             }
                                          >
                                             {child.label}
                                          </NavLink>
                                       ))}
                                    </div>
                                 </div>
                              )}
                           </div>
                        );
                     })}
                  </nav>
                  <ThemeToggle />
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
