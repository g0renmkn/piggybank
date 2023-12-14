import { MovsTable } from "@/app/ui/components/banks/tables";
// import { AccountsForm } from "@/app/ui/components/banks/forms";
import { 
  WalletIcon2
} from "@/app/ui/components/icons";
import SearchBar from "@/app/ui/components/banks/searchbar";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  let query = searchParams?.query || '';
  const currentPage = searchParams?.page || "0";

  // Sanitize
  query = query.replace(/\\/g, "\\\\");
  query = query.replace(/'/g, "\\'");

  return (
    <div>
      <div className="flex flex-row"><WalletIcon2 className="w-6 h-6 stroke-2" /><h1 className="text-lg px-2">Bank movements</h1></div>
      <SearchBar placeholder={"Enter query"} />
      <MovsTable query={query} currentPage={currentPage} />
    </div>
  );
}
