import { AccountsTable } from "@/app/ui/components/banks/tables";
import { AccountsForm } from "@/app/ui/components/banks/forms";

export default async function Page() {
  return (
    <div>
      <h1 className="text-lg">Bank accounts</h1>
      <AccountsForm />
      <AccountsTable />
    </div>
  );
}
