'use client';
/**
 * pagination.tsx
 * 
 * Pagination component to be used with tables
 * 
 */
import {
    ArrowRightOutlined,
    ArrowLeftOutlined,
    FilterAltOffOutlined
} from '@mui/icons-material';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';


/**
 * generatePagination()
 * 
 * Function to generate a pagination array with the elements used in the pagination component.
 * Code based in the official NextJS dashboard learning tutorial code.
 * 
 * @param currentPage Currently selected page
 * @param totalPages Total number of pages in the collection
 * @returns An array with the page numbers to be displayed
 * 
 */
const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i);
    }
  
    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage < 3) {
        return [0, 1, 2, '...', totalPages - 2, totalPages-1];
    }
  
    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [0, 1, '...', totalPages - 3, totalPages - 2, totalPages-1];
    }
  
    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        0,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages-1,
    ];
};


/**
 * <PaginationNumber />
 * 
 * Component that displays the page number. Used in the Pagination component
 *  
 * @param page Page number that this component will represent
 * @param isActive Wether this component will show active or disabled
 * @param position The position this component will have in the whole set
 * @param href URL with the params updated
 * 
 * @returns <PaginationNumber /> Component
 */
function PaginationNumber(
    { page,isActive, position, href }: 
    {
        page: number | string; 
        isActive: boolean; 
        position?: 'first' | 'last' | 'middle' | 'single';
        href: string;
    }
) {
    const className = clsx(
        'flex h-8 w-8 items-center justify-center text-sm border border-primary-dark cursor-pointer',
        {
            'z-10 bg-background-3 border-primary-normal text-primary-brighter': isActive,
            'hover:bg-background-3 hover:text-primary-brighter': !isActive && position !== 'middle',
            'text-primary-normal': position === 'middle',
        },
    );

    return isActive || position === 'middle' ? (
            <div className={className}>{page}</div>
        ) : (
            <Link className={className} href={href}>
                {page}
            </Link>
    );
}


/**
 * <PaginationArrow />
 * 
 * Component that displays an arrow (left or right) to increment or decrement page number
 * 
 * @param onPageChange Callback function triggered when the arrow is clicked
 * @param direction Determines the direction of the arrow (where the componente will be placed)
 * @param isDisabled Wether the component is disabled or not (for example wh)
 *  
 * @returns <PaginationArrow /> Component
 */
function PaginationArrow(
    { href, direction, isDisabled }: 
    { href: string; direction: 'left' | 'right'; isDisabled?: boolean;}
) {
    const className = clsx(
    'flex h-8 w-8 items-center justify-center border border-primary-dark',
    {
        'pointer-events-none text-primary-dark': isDisabled,
        'hover:bg-background-3 hover:text-primary-brightest cursor-pointer': !isDisabled,
        'rounded-l-md': direction === 'left',
        'rounded-r-md': direction === 'right',
    },
    );

    const icon = direction === 'left' ? (
        <ArrowLeftOutlined className="w-8" />
    ) : (
        <ArrowRightOutlined className="w-8" />
    );

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link className={className} href={href}>
            {icon}
        </Link>
    );
}


/**
 * <Pagination />
 * 
 * Pagination component that controls available pages and highlights current selected page
 * 
 * @param totalPages Total number of pages to be displayed
 * @param pageParam URL parameter name to be used as a page indicator. By default it will be 'page'
 * 
 * @returns <Pagination /> Component
 * 
 */
export default function Pagination(
    { totalPages, pageParam }: 
    { totalPages: number; pageParam?: string}
) {
    const pageVar = pageParam || "page";
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get(pageVar)) || 0;
    const { replace } = useRouter();
   
    const createPageURL = (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set(pageVar, pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    };

    const onPageChange = useDebouncedCallback((page: string) => {
        replace(createPageURL(page));
    }, 300);

    /* Create array of pages */
    const allPages = generatePagination(currentPage, totalPages);

    return (
        <div className="inline-flex">

            {/* Manual page selector */}
            <div className="pr-2">
                <input
                    size={4}
                    className={`rounded-md border-primary-dark text-xs bg-background-1 focus:ring-primary-normal focus:border-primary-normal placeholder:text-primary-dark`}
                    placeholder="Page..."
                    onChange={(e) => onPageChange(e.target.value) }
                />
            </div>

            {/* Numeric page selector */}
            <div className="flex -space-x-px">

                {/* Left arrow */}
                <PaginationArrow
                    href={createPageURL(currentPage - 1)}
                    direction="left"
                    isDisabled={currentPage <= 0}
                />

                {/* Collection of page numbers */}
                {
                    allPages.map((page, index) => {
                        let position: 'first' | 'last' | 'single' | 'middle' | undefined;

                        if (index === 0) position = 'first';
                        if (index === allPages.length - 1) position = 'last';
                        if (allPages.length === 1) position = 'single';
                        if (page === '...') position = 'middle';

                        return (
                            <PaginationNumber
                                key={index}
                                href={createPageURL(page)}
                                page={page}
                                position={position}
                                isActive={currentPage === page}
                            />
                        );
                    })
                }

                {/* Right arrow */}
                <PaginationArrow
                    href={createPageURL(currentPage + 1)}
                    direction="right"
                    isDisabled={currentPage >= totalPages-1}
                />
            </div>
                
            <div className='flex h-8 w-8 items-center justify-center border border-primary-dark bg-background-0 ml-2 rounded-md hover:bg-background-3 hover:text-primary-brighter'>
                <Link href={pathname}><FilterAltOffOutlined /></Link>
            </div>
        </div>
    );
}
