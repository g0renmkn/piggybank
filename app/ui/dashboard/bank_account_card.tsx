'use client';
/**
 * bank_account_card.tsx
 * 
 * Bank Account Card component.
 * 
 */
import clsx from 'clsx';
import Image from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';


export type TBankAccount = {
    name: string;
    iban: string;
    pfp: string;
    balance: number;
    acc_id: number;
}


/**
 * <BankAccountCard />
 * 
 * @param item Object containing the Card display data 
 * @returns <BankAccountCard />
 * 
 */
export function BankAccountCard(
    {item}:
    {item: TBankAccount}
) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentAcc = Number(searchParams.get("acc_id")) || -1;
   
    const createPageURL = (accID: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set("acc_id", accID.toString());
      
      return `${pathname}?${params.toString()}`;
    };
    
    return (
        <Link href={createPageURL(item.acc_id)} className={clsx(
            "max-w-[300px] min-w-[150px] grow rounded-lg px-5 py-2 bg-background-1 hover:bg-background-3",
            {
                "border boder-primary-normal bg-background-3": item.acc_id === currentAcc
            }
            )}
        >
            <div className="flex flex-row">
                <div className="w-12 h-12 border overflow-hidden rounded-full">
                    <Image src={"/accounts/"+item.pfp} width={64} height={64} alt="bank logo" />
                </div>
                <div className="ml-5">
                    <h1 className="">{item.name}</h1>
                    <div className="text-xs bg-gradient w-fit px-2 rounded-md  bg-gradient-to-b from-background-3 to-background-2 to-70%">{item.iban}</div>
                </div>
            </div>
            <div className="text-center text-2xl text-primary-brightest py-5">{item.balance.toLocaleString("de-DE", {style: "currency", currency: "EUR"})}</div>
        </Link>
    )
}