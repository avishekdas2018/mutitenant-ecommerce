"use client";
import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";

import { CategoriesSidebar } from "./category-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  disabled?: boolean;

}



export const SearchInput = ({ disabled }: SearchInputProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setSidebarOpen}/>
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500"/>
        <Input className="pl-8" placeholder="Search Products" disabled={disabled}/>
      </div>
      {/* TODO: Add categories view all button */}
      <Button variant={"elevated"} className="size-12 shrink-0 lg:hidden" onClick={() => setSidebarOpen(true)}>
        <ListFilterIcon/>
      </Button> 
      {/* TODO: Add library button */}
    </div>
  )
}