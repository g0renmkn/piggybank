import { 
    MonetizationOnOutlined,
} from '@mui/icons-material';
import { 
    dataGetPrices,
    dataCountPrices
} from '@/app/data/api_data_prices';
import { staticGetAssetTypes } from '@/app/data/api_static_data';
import { dataGetAssets } from '@/app/data/api_data_assets';
import LogoImage from '@/app/ui/components/logoimage';
import {
    Table,
    THead,
    Th,
    TBody,
    TRow,
    Td,    
} from '@/app/ui/components/table/table';
import Link from 'next/link';
import AssetTag from '@/app/ui/dashboard/asset_tag';
import clsx from 'clsx';


/**
 * 
 * @param param0 
 * @returns 
 */
export default async function Page(
    {searchParams}: 
    {
        searchParams?: {
            query?: string;
            page?: string;
            limit?: string;
            dir?: string;
            orderby?: string;
            asset_id?: string;
        };
    }
) {
    const assets = await dataGetPrices(searchParams || {});
    const assCount = await dataCountPrices(searchParams || {});
    const currentLimit = Number(searchParams?.limit) || 10;
    const totalPages = Math.ceil(assCount / currentLimit);
    const assetTypes = await staticGetAssetTypes();

    const grouppedAssets = await Promise.all(assetTypes.map(async (e: any) => {
        return {
            key: e.id,
            title: e.name,
            items: await dataGetAssets({type: e.id, orderby: "name", dir: "ASC"})
        }
    }));

    return (
        <div>
            {/* Page title */}
            <h1 className="text-lg font-bold pb-5"><MonetizationOnOutlined />Asset Prices</h1>

            {/* Div with the assets list groups */}
            <div className="flex flex-row w-full mx-auto my-10 gap-2">
            {
                grouppedAssets.map((grp: any) => {
                    return(
                        (grp.items.length > 0) &&
                        <div key={`${grp.key}-div`} className="flex flex-col rounded-md px-2 basis-full">
                            <h1 key={`${grp.key}-h1`}>{grp.title[0].toUpperCase() + grp.title.substr(1) + ":"}</h1>
                            <div key={`${grp.key}-content`} className="flex flex-row gap-2 flex-wrap">
                                {
                                    grp.items.map((asset: any) => {
                                        return (
                                            <AssetTag key={asset.id} item={asset} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
            </div>

            {/* Table with the prices */}
            <div className="flex flex-col items-center w-full mx-auto">
                <Table className="w-full" totalPages={totalPages}>
                    <THead>
                        <Th orderBy="id">ID</Th>
                        <Th orderBy="date">Date</Th>
                        <Th orderBy="name" className={clsx(
                            "flex-basis",
                            {
                                "hidden": searchParams?.asset_id
                            }
                        )}>
                            Asset
                        </Th>
                        <Th orderBy="open">Open</Th>
                        <Th orderBy="high">High</Th>
                        <Th orderBy="low">Low</Th>
                        <Th orderBy="close">Close</Th>
                    </THead>
                    <TBody>
                    {
                        assets.map((ass: any) => {
                            return (
                                <TRow key={ass.id}>
                                    <Td>{ass.id}</Td>
                                    <Td>{ass.date.split("T")[0]}</Td>
                                    <Td className={clsx(
                                        "flex-basis",
                                        {
                                            "hidden": searchParams?.asset_id
                                        }
                                    )}>
                                        {ass.asset_name}
                                    </Td>
                                    <Td>{ass.open}</Td>
                                    <Td>{ass.high}</Td>
                                    <Td>{ass.low}</Td>
                                    <Td>{ass.close}</Td>
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
  
