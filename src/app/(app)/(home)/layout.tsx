import { ReactNode } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./footer";


interface HomeLayoutProps { 
  children: ReactNode;
}


const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 bg-[#F4F4F0]">
        {children}

      </div>
      <Footer />
    </div>
  );
}



export default HomeLayout;