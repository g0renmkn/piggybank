import { 
    SellOutlined,
} from '@mui/icons-material';
import { 
    dataGetAssets,
    dataCountAssets
} from '@/app/data/api_data_assets';
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
    const assets = await dataGetAssets(searchParams || {});
    const assCount = await dataCountAssets(searchParams || {});
    const currentLimit = Number(searchParams?.limit) || 10;
    const totalPages = Math.ceil(assCount / currentLimit);

    return (
        <div>
            <h1 className="text-lg font-bold pb-5"><SellOutlined />Available Assets</h1>

            <div className="flex flex-col items-center w-3/4 mx-auto">
                <Table className="w-full" totalPages={totalPages}>
                    <THead>
                        <Th orderBy="id">ID</Th>
                        <Th orderBy="name">Asset</Th>
                        <Th orderBy="asset_type">Type</Th>
                        <Th>Description</Th>
                    </THead>
                    <TBody>
                    {
                        assets.map((ass: any) => {
                            return (
                                <TRow key={ass.id}>
                                    <Td>{ass.id}</Td>
                                    <Td>
                                        <div className="h-full flex flex-row items-center">
                                            <div className="w-[32px] h-[32px] relative rounded-full overflow-hidden mr-2 border border-primary-normal">
                                                <LogoImage src={"/accounts/" + ass.pfp} />
                                            </div>
                                            {ass.name}
                                        </div>
                                    </Td>
                                    <Td>{ass.asset_type}</Td>
                                    <Td>{ass.description}</Td>
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
  
