import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import { ReactNode } from "react";

interface NavbarItemsProps {
  link: string;
  children: ReactNode;
}


interface NavBarProps {
  items: NavbarItemsProps[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export const NavBarSidebar = ({ items, open, onOpenChange }: NavBarProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
            <SheetTitle>
              Menu
            </SheetTitle>
          
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link onClick={() => onOpenChange(false)} key={item.link} href={item.link} className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium transition-colors duration-200">
              {item.children}
            </Link>
          ))}

          <div className="border-t" >
            <Link onClick={() => onOpenChange(false)} href={"/sign-in"} className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium transition-colors duration-200">
              Log in
            </Link>
            <Link onClick={() => onOpenChange(false)} href={"/sign-up"} className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium transition-colors duration-200">
              Start Selling
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}


