interface ListProps {
   children: React.ReactNode;
}

export default function List({ children }: ListProps) {
   return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:grid-cols-3">
         {children}
      </ul>
   );
}
