import { 
    ReceiptLong,
} from '@mui/icons-material';
import { BankAccountCard } from '@/app/ui/dashboard/bank_account_card';
import { bankSumAccs } from '@/app/data/api_banks_accounts';
import { bankGetMovs, bankCountMovs } from '@/app/data/api_bank_movs';
import {
    Table,
    THead,
    Th,
    TBody,
    TRow,
    Td,    
} from '@/app/ui/components/table/table';
import clsx from 'clsx';


type MovResult = {
    id: number;
    acc_id: number;
    date: string;
    category: number;
    description: string;
    value: number;
    periodicity: number;
    notes: string;
    acc_name: string;
    cat_name: string;
    period: string;
}


function AccountTable(
    {accID, totalPages, rows}: 
    {accID: number; totalPages: number; rows: MovResult[]}
) {
    return (
        <Table className="w-full" totalPages={totalPages}>
            <THead>
                {
                    (accID !== -1) && <>
                    <Th orderBy="id">ID</Th>
                    <Th orderBy="date">Date</Th>
                    <Th className="hidden md:table-cell" orderBy="cat_name">Category</Th>
                    <Th className="hidden md:table-cell" orderBy="period">Periodicity</Th>
                    <Th orderBy="value">Value</Th>
                    <Th orderBy="description">Description</Th></>
                }
                {
                    (accID === -1) &&
                    <Th>
                        <div className="py-5 w-fit mx-auto">
                            <h1 className="text-primary-darker text-[2em]">(No results to show)</h1>
                        </div>
                    </Th>
                }
            </THead>
            {
                (accID !== -1) && 
                <TBody>
                {
                    rows.map((row: MovResult) => {
                        return (
                            <TRow key={row.id} className="hover:bg-background-3">
                                <Td>{row.id}</Td>
                                <Td>
                                    {row.date.split("T")[0]}
                                </Td>
                                <Td className="hidden md:table-cell">{row.cat_name}</Td>
                                <Td className="hidden md:table-cell">{row.period}</Td>
                                <Td className={clsx(
                                    "",
                                    {
                                        "text-green-700": row.value >= 0,
                                        "text-red-700": row.value < 0
                                    }
                                )}
                                >
                                    {(row.value>=0?"+":"") + row.value.toLocaleString("de-DE", {style: "currency", currency: "EUR"})}
                                </Td>
                                <Td>{row.description}</Td>
                            </TRow>
                        )
                    })
                }
                </TBody>
            }
        </Table>
    )
}


export default async function Page(
    {searchParams}: 
    {
        searchParams?: {
            query?: string;
            page?: string;
            limit?: string;
            dir?: string;
            orderby?: string;
            acc_id?: string;
        };
    }
) {
    const banksSummary = await bankSumAccs();
    const bankAccounts = banksSummary.movs.accs;
    const currentAcc = Number(searchParams?.acc_id) || -1;
    
    const currentLimit = Number(searchParams?.limit) || 10;
    const movs = await bankGetMovs(searchParams || {});
    const movCount = await bankCountMovs(searchParams || {});
    const totalPages = Math.ceil(movCount / currentLimit);

    return (
        <div className="flex flex-col">
            <h1 className="text-lg font-bold"><ReceiptLong />Bank Movements</h1>
            {
                (bankAccounts.length > 0) &&
                <div className="flex flex-row flex-wrap gap-5 mt-5 pt-5 px-5 justify-center">
                    {
                        bankAccounts.map((acc: any) => {
                            return (
                                <BankAccountCard key={acc.name} item={acc} />
                            )
                        })
                    }
                </div>
            }

            <div className="flex flex-col items-center w-3/4 mx-auto mt-10">
                <AccountTable accID={currentAcc} totalPages={totalPages} rows={movs} />
            </div>
        </div>
    );
}
  