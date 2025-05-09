"use client"

import { useTRPC } from "@/trpc/client";

import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";



export const SearchFilters = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col w-full gap-4" style={{ backgroundColor: "#F5F5F5"}}>
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />

      </div>
    </div>
  )
}


export const SearchFiltersSkeleton = () => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col w-full gap-4" style={{ backgroundColor: "#F5F5F5"}}>
      <SearchInput disabled />
      <div className="hidden lg:block">
        <Skeleton className="h-11"/>
      </div>
    </div>
  )
}