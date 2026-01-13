export default function PriceingCards() {
   return (
      <div>
         <div className="flex mt-4 px-5 py-3 border-accent-500/40 border-1 rounded-2xl gap-5">
            {/* toggle dif */}
            <div className="flex gap-3 justify-center items-center">
               <div className=" rounded-full border-white/50 border-1 h-6 w-6 flex items-center justify-center">
                  <div className=" rounded-full bg-accent-500 h-3 w-3 "></div>
               </div>
               <p className="text-white">Monthly</p>
            </div>
            <div className="flex gap-3 justify-center items-center">
               <div className=" rounded-full border-white/50 border-1 h-6 w-6 flex items-center justify-center">
                  <div className=" rounded-full bg-accent-500 h-3 w-3 "></div>
               </div>
               <p className="text-white">Anually</p>
               <p className="text-white/60">Save 15%</p>
            </div>
         </div>
      </div>
   );
}
