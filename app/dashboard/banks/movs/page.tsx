import { 
    ReceiptLong,
} from '@mui/icons-material';
import { BankAccountCard } from '@/app/ui/dashboard/bank_account_card';
import { bankSumAccs } from '@/app/data/api_banks_accounts';


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
    const movs = banksSummary.movs.accs;

    return (
        <div className="flex flex-col">
            <h1 className="text-lg font-bold"><ReceiptLong />Bank Movements</h1>

            <div className="flex flex-row flex-wrap gap-5 mt-5 pt-5 px-5 justify-center">
                {
                    movs.map((acc: any) => {
                        return (
                            <BankAccountCard key={acc.name} item={acc} />
                        )
                    })
                }
            </div>
        </div>
    );
}
  