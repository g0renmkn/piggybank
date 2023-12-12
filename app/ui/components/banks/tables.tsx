/**
 * @/app/ui/components/banks/tables.tsx
 * 
 * Table components to display different Banks related data.
 * 
 */
import { BankAccount } from "@/app/lib/db/definitions";
import { bankGetAccs } from "@/app/lib/db/api_banks";


/**
 * <AccountsTable />
 * 
 * Account displaying table component.
 * 
 * @returns <AccountsTable />
 */
export async function AccountsTable() {
    const accs = await bankGetAccs();

    return (
        <div className="mt-6 flow-root">
            <table className="hidden min-w-full md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">ID</th>
                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Account</th>
                        <th scope="col" className="px-3 py-5 font-medium">IBAN</th>
                        <th scope="col" className="px-3 py-5 font-medium">Comments</th>
                    </tr>
                </thead>
                {/* <thead>
                    <th>Account</th><th>IBAN</th><th>Comments</th>
                </thead> */}
                
                <tbody className="bg-zinc-700">
                    {accs.map((acc: BankAccount) => {
                    return (
                        <tr key={acc.id} className="w-full border-b py-3 text-md last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                            <td className="whitespace-nowrap px-3 py-3">{acc.id}</td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.name}</td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.iban}</td>
                            <td className="whitespace-nowrap px-3 py-3">{acc.comments}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}
