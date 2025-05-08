import { ReactNode } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./footer";
import { SearchFilters } from "./search-filters";


import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Category } from "@/payload-types";
import { CustomCategory } from "./types";


interface HomeLayoutProps { 
  children: ReactNode;
}


const HomeLayout = async ({ children }: HomeLayoutProps) => {

    const payload = await getPayload({
      config: configPromise,
    })
  
    const data = await payload.find({
      collection: 'categories',
      depth: 1,
      pagination: false,
      where: {
        parent: {
          exists: false
        }
      },
      sort: "name"
    })

    const formattedData: CustomCategory[] = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        ...(doc as Category),
        subcategories: undefined
      }))
    }))

    
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">
        {children}
      </div>
      <Footer />
    </div>
  );
}



export default HomeLayout;