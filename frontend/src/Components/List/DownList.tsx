interface ListProps {
   children: React.ReactNode;
}

export default function DownList({ children }: ListProps) {
   return (
      <ul className="p-4 overflow-y-auto lg:overflow-y-hidden w-full h-full ">
         {children}
      </ul>
   );
}
