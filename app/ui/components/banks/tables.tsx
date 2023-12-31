/**
 * @/app/ui/components/banks/tables.tsx
 * 
 * Table components to display different Banks related data.
 * 
 */
import { BankAccount, BankMovsExt, BankStocksExt, BankFundsExt } from "@/app/lib/db/definitions";
import {
    bankGetAccs,
    bankGetMovs
} from "@/app/lib/db/api_banks";
import ActiveTag from "@/app/ui/components/active_tag";
import { DelAccButton, DelMovButton } from "@/app/ui/components/buttons";
import clsx from 'clsx';

/**
 * <AccountsTable />
 * 
 * Account displaying table component.
 * 
 * @returns <AccountsTable />
 */
export async function AccountsTable() {
    let accs = null;
    let errmessage = null;
    try {
        accs = await bankGetAccs();
    }
    catch (err: unknown) {
        if (err instanceof TypeError) {
            errmessage = "[" + err.name + "]: " + err.message;
        }
        else {
            console.log(err);
            errmessage = "Unknown error occurred."
        }
    }

    return (
        <div className="mt-6 flow-root">
            <table className="hidden min-w-full md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">ID</th>
                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Account</th>
                        <th scope="col" className="px-3 py-5 font-medium">IBAN</th>
                        <th scope="col" className="px-3 py-5 font-medium justify-center flex">Active?</th>
                        <th scope="col" className="px-3 py-5 font-medium">Comments</th>
                        <th scope="col" className="px-3 py-5 font-medium"></th>
                    </tr>
                </thead>
                
                <tbody className="bg-zinc-700">
                    {accs?accs.map((acc: BankAccount) => {
                    return (
                        <tr key={acc.id} className="w-full border-b py-3 text-md last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                            <td className="whitespace-nowrap px-3 py-3">{acc.id}</td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.name}</td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.iban}</td>
                            <td className="whitespace-nowrap px-3 py-3 flex flex-col grow-0 items-center justify-center">
                                <ActiveTag active={acc.closed.length===0}/>
                                {acc.closed.length>0 && <p className="text-xs">{acc.closed.split("T")[0]}</p>}
                            </td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.comments}</td>
                            <td className="whitespace-nowrap px-3 py-3"><DelAccButton id={acc.id} /></td>
                        </tr>
                    )
                }):""}
                </tbody>
            </table>
            {
                errmessage && 
                <p className="text-red-600">
                    Cannot fetch data: {errmessage}
                </p>
            }
        </div>
    );
}


/**
 * <MovsTable />
 * 
 * Bank movements displaying table component.
 * 
 * @returns <MovsTable />
 */
export async function MovsTable(
    {query,df,dt,currentPage,limit}: 
    {query: string; df: string; dt: string; currentPage: string; limit: string;}
) {
    let movs = null;
    let errmessage = null;
    
    try {
        movs = await bankGetMovs({endpoint: "movs", query, df, dt, page: currentPage,limit});
    }
    catch (err: any) {
        if (err instanceof TypeError || err.name === "PB_ERR_WRONG_DATE_RANGE") {
            errmessage = "[" + err.name + "]: " + err.message;
        }
        else {
            console.log(err);
            errmessage = ("[" + err?.name + "]: " + err?.message) || "Unknown error occurred."
        }
    }

    return (
        <div className="mt-6 flow-root">
            <table className="hidden min-w-full md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                        <th scope="col" className="px-3 py-5 font-medium">ID</th>
                        <th scope="col" className="px-3 py-5 font-medium">Account</th>
                        <th scope="col" className="px-3 py-5 font-medium">Date</th>
                        <th scope="col" className="px-3 py-5 font-medium">Category</th>
                        <th scope="col" className="px-3 py-5 font-medium">Periodicity</th>
                        <th scope="col" className="px-3 py-5 font-medium">Description</th>
                        <th scope="col" className="px-3 py-5 font-medium text-right">Value</th>
                        <th scope="col" className="px-3 py-5 font-medium">Notes</th>
                        <th scope="col" className="px-3 py-5 font-medium"></th>
                    </tr>
                </thead>
                
                <tbody className="bg-zinc-700 px-3">
                    {movs?movs.map((acc: BankMovsExt) => {
                    return (
                        <tr key={acc.id} className="w-full border-b py-3 text-md last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                            <td className="whitespace-nowrap px-3 py-3">{acc.id}</td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.acc_name}</td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.date.split("T")[0]}</td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.cat_name}</td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.period}</td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.description}</td>
                            <td className={clsx(
                                "whitespace-nowrap px-3 py-3 text-right",
                                {
                                    "text-red-500": acc.value<0,
                                    "text-lime-500": acc.value>=0
                                }
                            )}>
                                {acc.value.toLocaleString('es-ES', {style:'currency', currency: 'EUR'})}
                            </td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.notes}</td>
                            <td className="whitespace-nowrap px-3 py-3"><DelMovButton id={acc.id} endpoint={"movs"} /></td>
                        </tr>
                    )
                }):""}
                </tbody>
            </table>
            {
                errmessage && 
                <p className="text-red-600">
                    Cannot fetch data: {errmessage}
                </p>
            }
        </div>
    );
}


