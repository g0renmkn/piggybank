'use client';
/**
 * searchbar.tsx
 * 
 * SearchBar component to search for queries
 * 
 */
import {
    Search as SearchIcon
} from '@mui/icons-material';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';


/**
 * <SearchBar />
 * 
 * @param className additional CSS properties
 * @param queryParam URL parameter name to be used as a query keywords. By default it will be 'query'
 *  
 * @returns <SearchBar /> Component
 * 
 */
export default function SearchBar(
{
    className, 
    queryParam
}: {
    className?: string;
    queryParam?: string;
}) {
    const queryVar = queryParam || "query";
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentQuery = Number(searchParams.get(queryVar)) || "";
    const { replace } = useRouter();

    /* Function to apply the change made in the search box */
    const onQueryChange = useDebouncedCallback((query: string) => {
        const params = new URLSearchParams(searchParams);

        if( query ) {
            params.set(queryVar, query.toString());
        }
        else {
            params.delete(queryVar);
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className={`${className} relative`}>
            <label htmlFor="search" className="sr-only">Search</label>
            <input
                className={`pl-8 rounded-md border-primary-dark text-xs bg-background-1 w-full focus:ring-primary-normal focus:border-primary-normal placeholder:text-primary-dark`}
                placeholder="Search keyword..."
                onChange={(e) => onQueryChange(e.target.value)}
                defaultValue={currentQuery}
            />
            <SearchIcon className="absolute left-1 top-1 text-primary-dark" />
        </div>
    )
}