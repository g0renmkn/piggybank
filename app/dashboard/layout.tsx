'use client';
import Image from 'next/image';
import { 
    AccountBalance,
    AccountBalanceWallet,
    AttachMoney,
    CandlestickChartOutlined,
    ContactPageOutlined,
    CurrencyBitcoin,
    CurrencyExchange,
    GridViewOutlined,
    ReceiptLong,
    RequestPageOutlined,
    ShowChart,
} from '@mui/icons-material';
import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


type MenuSubItem = {
    key: string;
    name: string;
    icon: ReactNode;
    link: string | null;
    subitems?: MenuSubItem[];
}


/**
 * <NavLink />
 * 
 * @param param0 
 * @returns 
 */
function NavLink({item, selected}:{item: MenuSubItem, selected?: boolean}) {
    return (
        <div 
            key={`${item.key}-desk`} 
            className={clsx(
                "hover:bg-background-3 pl-5 pb-1 pt-1 rounded-r-full text-primary-bright",
                {
                    "bg-background-3": selected === true
                }
            )}
        >
            <Link href={item.link || ""}>
                {
                    (item.icon != null) && item.icon
                }
                <span className="pl-2">{item.name}</span>
            </Link>
        </div>
    )
}

/**
 * <DashboardLayout />
 * 
 * @param param0 
 * @returns 
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const pathname = usePathname();

    const overviewItem = {
        key: "mnuOverview",
        name: "Mierdon",
        icon: <GridViewOutlined />,
        link: "/dashboard"
    }

    const menuitems: MenuSubItem[] = [
        {
            key: "mnuOverview",
            name: "Overview",
            icon: <GridViewOutlined />,
            link: "/dashboard"
        },
        {
            key: "mnuBanks",
            name: "BANKS",
            icon: <AccountBalance />,
            link: null,
            subitems: [
                {
                    key: "mnuBanksAccs",
                    name: "Accounts",
                    icon: <ContactPageOutlined />,
                    link: "/dashboard/banks/accounts"
                },
                {
                    key: "mnuBanksMovs",
                    name: "Movements",
                    icon: <ReceiptLong />,
                    link: "/dashboard/banks/movs"
                },
                {
                    key: "mnuBanksStocks",
                    name: "Stocks",
                    icon: <ShowChart />,
                    link: "/dashboard/banks/stocks"
                },
                {
                    key: "mnuBanksFunds",
                    name: "Funds",
                    icon: <AttachMoney />,
                    link: "/dashboard/banks/funds"
                },
            ]
        },
        {
            key: "mnuCrypto",
            name: "CRYPTOS",
            icon: <CurrencyBitcoin />,
            link: null,
            subitems: [
                {
                    key: "mnuCryptoWallets",
                    name: "Wallets",
                    icon: <AccountBalanceWallet />,
                    link: "/dashboard/cryptos/wallets"
                },
                {
                    key: "mnuCryptoMovs",
                    name: "Movements",
                    icon: <ReceiptLong />,
                    link: "/dashboard/cryptos/movs"
                },
            ]
        },
        {
            key: "mnuExchanges",
            name: "EXCHANGES",
            icon: <CurrencyExchange />,
            link: null,
            subitems: [
                {
                    key: "mnuExchangesAccs",
                    name: "Accounts",
                    icon: <ContactPageOutlined />,
                    link: "/dashboard/exchanges/accounts"
                },
                {
                    key: "mnuExchangesSpot",
                    name: "Spot",
                    icon: <CandlestickChartOutlined />,
                    link: "/dashboard/exchanges/spot"
                },
                {
                    key: "mnuExchangesFut",
                    name: "Futures",
                    icon: <RequestPageOutlined />,
                    link: "/dashboard/exchanges/futures"
                }
            ]
        },
    ];


    return (
        <div className="flex h-screen flex-col md:flex-row">
            {/* --- Desktop Mode Menu --- */}
            <div className="hidden w-48 md:flex flex-col">
                <div className="flex flex-row justify-center pb-10">
                    <Image
                        src="/logo_dashboard.png"
                        width={128}
                        height={128}
                        alt="Piggybank logo"
                        className="object-center"
                    />
                </div>
                
                {/* Navlinks menu */}
                <div className="flex h-full flex-col">
                    {
                        menuitems.map((item) => {
                            return (
                                /* Section div */
                                <div key={`${item.key}-desk`} className="pb-5">
                                    {/* If the item is just a menu item, add it like so */}
                                    {(item.link !== null) && <NavLink key={item.key} item={item} selected={pathname === item.link} />}
                                    {/* If instead the item is a group item, just show the group header */}
                                    {(item.link === null) && <div key={`${item.key}-desk`} className="pl-5 text-xs font-bold text-primary-bright">{item.name}</div>}

                                    {/* Menu item */}
                                    {
                                        item.subitems && item.subitems.map((subitem) => {
                                            return (
                                                <NavLink key={subitem.key} item={subitem} selected={pathname === subitem.link} />
                                            )
                                        })
                                    }                                    
                                </div>
                            );
                        })
                    }
                </div>
            </div>

            {/* --- Mobile Mode Menu --- */}
            <div className="md:hidden flex justify-center flex-row gap-2 rounded-lg bg-background-1 px-2 text-primary-bright">
                <div className="py-2">
                    <Image
                        src="/logo_dashboard.png"
                        width={48}
                        height={48}
                        alt="Piggybank logo"
                        className="object-center"
                    />
                </div>
                <div className="flex flex-row gap-2 grow items-center justify-center">
                    {
                        menuitems.map((item) => {
                            return (
                                <div key={`${item.key}-mobile`} className="grow h-full hover:bg-background-3 grid place-items-center"><div key={`${item.key}-mobile2`}>{item.icon}</div></div>
                            );
                        })
                    }
                </div>
            </div>
            <div className="w-full px-6 py-6">{children}</div>
        </div>
    );
}
