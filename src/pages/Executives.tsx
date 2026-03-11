import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getExecutives } from "@/services/create-executive";
import {
   AdjustmentsHorizontalIcon,
   MagnifyingGlassIcon,
   UserGroupIcon,
} from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

export default function Executives({ type }: { type: "zonal" | "jcc" }) {
   // send a fetch with the zone
   const [searchParams, setSearchParams] = useSearchParams();
   const year = searchParams.get("year") || new Date().getFullYear().toString();

   const [isFilterOpen, setIsFilterOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);

   const { data: executives } = useQuery({
      queryKey: ["executives", type, year],
      queryFn: () => getExecutives({ type, year }),
      retry: false,
   });

   useEffect(() => {
      function handleClickOutside(e: MouseEvent) {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(e.target as Node)
         ) {
            setIsFilterOpen(false);
         }
      }

      document.addEventListener("click", handleClickOutside);

      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, []);

   function updateFilter(key: string, value: string) {
      const params = new URLSearchParams(searchParams);

      if (value) params.set(key, value);
      else params.delete(key);

      setSearchParams(params);
   }

   return (
      <div className="min-h-screen">
         <Header />

         <section className="bg-surface">
            <div className="container mx-auto px-4 py-4 font-secondary text-primary_text">
               <div className="flex items-center justify-between">
                  <div className="uppercase text-label_small text-primary_text">
                     <p className="text-label_small text-primary_text">
                        {type === "zonal"
                           ? "Zonal Executive Directory"
                           : "JCC Executive Directory"}
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

                  <div ref={dropdownRef} className="relative">
                     <button
                        onClick={() => setIsFilterOpen((prev) => !prev)}
                        className="bg-surface p-2 border border-secondary_text/10 cursor-pointer hover:bg-surface/70"
                     >
                        <AdjustmentsHorizontalIcon className="size-6 text-primary_text" />
                     </button>

                     {isFilterOpen && (
                        <div className="absolute right-0 top-[calc(100%+0.25rem)] p-4 rounded-md bg-surface text-primary_text shadow-xl w-56 space-y-4">
                           {/* Filter by Year */}
                           <div>
                              <p className="text-label_small font-semibold mb-2 uppercase text-secondary_text">
                                 Filter by Year
                              </p>

                              <select
                                 name="year"
                                 value={year}
                                 className="w-full bg-surface border border-secondary_text/20 rounded-md px-2 py-2 text-body_small focus:outline-none focus:ring-1 focus:ring-primary_text"
                                 onChange={(e) =>
                                    updateFilter("year", e.target.value)
                                 }
                              >
                                 <option value={new Date().getFullYear()}>
                                    {new Date().getFullYear()}
                                 </option>
                                 {[2025, 2024].map((y) => (
                                    <option key={y} value={y}>
                                       {y}
                                    </option>
                                 ))}
                              </select>
                           </div>
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
                  {executives?.success &&
                     executives.data.map((exec) => (
                        <div className="bg-surface p-4 w-full md:w-44 rounded-md shadow-sm flex flex-col items-center justify-center gap-2">
                           <div className="w-30 aspect-square rounded-full">
                              <img
                                 src={exec.image_url}
                                 className="w-30 aspect-square rounded-full object-cover"
                                 alt="executive_image"
                              />
                           </div>
                           <div className="text-center mt-2">
                              <p className="text-label_medium text-primary_text font-primary overflow-hidden overflow-ellipsis">
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
