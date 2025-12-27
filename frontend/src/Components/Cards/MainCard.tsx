type MainCardType = {
   ClassName?: string;
   children: React.ReactNode;
   color?: string;
};

export default function MainCard({
   ClassName,
   children,
   color="bg-purple-500/25",
}: MainCardType) {
   return (
      <div
         className={`text-white  ${color} backdrop-blur-md border border-purple-300/30 px-5 py-3 rounded-2xl shadow-lg ${ClassName}`}
      >
         {children}
      </div>
   );
}
