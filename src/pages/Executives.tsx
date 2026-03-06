import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
   AdjustmentsHorizontalIcon,
   MagnifyingGlassIcon,
   UserGroupIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Executives() {
   const [isFilterOpen, setIsFilterOpen] = useState(false);
   console.log(isFilterOpen);

   return (
      <div className="min-h-screen">
         <Header />

         <section className="bg-surface">
            <div className="container mx-auto px-4 py-4 font-secondary text-primary_text">
               <div className="flex items-center justify-between">
                  <div className="uppercase text-label_small text-primary_text">
                     <p className="text-label_small text-primary_text">
                        Executive Directory
                     </p>
                     <p className="text-headline_medium text-primary_text font-medium">
                        NANS Zone B
                     </p>
                  </div>
                  <div className="bg-primary_text grid items-center justify-center p-2 rounded-lg">
                     <UserGroupIcon className="size-6 text-background" />
                  </div>
               </div>

               <p className="text-secondary_text">
                  Official leadership portal for the National Association of
                  Nigerian Students (Zone B). Know your representatives.
               </p>
            </div>
         </section>

         <section className="bg-background">
            <div className="container mx-auto px-4 py-8">
               <div className="relative flex items-center gap-4">
                  <input
                     type="text"
                     placeholder="Search by name or office"
                     className="w-full md:w-auto bg-surface text-primary_text pl-8 py-2 focus:outline-none focus:ring-1 focus:border-transparent"
                  />
                  <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-primary_text" />
                  <div
                     className="relative bg-surface p-2 border border-secondary_text/10 cursor-pointer hover:bg-surface/70"
                     onClick={() => setIsFilterOpen(true)}
                  >
                     <AdjustmentsHorizontalIcon className="size-6 text-primary_text" />

                     {isFilterOpen && (
                        <div className="absolute top-0 left-0 bg-surface border border-secondary_text/10 shadow-lg p-4 hidden">
                           <p className="text-label_small text-primary_text font-medium">
                              Filter by Office
                           </p>
                        </div>
                     )}
                  </div>
               </div>

               <div className="flex items-center justify-between mt-6 mb-3 font-medium">
                  <p className="text-label_large text-secondary_text font-secondary font-medium uppercase">
                     Core Executives
                  </p>
               </div>

               <div className="flex items-center flex-col md:flex-row md:flex-wrap gap-6">
                  {[
                     {
                        image: "photo-1605810230434-7631ac76ec81",
                        name: "John Doe",
                        position: "President",
                     },
                     {
                        image: "photo-1605810230434-7631ac76ec81",
                        name: "Jane Smith",
                        position: "VDC",
                     },
                     {
                        image: "photo-1605810230434-7631ac76ec81",
                        name: "Friday Zula",
                        position: "DC",
                     },
                  ].map((exec) => (
                     <div className="bg-surface p-4 w-full md:w-44 rounded-md shadow-sm flex flex-col items-center justify-center gap-2">
                        <div className="w-30 aspect-square rounded-full">
                           <img
                              src={`https://images.unsplash.com/${exec.image}?w=1200&q=80`}
                              className="w-30 aspect-square rounded-full object-cover"
                              alt="executive_image"
                           />
                        </div>
                        <div className="text-center">
                           <p className="text-title_small text-primary_text font-primary font-bold">
                              {exec.name}
                           </p>
                           <p className="text-secondary_text bg-background px-1 py-1 mt-1 border border-secondary_text/50 font-bold font-secondary text-label_small">
                              {exec.position}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         <Footer />
      </div>
   );
}
