'use client';
/**
 * results.tsx
 * 
 * Component to select the number of rows to be displayed in the table
 * 
 */
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

/**
 * <ResultsSelector />
 * 
 * Component that displays a dropdown to choose the number of rows to be displayed
 * 
 * @param className Additional className configurable from the parent
 * @param resultsParam URL parameter name to be used as a results controller. By default it will be 'limit'
 * @param opts An optional prop that will set the array of possible result options
 * 
 * @returns <ResultsSelector /> Component
 * 
 */
export default function ResultsSelector(
    {className, resultsParam, opts}: 
    {className?: string; resultsParam?: string, opts?: number[]}
) {
    /* Hard coded available options */
    const defaultOpts = [
        10,
        20,
        50,
        100,
        200,
        1000
    ];

    const currentOpts = opts || defaultOpts;
    const resultsVar = resultsParam || "limit";
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentResults = Number(searchParams.get(resultsVar)) || 0;
    const { replace } = useRouter();
   
    /* Function to redirect the url with the new params */
    const applyResults = (resultsNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set(resultsVar, resultsNumber.toString());

      replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className={`${className} pr-2 relative`}>
            <label className="absolute block bg-background-0 text-[0.6rem] text-xs left-0 -top-3 px-2 border border-primary-dark">Results</label>
            <select 
                className="rounded-md text-xs bg-background-1 text-primary-normal border-primary-dark focus:ring-0 focus:border-primary-dark"
                onChange={(e) => applyResults(e.target.value)} 
                value={currentResults}
            >
            {
                currentOpts.map((opt) => {
                    return (
                        <option key={opt}>{opt}</option>
                    )
                })
            }
            </select>
        </div>
    )
}