import { Link } from "react-router";
import {
   Facebook,
   Instagram,
   Mail,
   Phone,
   MapPin,
   Twitter,
} from "lucide-react";

const Footer = () => {
   return (
      <footer className="bg-background text-primary_text">
         <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
               {/* Brand Section */}
               <div className="lg:col-span-2">
                  <Link to="/" className="flex items-center space-x-3 mb-2">
                     <div className="">
                        {/* <Play className="w-6 h-6 text-white" /> */}
                        <img src="/logo.png" className="w-20" />
                     </div>
                     <div>
                        <span className="opacity-85 text-title_medium uppercase font-bold">
                           NANS ZONE B
                        </span>
                     </div>
                  </Link>
                  <p className="text-secondary_text max-w-2xl text-body_small mb-3">
                     The official portal for the National Association of
                     Nigerian Students, South-South Zone. Stay updated with the
                     latest news, events, and initiatives from our vibrant
                     student community. Join us in shaping the future of
                     Nigerian students in the South-South region.
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
               {/* Quick Links */}
               <div>
                  <h3 className="text-lg font-bold mb-2">Quick Links</h3>
                  <ul className="space-y-2">
                     {[
                        { to: "/", label: "Home" },
                        { to: "/zonal", label: "Zonal" },
                        { to: "/national", label: "National" },
                        { to: "/executives", label: "Executives" },
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
               <div className="">
                  <h3 className="text-lg font-bold mb-2">Contact Us</h3>
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

               {/* Socials */}
               <div className="">
                  <h3 className="text-lg font-bold mb-3">Socials</h3>
                  <div className="flex items-center gap-4">
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

               {/* Legal */}
               <div>
                  <h3 className="text-lg font-bold mb-2">Legal</h3>
                  <ul className="space-y-2">
                     {[
                        { to: "/privacy-policy", label: "Privacy Policy" },
                        { to: "/terms", label: "Terms of Use" },
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
            </div>

            <div className="border-t border-gray-100/20 pt-6 text-center">
               <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} NANS Zone B. All rights rights
                  reserved.
               </p>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
