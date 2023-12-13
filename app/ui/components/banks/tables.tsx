/**
 * @/app/ui/components/banks/tables.tsx
 * 
 * Table components to display different Banks related data.
 * 
 */
import { BankAccount } from "@/app/lib/db/definitions";
import { bankGetAccs } from "@/app/lib/db/api_banks";
import ActiveTag from "@/app/ui/components/active_tag";
import { DelAccButton } from "@/app/ui/components/buttons";

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
                        <th></th>
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
                            <td><DelAccButton id={acc.id} /></td>
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
