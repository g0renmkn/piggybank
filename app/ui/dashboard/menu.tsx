'use client';
import { MouseEventHandler, ReactNode, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export type MenuSubItemType = {
    key: string;
    name: string;
    icon: ReactNode;
    link: string | null;
    subitems?: MenuSubItemType[];
}


/**
 * <NavLink /> component
 * 
 * @param param0 
 * @returns 
 */
export function NavLink({item, onClick}:{item: MenuSubItemType, onClick?: MouseEventHandler}) {
    const pathname = usePathname();
    
    return (
        <Link 
            className={clsx(
                "flex flex-row grow hover:bg-background-3 md:rounded-r-full md:pl-5 md:pt-1 md:pb-1 items-center justify-center md:justify-normal",
                {
                    "bg-background-3": pathname === item.link
                }
            )}
            href={item.link || ""}
            onClick={onClick}
        >
            {item.icon}
            <div className="hidden md:inline md:pl-2">{item.name}</div>
        </Link>
    )
}


/**
 * <MenuGroup /> Component
 * 
 * @param param0 
 * @returns 
 */
export function MenuGroup({item}:{item: MenuSubItemType, selected?: boolean}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pathname = usePathname();
    let pathfound = false;

    const toggle = () => {
        setIsOpen(old => !old);
    }

    if( item.subitems ) {
        for( let i=0; i<item.subitems.length; i++ ) {
            if( item.subitems[i].link?.includes(pathname) ) {
                pathfound = true;
            }
        }
    }

    return (
        <div className="grow flex flex-col">

            {/* Icon and/or section name */}
            <div className={clsx(
                "flex flex-col md:flex-col grow hover:bg-background-3 md:hover:bg-transparent md:bg-transaparent md:pt-5 justify-center items-center md:items-baseline",
                {
                    "bg-background-3 md:bg-transparent": pathfound && pathname!=="/dashboard"
                }
            )}>
                <div className="">
                    <div className="md:hidden" onClick={toggle}>{item.icon}</div>
                    <div className="hidden md:inline md:text-xs md:text-primary-normal md:pl-5">{item.name}</div>
                </div>
            </div>

            {/* Section submenu */}
            {
                item.subitems &&
                <div className="relative w-full flex flex-col">
                    <div className={clsx(
                        "absolute md:static md:inline w-full bg-background-1 md:bg-transparent",
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


/**
 * <MenuItem /> Component
 * 
 * @param param0 
 * @returns 
 */
export function MenuItem({item}:{item: MenuSubItemType, selected?: boolean}) {
    return (
        <>
        {item.link && <NavLink item={item} />}
        {item.link === null && <MenuGroup item={item}/>}
        </>
    )
}

