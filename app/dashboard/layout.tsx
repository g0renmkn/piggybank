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
    HubOutlined,
    MonetizationOnOutlined,
    MonitorHeartOutlined,
    ReceiptLong,
    RequestPageOutlined,
    SellOutlined,
    SettingsOutlined,
    ShowChart,
} from '@mui/icons-material';
import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import  {
    MenuItem,
    MenuSubItemType
} from '@/app/ui/dashboard/menu';


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
    const menuitems: MenuSubItemType[] = [
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
        {
            key: "mnuData",
            name: "DATA",
            icon: <MonitorHeartOutlined />,
            link: null,
            subitems: [
                {
                    key: "mnuDataCryptonet",
                    name: "Crypto Nets",
                    icon: <HubOutlined />,
                    link: "/dashboard/data/cryptonet"
                },
                {
                    key: "mnuDataAssets",
                    name: "Assets",
                    icon: <SellOutlined />,
                    link: "/dashboard/data/assets"
                },
                {
                    key: "mnuDataPrices",
                    name: "Prices",
                    icon: <MonetizationOnOutlined />,
                    link: "/dashboard/data/prices"
                },
                {
                    key: "mnuDataConfig",
                    name: "Config",
                    icon: <SettingsOutlined />,
                    link: "/dashboard/data/various"
                },
            ]
        }
    ];

    return (
        /* Main container for the whole page */
        <div className="flex h-screen flex-col md:flex-row">

            {/* Menu panel to the left (or top, on mobile) */}
            <div className="flex flex-row h-16 md:h-full md:w-48 md:flex-col bg-background-1 md:bg-transparent text-primary-brighter">

                {/* Image container */}
                <div className="h-16 w-16 md:h-32 md:w-32 md:ml-5 md:mb-5 relative aspect-square">
                    <Image
                        src="/logo_dashboard.png"
                        fill={true}
                        alt="Piggybank logo"
                        className="object-center"
                    />
                </div>

                {/* Menu Items container */}
                <div className="w-full flex flex-row md:flex-col">
                    {
                        menuitems.map((item) => {
                            return (
                                <MenuItem key={item.key} item={item} />
                            );
                        })
                    }
                </div>
            </div>
            
            {/* Right (or botttom, on mobile) panel, where each individual page will be shown */}
            <div className="w-full px-3 py-3">
                {children}
            </div>
        </div>
    );

}
