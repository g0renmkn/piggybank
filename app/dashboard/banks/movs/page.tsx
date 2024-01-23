import { 
    ReceiptLong,
} from '@mui/icons-material';
import { BankAccountCard } from '@/app/ui/dashboard/bank_account_card';
// ToDo: Remove the mock and properly retrieve data via API
import { mockAccounts } from '@/app/data/mock';


export default function Page() {
    return (
        <div className="flex flex-col">
            <h1 className="text-lg font-bold"><ReceiptLong />Bank Movements</h1>

            <div className="flex flex-row flex-wrap gap-5 mt-5 pt-5 px-5 justify-center">
                {
                    mockAccounts.map((acc, idx) => {
                        return (
                            <BankAccountCard key={acc.name} item={acc} selected={idx===0}/>
                        )
                    })
                }
            </div>
        </div>
    );
}
  