import { 
    AttachMoney,
} from '@mui/icons-material';
import { BankAccountCard } from '@/app/ui/dashboard/bank_account_card';
import { bankSumAccs } from '@/app/data/api_banks_accounts';
import { bankGetFunds, bankCountFunds } from '@/app/data/api_bank_funds';
import {
    Table,
    THead,
    Th,
    TBody,
    TRow,
    Td,    
} from '@/app/ui/components/table/table';
import clsx from 'clsx';


type FundsResult = {
    id: number;
    acc_id: number;
    date: string;
    comments: string;
    value: number;
    acc_name: string;
}


function AccountTable(
    {accID, totalPages, rows, dateErrors}: 
    {
        accID: number;
        totalPages: number;
        rows: FundsResult[];
        dateErrors?: boolean;
    }
) {
    return (
        <Table className="w-full" totalPages={totalPages} dateFilter dateErrors={dateErrors}>
            <THead>
                {
                    (accID !== -1) && <>
                    <Th orderBy="id">ID</Th>
                    <Th orderBy="date">Date</Th>
                    <Th orderBy="value">Value</Th>
                    <Th orderBy="comments">Comments</Th></>
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
                    rows.map((row: FundsResult) => {
                        return (
                            <TRow key={row.id} className="hover:bg-background-3">
                                <Td>{row.id}</Td>
                                <Td>
                                    {row.date.split("T")[0]}
                                </Td>
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
                                <Td>{row.comments}</Td>
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
            df: string;
            dt: string;
        };
    }
) {
    let movs = [];
    let movCount = 0;
    let dateErrors = false;

    const banksSummary = await bankSumAccs();
    const bankAccounts = banksSummary.funds.accs;
    const currentAcc = Number(searchParams?.acc_id) || -1;
    
    const currentLimit = Number(searchParams?.limit) || 10;

    try {
        movs = await bankGetFunds(searchParams || {});
        movCount = await bankCountFunds(searchParams || {});
    }
    catch (err: any) {
        if (err instanceof TypeError  || err.name === "PB_ERR_WRONG_DATE_RANGE") {
            dateErrors = true;
        }
        else {
            console.log(err);
        }
    }

    const totalPages = Math.ceil(movCount / currentLimit);
    

    return (
        <div className="flex flex-col">
            <h1 className="text-lg font-bold"><AttachMoney />Bank Funds</h1>
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

            <div className="flex flex-col items-center w-full mx-auto mt-10">
                <AccountTable accID={currentAcc} totalPages={totalPages} rows={movs} dateErrors={dateErrors} />
            </div>
        </div>
    );
}
  