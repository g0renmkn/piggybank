import { 
    ContactPageOutlined,
} from '@mui/icons-material';
import { 
    bankGetAccs,
    bankCountAccs
} from '@/app/data/api_banks_accounts';
import LogoImage from '@/app/ui/components/logoimage';
import {
    Table,
    THead,
    Th,
    TBody,
    TRow,
    Td,    
} from '@/app/ui/components/table/table';


export default async function Page(
    {searchParams}: 
    {
        searchParams?: {
            query?: string;
            page?: string;
            limit?: string;
            dir?: string;
            orderby?: string;
        };
    }
) {
    const currentLimit = Number(searchParams?.limit) || 10;
    const accounts = await bankGetAccs(searchParams || {});
    const accsCount = await bankCountAccs(searchParams || {});
    const totalPages = Math.ceil(accsCount / currentLimit);

    return (
        <div>
            <h1 className="text-lg font-bold pb-5"><ContactPageOutlined />Bank Accounts</h1>

            <div className="flex flex-col items-center w-full mx-auto">
                <Table className="w-full" totalPages={totalPages}>
                    <THead>
                        <Th orderBy="id">ID</Th>
                        <Th orderBy="name">Account</Th>
                        <Th orderBy="iban">IBAN</Th>
                        <Th>Comments</Th>
                    </THead>
                    <TBody>
                    {
                        accounts.map((acc: any) => {
                            return (
                                <TRow key={acc.id}>
                                    <Td>{acc.id}</Td>
                                    <Td>
                                        <div className="h-full flex flex-row items-center">
                                            <div className="w-[32px] h-[32px] relative rounded-full overflow-hidden mr-2">
                                                <LogoImage src={"/accounts/" + acc.pfp} />
                                            </div>
                                            {acc.name}
                                        </div>
                                    </Td>
                                    <Td>{acc.iban}</Td>
                                    <Td>{acc.comments}</Td>
                                </TRow>
                            );
                        })
                    }
                    </TBody>
                </Table>
            </div>
        </div>
    );
}
  
