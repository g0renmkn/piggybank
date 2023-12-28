/**
 * app/dashboard/(banks)/bankmain/page.tsx
 * 
 * Banks Overview Page component
 * 
 */
import { Card } from "@/app/ui/components/cards";
import { banksSummary } from "@/app/lib/db/api_summaries";
import { Table } from "@/app/ui/components/table";
import { Chart } from "@/app/ui/components/charts";

/**
 * <Page />
 * 
 * Banks Overview Page component
 * 
 * @returns 
 */
export default async function Page() {
    const result = await banksSummary();

    const totalBalance = result.movs.total + result.stocks.total + result.funds.total;

    return (
      <div>
        <h1 className="mb-6">Banks Overview</h1>
        <div className="grid grid-cols-3 gap-6">

          <div className="col-start-2">
            <Card title="Total balance" value={totalBalance.toLocaleString("de-DE", { style: "currency", currency: "EUR" })} />
          </div>

          <div className="flex flex-col gap-6 col-start-1">
            <Card title="Cash" value={result.movs.total.toLocaleString("de-DE", { style: "currency", currency: "EUR" })} />
            <Card title="Cash distribution chart" value="chart">
              <Chart data={result.movs.accs.map((item:any) => {return {name: item.name, value: item.balance}})} />
            </Card>
            <Table 
              cols={["Account", "Balance"]} 
              data={result.movs.accs.map((item:any) => [item.name, item.balance.toLocaleString("de-DE", {style: "currency", currency: "EUR"})])} 
              />
          </div>

          <div className="flex flex-col gap-6">
            <Card title="Stocks" value={result.stocks.total.toLocaleString("de-DE", { style: "currency", currency: "EUR" })} />
            <Card title="Stocks distribution chart" value="chart">
              <Chart data={result.stocks.accs.map((item:any) => {return {name: item.name, value: item.balance}})} />
            </Card>
            <Table 
              cols={["Account", "Balance"]} 
              data={result.stocks.accs.map((item:any) => [item.name, item.balance.toLocaleString("de-DE", {style: "currency", currency: "EUR"})])} 
              />
          </div>

          <div className="flex flex-col gap-6">
            <Card title="Funds" value={result.funds.total.toLocaleString("es-ES", { style: "currency", currency: "EUR" })} />
            <Card title="Funds distribution chart" value="chart">
              <Chart data={result.funds.accs.map((item:any) => {return {name: item.name, value: item.balance}})} />
            </Card>
            <Table 
              cols={["Account", "Balance"]} 
              data={result.funds.accs.map((item:any) => [item.name, item.balance.toLocaleString("de-DE", {style: "currency", currency: "EUR"})])} 
              />
          </div>
        </div>
      </div>
    );
  }
  