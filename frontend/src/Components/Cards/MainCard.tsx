type MainCardType = {
   ClassName?: string;
   children: React.ReactNode;
};

export default function MainCard({ ClassName, children }: MainCardType) {
   return (
      <div
         className={`text-white  bg-purple-500/25 backdrop-blur-md border border-purple-300/30 px-5 py-3 rounded-2xl shadow-lg ${ClassName}`}
      >
         {children}
      </div>
   );
}
