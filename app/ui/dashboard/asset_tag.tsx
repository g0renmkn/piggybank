'use client';
/**
 * asset_tag.tsx
 * 
 * Asset Tag component.
 * 
 */
import clsx from 'clsx';
import LogoImage from '@/app/ui/components/logoimage';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';


/**
 * <AssetTag />
 * 
 * @param item Object containing the Card display data
 * @returns <AssetTag />
 * 
 */
export default function AssetTag(
    {item}:
    {item: any}
) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentAssetID = Number(searchParams.get("asset_id"));
   
    const createPageURL = () => {
      const params = new URLSearchParams(searchParams);
      params.set("asset_id", item.id);
      return `${pathname}?${params.toString()}`;
    };
    
    return (
        <Link href={createPageURL()}>
            <div className={clsx(
                "rounded-md border border-primary-dark bg-background-2 flex flex-row px-2 text-xs hover:bg-background-3 py-1",
                {
                    "bg-background-3 border-primary-brighter": currentAssetID === item.id
                }
            )}>
                <div className="relative w-4 h-4 border border-primary-normal rounded-full overflow-hidden">
                    <LogoImage src={"/"+item.pfp} />
                </div>
                <span className="pl-2">{item.name}</span>
            </div>
        </Link>
    )
}
