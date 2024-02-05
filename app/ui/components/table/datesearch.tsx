'use client';
/**
 * datesearch.tsx
 * 
 * DateSearch component to search for date ranges
 * 
 */
import {
    TodayOutlined as DFIcon,
    EventOutlined as DTIcon
} from '@mui/icons-material';
import clsx from 'clsx';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';


/**
 * <DateSearch />
 * 
 * @param className additional CSS properties
 * @param dfParam URL parameter to search "From date" on a date range
 * @param dtParam URL parameter to search "To date" on a date range
 *  
 * @returns <DateSearch /> Component
 * 
 */
export default function DateSearch(
{
    className, 
    dfParam,
    dtParam,
    dateErrors
}: {
    className?: string;
    dfParam?: string;
    dtParam?: string;
    dateErrors?: boolean;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const dfVar = dfParam || "df";
    const dtVar = dtParam || "dt";
    const currentDf = Number(searchParams.get(dfVar)) || "";
    const currentDt = Number(searchParams.get(dtVar)) || "";
    const { replace } = useRouter();

    /* Function to apply the change made in the search box */
    const onDfChange = useDebouncedCallback((df: string) => {
        const params = new URLSearchParams(searchParams);

        if( df ) {
            params.set(dfVar, df.toString());
        }
        else {
            params.delete(dfVar);
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    /* Function to apply the change made in the search box */
    const onDtChange = useDebouncedCallback((dt: string) => {
        const params = new URLSearchParams(searchParams);

        if( dt ) {
            params.set(dtVar, dt.toString());
        }
        else {
            params.delete(dtVar);
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className={`${className} flex flex-row gap-2`}>
            <div className="relative">
                <label htmlFor="df" className="sr-only">Date From</label>
                <input
                    className={clsx(
                        `pl-8 rounded-md border-primary-dark text-xs bg-background-1 w-full placeholder:text-primary-dark`,
                        {
                            "focus:border-red-700 focus:ring-red-700": dateErrors === true,
                            "focus:border-primary-normal focus:ring-primary-normal": dateErrors !== true
                        }
                    )}
                    placeholder="Date From..."
                    onChange={(e) => onDfChange(e.target.value)}
                    defaultValue={currentDf}
                />
                <DFIcon className="absolute left-1 top-1 text-primary-dark" />
            </div>
            <div className="relative">
                <label htmlFor="dt" className="sr-only">DAte To</label>
                <input
                    className={clsx(
                        `pl-8 rounded-md border-primary-dark text-xs bg-background-1 w-full placeholder:text-primary-dark`,
                        {
                            "focus:border-red-700 focus:ring-red-700": dateErrors === true,
                            "focus:border-primary-normal focus:ring-primary-normal": dateErrors !== true
                        }
                    )}
                    placeholder="Date To..."
                    onChange={(e) => onDtChange(e.target.value)}
                    defaultValue={currentDt}
                />
                <DTIcon className="absolute left-1 top-1 text-primary-dark" />
            </div>
        </div>
    )
}
