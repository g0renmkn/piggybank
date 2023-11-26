import Link from 'next/link';

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
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
    
    return (
        <div>
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
            <hr />
            {children}
        </div>
    );
  }
  