/**
 * <StocksTable />
 * 
 * Bank stock movements displaying table component.
 * 
 * @returns <StocksTable />
 */
export async function StocksTable(
    {query,df,dt,currentPage,limit}: 
    {query: string; df: string; dt: string; currentPage: string; limit: string;}
) {
    let movs = null;
    let errmessage = null;
    
    try {
        movs = await bankGetMovs({endpoint: "stocks", query, df, dt, page: currentPage,limit});
    }
    catch (err: any) {
        if (err instanceof TypeError || err.name === "PB_ERR_WRONG_DATE_RANGE") {
            errmessage = "[" + err.name + "]: " + err.message;
        }
        else {
            console.log(err);
            errmessage = ("[" + err?.name + "]: " + err?.message) || "Unknown error occurred."
        }
    }

    return (
        <div className="mt-6 flow-root">
            <table className="hidden min-w-full md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                        <th scope="col" className="px-3 py-5 font-medium">ID</th>
                        <th scope="col" className="px-3 py-5 font-medium">Account</th>
                        <th scope="col" className="px-3 py-5 font-medium">Date</th>
                        <th scope="col" className="px-3 py-5 font-medium">Asset</th>
                        <th scope="col" className="px-3 py-5 font-medium text-right">Amount</th>
                        <th scope="col" className="px-3 py-5 font-medium"></th>
                    </tr>
                </thead>
                
                <tbody className="bg-zinc-700 px-3">
                    {movs?movs.map((acc: BankStocksExt) => {
                    return (
                        <tr key={acc.id} className="w-full border-b py-3 text-md last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                            <td className="whitespace-nowrap px-3 py-3">{acc.id}</td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.acc_name}</td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.date.split("T")[0]}</td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.asset_name}</td>
                            <td className={clsx(
                                "whitespace-nowrap px-3 py-3 text-right",
                                {
                                    "text-red-500": acc.amount<0,
                                    "text-lime-500": acc.amount>=0
                                }
                            )}>
                                {acc.amount.toLocaleString("de-DE")}
                            </td>
                            <td className="whitespace-nowrap px-3 py-3"><DelMovButton id={acc.id} endpoint={"stocks"} /></td>
                        </tr>
                    )
                }):""}
                </tbody>
            </table>
            {
                errmessage && 
                <p className="text-red-600">
                    Cannot fetch data: {errmessage}
                </p>
            }
        </div>
    );
}


/**
 * <FundsTable />
 * 
 * Bank funds movements displaying table component.
 * 
 * @returns <FundsTable />
 */
export async function FundsTable(
    {query,df,dt,currentPage,limit}: 
    {query: string; df: string; dt: string; currentPage: string; limit: string;}
) {
    let movs = null;
    let errmessage = null;
    
    try {
        movs = await bankGetMovs({endpoint: "funds", query, df, dt, page: currentPage,limit});
    }
    catch (err: any) {
        if (err instanceof TypeError || err.name === "PB_ERR_WRONG_DATE_RANGE") {
            errmessage = "[" + err.name + "]: " + err.message;
        }
        else {
            console.log(err);
            errmessage = ("[" + err?.name + "]: " + err?.message) || "Unknown error occurred."
        }
    }

    return (
        <div className="mt-6 flow-root">
            <table className="hidden min-w-full md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                        <th scope="col" className="px-3 py-5 font-medium">ID</th>
                        <th scope="col" className="px-3 py-5 font-medium">Account</th>
                        <th scope="col" className="px-3 py-5 font-medium">Date</th>
                        <th scope="col" className="px-3 py-5 font-medium">Asset</th>
                        <th scope="col" className="px-3 py-5 font-medium text-right">Value</th>
                        <th scope="col" className="px-3 py-5 font-medium"></th>
                    </tr>
                </thead>
                
                <tbody className="bg-zinc-700 px-3">
                    {movs?movs.map((acc: BankFundsExt) => {
                    return (
                        <tr key={acc.id} className="w-full border-b py-3 text-md last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                            <td className="whitespace-nowrap px-3 py-3">{acc.id}</td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.acc_name}</td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.date.split("T")[0]}</td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.asset_name}</td>
                            <td className={clsx(
                                "whitespace-nowrap px-3 py-3 text-right",
                                {
                                    "text-red-500": acc.value<0,
                                    "text-lime-500": acc.value>=0
                                }
                            )}>
                                {acc.value.toLocaleString("de-DE", {style: "currency", currency: "EUR"})}
                            </td>
                            <td className="whitespace-nowrap px-3 py-3"><DelMovButton id={acc.id} endpoint={"funds"} /></td>
                        </tr>
                    )
                }):""}
                </tbody>
            </table>
            {
                errmessage && 
                <p className="text-red-600">
                    Cannot fetch data: {errmessage}
                </p>
            }
        </div>
    );
}
