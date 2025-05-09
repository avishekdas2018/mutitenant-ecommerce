import { ReactNode, Suspense } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./footer";
import { SearchFilters, SearchFiltersSkeleton } from "./search-filters";

import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';



interface HomeLayoutProps { 
  children: ReactNode;
}


const HomeLayout = async ({ children }: HomeLayoutProps) => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions(),
  );
    
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton/>}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#F4F4F0]">
        {children}
      </div>
      <Footer />
    </div>
  );
}



export default HomeLayout;