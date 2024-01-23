/**
 * bank_account_card.tsx
 * 
 * Bank Account Card component.
 * 
 */
import clsx from 'clsx';


export type TBankAccount = {
    name: string;
    iban: string;
    balance: number;
}


/**
 * <BankAccountCard />
 * 
 * @param item Object containing the Card display data 
 * @returns <BankAccountCard />
 * 
 */
export function BankAccountCard({item, selected}:{item: TBankAccount, selected?: boolean}) {
    
    return (
        <div className={clsx(
            "max-w-[300px] min-w-[150px] grow rounded-lg px-5 py-2 bg-background-1",
            {
                "border boder-primary-normal": selected
            }
        )}
        >
            <h1 className="">{item.name}</h1>
            <div className="text-xs bg-gradient w-fit px-2 rounded-md  bg-gradient-to-b from-background-3 to-background-2 to-70%">{item.iban}</div>
            <div className="text-center text-2xl text-primary-bright py-5">{item.balance.toLocaleString("de-DE", {style: "currency", currency: "EUR"})}</div>
        </div>
    )
}