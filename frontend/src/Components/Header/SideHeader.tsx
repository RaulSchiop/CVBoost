import ContrastBtn from "../Buttons/ContrastButtonCta";
import MainBtn from "../Buttons/MainBtn";
import Logo from "../Logo/Logo";

export default function SideBarHeader() {
   return (
      <div>
         <Logo></Logo>

         <ContrastBtn>
            <a className="font-bold ">+</a>
            <h1>Create New Resume</h1>
         </ContrastBtn>
         <ul></ul>
      </div>
   );
}
