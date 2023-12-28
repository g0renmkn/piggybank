/**
 * app/dashboard/(banks)/bankmain/page.tsx
 * 
 * Banks Overview Page component
 * 
 */
import { Card } from "@/app/ui/components/cards";
import { banksSummary } from "@/app/lib/db/api_summaries";

/**
 * <Page />
 * 
 * Banks Overview Page component
 * 
 * @returns 
 */
export default async function Page() {
    const result = await banksSummary();
    console.log(result);

    const totalBalance = result.movs.total + result.stocks.total + result.funds.total;

    return (
      <div>
        <h1 className="mb-6">Banks Overview</h1>
        <div className="grid grid-cols-3 gap-6">

          <div className="col-start-2">
            <Card title="Total balance" value={totalBalance.toLocaleString("es-ES", { style: "currency", currency: "EUR" })} />
          </div>

          <div className="flex flex-col gap-6 col-start-1">
            <Card title="Cash" value={result.movs.total.toLocaleString("es-ES", { style: "currency", currency: "EUR" })} />
            <Card title="Cash distribution chart" value="chart">
              <p>Chart Component</p>
            </Card>
            <table>
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Account</th>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Value</th>
                </tr>
              </thead>
              <tbody className="bg-zinc-700">
                <tr>
                  <td className="whitespace-nowrap px-3 py-3">BBVA Main</td>
                  <td className="whitespace-nowrap px-3 py-3">2.345,23 €</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-6">
            <Card title="Stocks" value={result.stocks.total.toLocaleString("es-ES", { style: "currency", currency: "EUR" })} />
            <Card title="Stocks distribution chart" value="chart">
              <p>Chart Component</p>
            </Card>
            <p>Stocks distribution table</p>
          </div>

          <div className="flex flex-col gap-6">
            <Card title="Funds" value={result.funds.total.toLocaleString("es-ES", { style: "currency", currency: "EUR" })} />
            <Card title="Funds distribution chart" value="chart">
              <p>Chart Component</p>
            </Card>
            <p>Funds distribution table</p>
          </div>
        </div>
      </div>
    );
  }
  