import { ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';


export type MenuSubItemType = {
    key: string;
    name: string;
    icon: ReactNode;
    link: string | null;
    subitems?: MenuSubItemType[];
}


export function NavLink({item}:{item: MenuSubItemType, selected?: boolean}) {
    return (
        <Link href={item.link || ""} className="flex flex-row grow hover:bg-background-3 md:rounded-r-full md:pl-5 md:pt-1 md:pb-1 items-center justify-center md:justify-normal">
            {item.icon}
            <div className="hidden md:inline md:pl-2">{item.name}</div>
        </Link>
    )
}

export function MenuGroup({item}:{item: MenuSubItemType, selected?: boolean}) {
    return (
        <div className="flex flex-col md:flex-col grow hover:bg-background-3 md:hover:bg-background-1 md:pt-5 justify-center items-center md:items-baseline">
            <div className="">
                <div className="md:hidden">{item.icon}</div>
                <div className="hidden md:inline md:text-xs md:text-primary-normal md:pl-5">{item.name}</div>
            </div>
            <div className="relative w-full">
            {
                item.subitems &&
                <div className="hidden md:static md:inline">
                {
                    item.subitems.map((subitem) => {
                        return (
                            <NavLink key={subitem.key} item={subitem} />
                        );
                    })
                }
                </div>
            }
            </div>
        </div>
    )
}

export function MenuItem({item}:{item: MenuSubItemType, selected?: boolean}) {
    return (
        <>
        {item.link && <NavLink item={item} />}
        {item.link === null && <MenuGroup item={item}/>}
        </>
    )
}

/**
 * <NavLink />
 * 
 * @param param0 
 * @returns 
 */
// export function NavLink({item, selected}:{item: MenuSubItem, selected?: boolean}) {
//     return (
//         <div 
//             key={`${item.key}-desk`} 
//             className={clsx(
//                 "hover:bg-background-3 pl-5 pb-1 pt-1 rounded-r-full text-primary-bright",
//                 {
//                     "bg-background-3": selected === true
//                 }
//             )}
//         >
//             <Link href={item.link || ""}>
//                 {
//                     (item.icon != null) && item.icon
//                 }
//                 <span className="pl-2">{item.name}</span>
//             </Link>
//         </div>
//     )
// }
