import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ChevronLeft, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface CategorySidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}



export const CategoriesSidebar = ({ open, onOpenChange }: CategorySidebarProps) => {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.categories.getMany.queryOptions())
  const router = useRouter()
  const [parentCategories, setParentCategories] = useState<CategoriesGetManyOutput | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoriesGetManyOutput[1] | null>(null);

  const currentCategory = parentCategories ?? data ?? []

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null);
    setParentCategories(null);
    onOpenChange(open);
  }


  const handleCategoryClick = (category: CategoriesGetManyOutput[1]) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CategoriesGetManyOutput);
      setSelectedCategory(category);
    } else {
      // This is a leaf category, handle it as needed
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`)
      } else {
        if (category.slug === "all") {
          router.push("/")
        } else {
          router.push(`/${category.slug}`)
        }
      }
      handleOpenChange(false)
    }
  }


  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  }


  const backgroundColor = selectedCategory?.color || "white";
  return (
    <Sheet open={open} onOpenChange={handleOpenChange} >
      <SheetContent style={{ backgroundColor }} side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>
            Categories
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium" onClick={handleBackClick}>
              <ChevronLeft className="size-4 mr-2"/>
              Back
            </button>
          )}
          {currentCategory.map((category) => (
            <button onClick={() => handleCategoryClick(category)} key={category.slug} className="w-full cursor-pointer text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium">
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4 mr-2"/>
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent> 
    </Sheet>
  )
}