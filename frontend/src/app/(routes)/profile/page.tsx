import Footer from "@/Components/Footer/Footer";

export default function ProfilePage() {
   return (
      <div className="min-h-screen flex flex-col overflow-x-hidden">
         <div className=" w-screen bg-black pt-40 px-5 md:px-20  flex flex-col items-center justify-center">
            <h1 className="text-white">Edit Profile</h1>
         </div>
         <Footer></Footer>
      </div>
   );
}
