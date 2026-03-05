import { Link } from "react-router";
import {
   Facebook,
   Instagram,
   Twitter,
   // Play,
   Mail,
   Phone,
   MapPin,
} from "lucide-react";

const Footer = () => {
   return (
      <footer className="bg-dark-green text-white">
         <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
               {/* Brand Section */}
               <div className="lg:col-span-2">
                  <Link to="/" className="flex items-center space-x-3 mb-6">
                     <div className="">
                        {/* <Play className="w-6 h-6 text-white" /> */}
                        <img src="/logo.png" className="w-20" />
                     </div>
                     <div>
                        <span className="opacity-85 text-2xl font-bold">
                           NANS-ZONE-B
                        </span>
                        <span className="block text-sm text-gray-400">
                           South-South
                        </span>
                     </div>
                  </Link>
                  <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                     Your premier source for{" "}
                     <span className="font-bold">NANS(ZONE B)</span> news and
                     updates. Keeping the community informed about{" "}
                     <span className="font-bold">NANS(ZONE B) </span>
                     activities, announcements, and important developments.
                  </p>
                  <div className="flex space-x-4">
                     <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                     >
                        <Facebook className="w-5 h-5" />
                     </a>
                     <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                     >
                        <Twitter className="w-5 h-5" />
                     </a>
                     <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                     >
                        <Instagram className="w-5 h-5" />
                     </a>
                  </div>
               </div>

               {/* Quick Links */}
               <div>
                  <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                     {[
                        { to: "/", label: "Home" },
                        { to: "/faculty", label: "Nans Zone B" },
                        { to: "/department", label: "Nans National Politics" },
                        // { to: "/state", label: "State News" },
                        // { to: "/national", label: "National News" },
                     ].map((link) => (
                        <li key={link.to}>
                           <Link
                              to={link.to}
                              className="text-gray-400 hover:text-white transition-colors text-sm"
                           >
                              {link.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Contact Info */}
               <div>
                  <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                  <div className="space-y-3">
                     <div className="flex items-start space-x-3 text-gray-400 text-sm">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>South South</span>
                     </div>
                     <div className="flex items-center space-x-3 text-gray-400 text-sm">
                        <Mail className="w-4 h-4" />
                        <span>info@nanszoneb.org</span>
                     </div>
                     <div className="flex items-center space-x-3 text-gray-400 text-sm">
                        <Phone className="w-4 h-4" />
                        <span>+234 (0) 803 123 4567</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="border-t border-gray-100/20 pt-6 text-center">
               <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()}{" "}
                  <span className="font-bold">NANS(ZONE B)</span>. All rights
                  reserved. Powered by{" "}
                  <span className="font-bold">NANS(ZONE B), South South.</span>
               </p>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
