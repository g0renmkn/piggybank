'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const groups = [
    {
      name: 'Banks',
      sections: [
        { name: 'Overview', href: '/dashboard/bankmain' },
        { name: 'Accounts', href: '/dashboard/bankaccs'},
        { name: 'Movements', href: '/dashboard/bankmovs'},
        { name: 'Stocks', href: '/dashboard/bankstocks'},
        { name: 'Funds', href: '/dashboard/bankfunds'},
      ]
    },
    {
      name: 'Exchanges',
      sections: []
    }
  ];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {groups[0].sections.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-zinc-700 p-3 text-sm font-medium hover:bg-lime-100 hover:text-lime-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-lime-100 text-lime-600': pathname === link.href,
              },
            )}            
          >
            {/* <LinkIcon className="w-6" /> */}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
