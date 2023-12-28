/**
 * ui/components/table.tsx
 * 
 * Generic Table component definition
 * 
 */


/**
 * <Table />
 * 
 * Generic Table component
 * 
 * @param param0 
 * @returns <Table />
 */
export function Table({cols, data}: {cols: any[]; data: any[]}) {

    return (
        <table className="min-w-full">
            <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                    {
                        cols.map(n => {return (
                            <th key={n} scope="col" className="px-4 py-5 font-medium text-right">{n}</th>
                        )})
                    }
                </tr>
            </thead>

            <tbody className="bg-zinc-700 px-3">
                {
                    data.map(row => {
                        return (
                            <tr key={row.toString()}>
                                {row.map((item:number) => 
                                    <td key={item} className="whitespace-nowrap px-3 py-3 text-right">
                                        {item}
                                    </td>
                                )}
                            </tr>
                        )
                    })
                }
            </tbody>
            <tbody>

            </tbody>
        </table>
    )
}