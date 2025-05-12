import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from "next/link"

interface BreadcrumbNavigationProps {
  activeCategoryName?: string | null
  activeSubcategoryName?: string | null
  activeCategory?: string | null
}


export const BreadcrumbNavigation = ({
  activeCategoryName,
  activeSubcategoryName,
  activeCategory,
}: BreadcrumbNavigationProps) => {
  if (!activeCategoryName || activeCategory === "all" ) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {activeSubcategoryName ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="text-xl underline font-medium text-primary">
                <Link href={`/${activeCategory}`}> {activeCategoryName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="font-medium text-primary text-xl"> / </BreadcrumbSeparator>
            
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xl font-medium">
                {activeSubcategoryName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ): (
          <BreadcrumbItem>
              <BreadcrumbPage className="text-xl font-medium">
                {activeCategoryName}
              </BreadcrumbPage>
            </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}