import Link from 'next/link';
import NavLinks from '@/app/ui/components/navlinks';
import Image from 'next/image';

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    
    /*return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <h1><Link href="/dashboard">Dashboard Layout</Link></h1>
            <ul>{groups.map((group) => {
              return (
                  <li key={group.name}>* {group.name}
                    <ul>{group.sections.map((sect) => {
                      return (
                        <li key={group.name + sect.name}><Link href={sect.href}>{sect.name}</Link></li>
                      )
                    })}</ul>
                  </li>
              );
            })}
            </ul>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
          </div>
        </div>
    );*/

    return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
              className="mb-2 flex h-20 items-end justify-start rounded-md bg-zinc-800 p-4 md:h-40"
              href="/"
            >
                <Image
                  src="/logo_original.png"
                  width={192}
                  height={192}
                  alt="kaka"
                  className="justify-center"
                />
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
              <NavLinks />
              <div className="hidden h-auto w-full grow rounded-md bg-zinc-700 md:block"></div>
              <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-zinc-700 p-3 text-sm font-medium hover:bg-lime-100 hover:text-lime-600 md:flex-none md:justify-start md:p-2 md:px-3">
                {/* <PowerIcon className="w-6" /> */}
                <div className="hidden md:block">Sign Out</div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    );
  }
  