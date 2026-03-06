export default function Newsletter() {
   return (
      <div className="bg-primary_text text-title_medium text-background mt-14 p-2 flex flex-col md:flex-row items-center justify-between">
         <div className="text-center md:text-left">
            <p className="font-secondary font-bold">Stay Updated</p>
            <p className="font-primary text-body_small">
               Get the latest student news and policy updates delivered to your
               inbox.
            </p>
         </div>
         <div className="mt-4 md:mt-0">
            <input
               type="email"
               placeholder="Email address"
               className="bg-surface text-primary_text border rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent"
            />
            <button className="bg-transparent text-on_primary px-4 py-2 transition-colors">
               Join
            </button>
         </div>
      </div>
   );
}
