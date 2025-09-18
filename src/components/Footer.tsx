import { Link } from "react-router";
import {
   Facebook,
   Instagram,
   Twitter,
   Play,
   Mail,
   Phone,
   MapPin,
} from "lucide-react";

const Footer = () => {
   return (
      <footer className="bg-gray-900 text-white">
         <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
               {/* Brand Section */}
               <div className="lg:col-span-2">
                  <Link to="/" className="flex items-center space-x-3 mb-6">
                     <div className="bg-red-600 p-3 rounded">
                        <Play className="w-6 h-6 text-white" />
                     </div>
                     <div>
                        <span className="text-2xl font-bold">NDUtv</span>
                        <span className="block text-sm text-gray-400">
                           University News
                        </span>
                     </div>
                  </Link>
                  <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                     Your premier source for university news and updates.
                     Keeping the NDU community informed about SUG activities,
                     faculty announcements, and important campus developments.
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
                        { to: "/sug", label: "SUG News" },
                        { to: "/faculty", label: "Faculty Updates" },
                        { to: "/department", label: "Department News" },
                        { to: "/state", label: "State News" },
                        { to: "/national", label: "National News" },
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
                        <span>Niger Delta University, Wilberforce Island</span>
                     </div>
                     <div className="flex items-center space-x-3 text-gray-400 text-sm">
                        <Mail className="w-4 h-4" />
                        <span>news@ndutv.edu.ng</span>
                     </div>
                     <div className="flex items-center space-x-3 text-gray-400 text-sm">
                        <Phone className="w-4 h-4" />
                        <span>+234 (0) 803 123 4567</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="border-t border-gray-800 pt-6 text-center">
               <p className="text-gray-400 text-sm">
                  © 2024 NDUtv. All rights reserved. Powered by Student Union
                  Government, Niger Delta University.
               </p>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
