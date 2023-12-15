import { MovsTable } from "@/app/ui/components/banks/tables";
// import { AccountsForm } from "@/app/ui/components/banks/forms";
import { 
  WalletIcon2
} from "@/app/ui/components/icons";
import SearchBar from "@/app/ui/components/banks/searchbar";
import Pagination from "@/app/ui/components/banks/pagination";
import { bankCountMovs } from "@/app/lib/db/api_banks";

/**
 * <Page />
 * @param param0 
 * @returns 
 */
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
  };
}) {
  let query = searchParams?.query || '';
  const currentPage = searchParams?.page || "0";
  const currentLimit = searchParams?.limit || "20";
  const totalRows = await bankCountMovs(query);
  const totalPages = Math.ceil(totalRows / Number(currentLimit));

  // Sanitize
  query = query.replace(/\\/g, "\\\\");
  query = query.replace(/'/g, "\\'");

  return (
    <div>
      <div className="flex flex-row"><WalletIcon2 className="w-6 h-6 stroke-2" /><h1 className="text-lg px-2">Bank movements</h1></div>
      <SearchBar placeholder={"Enter query"} defaultLimit={currentLimit} />
      <MovsTable query={query} currentPage={currentPage} limit={currentLimit} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={Number(totalPages)} />
      </div>
    </div>
  );
}
