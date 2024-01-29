/**
 * table.tsx
 * 
 * Generic Table component elements that match the overall format
 * 
 */
import ResultsSelector from './results';
import Pagination from "./pagination";
import SearchBar from "./searchbar";
import CustomTh from "./th";
import clsx from 'clsx';

/**
 * <Th />
 * 
 * @param param0 
 * @returns 
 * 
 */
export function Th(
    {children, className, orderBy}: 
    {children: React.ReactNode; className?: string; orderBy?: string | undefined}
) {
    return (
        <CustomTh className={className} orderBy={orderBy}>
            {children}
        </CustomTh>
    )
}


/**
 * <THead />
 * 
 * @param param0 
 * @returns 
 * 
 */
export function THead(
    {children, className}: 
    {children: React.ReactNode; className?: string}
) {
    return (
        <thead className={`${className} text-left text-primary-brightest`}>
            <tr>
                {children}
            </tr>
        </thead>
    )
}


/**
 * <Td />
 * 
 * @param param0 
 * @returns 
 * 
 */
export function Td(
    {children, className}: 
    {children: React.ReactNode; className?: string}
) {
    return (
        <td className={`${className} pl-5 first:py-5`}>
            {children}
        </td>
    )
}


/**
 * <TBody />
 * 
 * @param param0 
 * @returns 
 * 
 */
export function TBody(
    {children, className}: 
    {children: React.ReactNode; className?: string}
) {
    return (
        <tbody className={`${className}`}>
            {children}
        </tbody>
    )
}


/**
 * <TRow />
 * 
 * @param param0 
 * @returns 
 * 
 */
export function TRow(
    {children, className}: 
    {children: React.ReactNode; className?: string}
) {
    return (
        <tr className={`${className} border-t border-primary-darker`}>
            {children}
        </tr>
    )
}


/**
 * <Table />
 * 
 * @param param0 
 * @returns 
 * 
 */
export function Table(
    {children, className, totalPages}: 
    {children: React.ReactNode; className?: string; totalPages: number}
) {
    return (
        <div className="w-full">
            <div className={clsx(
                "flex-col gap-2 md:flex-row w-full items-center",
                {
                    "hidden": totalPages===-1,
                    "flex": totalPages!==-1
                }
            )}
            >
                <SearchBar className="grow w-full" />
                <div className="flex-row flex">
                    <ResultsSelector />
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
            <div className={`${className} bg-background-2 rounded-md overflow-hidden w-full px-2 mt-2`}>
                <table className={`w-full h-full text-sm`}>
                    {children}
                </table>
            </div>
            <div className={clsx(
                "w-full justify-center py-2",
                {
                    "hidden": totalPages === -1,
                    "flex": totalPages !== -1
                }
            )}
            >
                <div className="flex">
                    <ResultsSelector />
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </div>
    )
}