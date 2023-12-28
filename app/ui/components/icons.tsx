/**
 * ui/components/icons.tsx
 * 
 * Library with SVG icons from different sources
 * 
 */


/**
 * Wallet Icon. Source: 
 * @param param0 
 * @returns 
 */
export function WalletIcon({...props}) {
    return (
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" {...props}>
            <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z"/>
            <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z"/>
        </svg>
    )
}


/**
 * Wallet Icon. Source: https://tailwindtoolbox.com/icons
 * 
 * @param param0 
 * @returns 
 */
export function WalletIcon2({...props}) {
    return (
        <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" {...props}>
            <path stroke="none" d="M0 0h24v24H0z"/> 
            <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
            <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
        </svg>
    )
}


/**
 * Bank Icon. Source: https://tailwindtoolbox.com/icons
 * 
 * @param param0 
 * @returns 
 */
export function BankIcon({...props}) {
    return (
        <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" {...props}>
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="3" y1="21" x2="21" y2="21" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <polyline points="5 6 12 3 19 6" />
            <line x1="4" y1="10" x2="4" y2="21" />
            <line x1="20" y1="10" x2="20" y2="21" />
            <line x1="8" y1="14" x2="8" y2="17" />
            <line x1="12" y1="14" x2="12" y2="17" />
            <line x1="16" y1="14" x2="16" y2="17" />
        </svg>
    )
}


/**
 * Stock Icon. Source: https://tailwindtoolbox.com/icons
 * 
 * @param param0 
 * @returns 
 */
export function StockIcon({...props}) {
    return (
        <svg className="h-8 w-8 text-red-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
    )
}