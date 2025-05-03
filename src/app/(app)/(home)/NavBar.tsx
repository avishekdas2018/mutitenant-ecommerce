"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { NavBarSidebar } from "./navbar-sidebar";
import { MenuIcon } from "lucide-react";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
})


interface NavbarItemProps {
  link: string;
  children: ReactNode;
  isActive?: boolean;
}

const NavbarItems = ({ link, children, isActive }: NavbarItemProps) => {
  return (
    <Button asChild variant={"outline"}
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive &&  "bg-black text-white hover:bg-black hover:text-white",
      )}>
        <Link href={link}>
          {children}
        </Link>
    </Button>
  )
}

const navbarItems = [
  { link: "/", children: "Home" },
  { link: "/about", children: "About" },
  { link: "/features", children: "Features" },
  { link: "/pricing", children: "Pricing" },
  { link: "/contact", children: "Contact" },
]

export const NavBar = () => {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <nav className="flex h-20 border-b font-medium justify-between bg-white">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          dumroad
        </span>
      </Link>

      <NavBarSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} items={navbarItems}/>
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItems key={item.link} link={item.link} isActive={pathname === item.link}>
            {item.children}
          </NavbarItems>
        ))}
      </div>

      <div className="hidden lg:flex">
        <Button asChild variant={"secondary"} className="border-l border-t-0 border-b-0 border-r-0 rounded-none px-12 h-full bg-white hover:bg-pink-400 transition-colors text-lg">
          <Link href={"/sign-in"}>
            Log in
          </Link>
        </Button>

        <Button asChild variant={"secondary"} className="border-l border-t-0 border-b-0 border-r-0 rounded-none px-12 h-full bg-black text-white hover:bg-yellow-400 hover:text-black transition-colors text-lg">
          <Link href={"/sign-up"}>
            Start selling
          </Link>
        </Button>
      </div>

      <div className="flex lg:hidden items-center justify-center">
        <Button variant={"ghost"} className="size-12 border-transparent bg-white" onClick={() => setIsSidebarOpen(true)}>
          <MenuIcon className="size-8"/>
        </Button>
      </div>
    </nav>
  );
}
