import { MovsTable } from "@/app/ui/components/banks/tables";
// import { AccountsForm } from "@/app/ui/components/banks/forms";
import { 
  WalletIcon2
} from "@/app/ui/components/icons";

export default async function Page() {
  return (
    <div>
      <div className="flex flex-row"><WalletIcon2 className="w-6 h-6 stroke-2" /><h1 className="text-lg px-2">Bank movements</h1></div>
      <MovsTable />
    </div>
  );
}
