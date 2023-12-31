import { AccountsTable } from "@/app/ui/components/banks/tables";
import { AccountsForm } from "@/app/ui/components/banks/forms";
import { 
  BankIcon
} from "@/app/ui/components/icons";

export default async function Page() {
  return (
    <div>
      <div className="flex flex-row"><BankIcon className="w-6 h-6 stroke-2 mb-6" /><h1 className="text-lg px-2">Bank accounts</h1></div>
      <details>
        <summary className="cursor-pointer">Create account</summary>
        <AccountsForm />
      </details>
      <AccountsTable />
    </div>
  );
}
