'use client';
/**
 * th.tsx
 * 
 * Table column header for use in custom table
 * 
 */
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    KeyboardArrowUpOutlined,
    KeyboardArrowDownOutlined
} from '@mui/icons-material';

/**
 * <Th />
 * 
 * Table column header for use in custom table
 * 
 * @param children Children components used inside this one
 * @param className Additional className configurable from the parent
 * 
 * @returns <Th /> Component
 * 
 */
export default function Th (
    {children, className, orderBy}: 
    {children: React.ReactNode; className?: string; orderBy?: string | undefined}
) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentOrderBy = searchParams.get("orderby") || "id";
    const currentDir = searchParams.get("dir") || "DESC";

    /* Create the URL with the new params */
    const createPageURL = () => {
      const params = new URLSearchParams(searchParams);
      let nextOrderBy = currentOrderBy;
      let nextDir = currentDir;

      if (orderBy === currentOrderBy) {
        nextDir = (currentDir === "ASC"? "" : "ASC" )
      }
      else {
        nextOrderBy = orderBy || currentOrderBy;
      }

      params.set("dir", nextDir);
      params.set("orderby", nextOrderBy);

      if (nextDir !== "ASC" ) {
        params.delete("dir");
      }

      return `${pathname}?${params.toString()}`;
    };


    return (
        <th className={`${className} pl-5 text-xs py-2`}>
            {
                orderBy &&
                <Link href={createPageURL()}>
                    {children} 
                    {((currentOrderBy === orderBy) && (currentDir === "ASC")) && <KeyboardArrowUpOutlined />}
                    {((currentOrderBy === orderBy) && (currentDir !== "ASC")) && <KeyboardArrowDownOutlined />}
                </Link>
            }
            {
                !orderBy &&
                children
            }
            
        </th>
    )
}