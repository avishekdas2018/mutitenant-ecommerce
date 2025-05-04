
import { Categories } from "./categories";
import { SearchInput } from "./search-input";

interface SearchFiltersProps {
  data: any;
}


export const SearchFilters = ({ data }: SearchFiltersProps) => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col w-full gap-4">
      <SearchInput/>
      <Categories data={data} />
    </div>
  )
}