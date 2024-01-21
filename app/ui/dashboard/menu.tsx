'use client';
import { MouseEventHandler, ReactNode, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';


export type MenuSubItemType = {
    key: string;
    name: string;
    icon: ReactNode;
    link: string | null;
    subitems?: MenuSubItemType[];
}


export function NavLink({item, onClick}:{item: MenuSubItemType, onClick?: MouseEventHandler}) {
    return (
        <Link 
            className="flex flex-row grow hover:bg-background-3 md:rounded-r-full md:pl-5 md:pt-1 md:pb-1 items-center justify-center md:justify-normal"
            href={item.link || ""}
            onClick={onClick}
        >
            {item.icon}
            <div className="hidden md:inline md:pl-2">{item.name}</div>
        </Link>
    )
}

export function MenuGroup({item}:{item: MenuSubItemType, selected?: boolean}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen(old => !old);
    }

    return (
        <div className="grow flex flex-col">
            <div className="flex flex-col md:flex-col grow hover:bg-background-3 md:hover:bg-background-1 md:pt-5 justify-center items-center md:items-baseline">
                <div className="">
                    <div className="md:hidden" onClick={toggle}>{item.icon}</div>
                    <div className="hidden md:inline md:text-xs md:text-primary-normal md:pl-5">{item.name}</div>
                </div>
            </div>
            {
                item.subitems &&
                <div className="relative w-full flex flex-col">
                    <div className={clsx(
                        "absolute md:static md:inline w-full bg-background-1",
                        {
                            "hidden": !isOpen
                        }
                    )} >
                    {
                        item.subitems.map((subitem) => {
                            return (
                                <NavLink key={subitem.key} item={subitem} onClick={toggle} />
                            );
                        })
                    }
                    </div>
                </div>
            }
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
