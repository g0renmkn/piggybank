'use client';

import { MagnifyingGlassIcon, ArrowPathIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';


/**
 * <Search />
 * 
 * @param param0 
 * @returns 
 */
export default function Search({ placeholder, defaultLimit }: { placeholder: string, defaultLimit: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  let selectedLimit = defaultLimit;

  /* Debounce query searching */
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '0');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  /* Change row limit */
  const changeLimit = (sel:any) => {
    const params = new URLSearchParams(searchParams);
    params.set('limit', sel.target.value)
    replace(`${pathname}?${params.toString()}`);
  }

  /* Debounce date from query*/
  const handleDF = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '0');
    if (term) {
      params.set('df', term);
    } else {
      params.delete('df');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  /* Debounce date to query*/
  const handleDT = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '0');
    if (term) {
      params.set('dt', term);
    } else {
      params.delete('dt');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  /* Resturn value */
  return (
    <div className="flex flex-col ">

      {/* First row of inputs */}
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className= "block w-full rounded-md border border-zinc-800 py-2 pl-10 text-sm outline-2 placeholder:text-zinc-500 focus:border-lime-500 focus:bg-lime-50 focus:ring-lime-500 bg-zinc-400 text-zinc-800"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

        <div className="px-3 flex flex-col">
          <label className="text-xs">Row Limit</label>
          <select 
              className="bg-zinc-400 rounded-md text-zinc-800 focus:bg-lime-50 focus:ring-lime-500 text-xs"
              onChange={changeLimit}
              defaultValue={selectedLimit}
              >
              <option value="5">Custom</option>
              <option value="5">5</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
          </select>
        </div>

        <div className="px-3 flex flex-col border-zinc-800 rounded-md text-zinc-800 bg-zinc-400 hover:bg-lime-50 hover:text-lime-600 hover:border-lime-600 justify-center">
          <label className="text-xs">Reset</label>
          <Link href={pathname} className="px-1"><ArrowPathIcon className="w-6 h-6"/></Link>
        </div>
      </div>

      {/* Second row of inputs */}
      <div className="flex flex-1 gap-3 mt-3 flex-shrink-0">
        <div className="relative">

          {/* Date From */}
          <label htmlFor="df" className="sr-only">
            Date From
          </label>
          <input
            className= "block rounded-md border border-zinc-800 py-2 pl-10 text-sm outline-2 placeholder:text-zinc-500 focus:border-lime-500 focus:bg-lime-50 focus:ring-lime-500 bg-zinc-400 text-zinc-800"
            placeholder="Date from"
            onChange={(e) => {
              handleDF(e.target.value);
            }}
            defaultValue={searchParams.get('df')?.toString()}
          />
          <CalendarDaysIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>

        <div className="relative">
          {/* Date To */}
          <label htmlFor="dt" className="sr-only">
            Date To
          </label>
          <input
            className= "block rounded-md border border-zinc-800 py-2 pl-10 text-sm outline-2 placeholder:text-zinc-500 focus:border-lime-500 focus:bg-lime-50 focus:ring-lime-500 bg-zinc-400 text-zinc-800"
            placeholder="Date to"
            onChange={(e) => {
              handleDT(e.target.value);
            }}
            defaultValue={searchParams.get('dt')?.toString()}
          />
          <CalendarDaysIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          
        </div>
      </div>
    </div>
  );
}
