import EcommerceMetrics from "../../components/charts/HealtMeterics.component.tsx.tsx"
import MonthlySalesChart from "../../components/charts/MonthlyHealthRecords.component.tsx.tsx"
import MonthlyTarget from "../../components/charts/MonthlyTarget.tsx"
import SeverityPieChart from "../../components/charts/piechartIncident.component.tsx"
import PageMeta from "../../components/common/PageMeta"
import RecentRecords from "../../components/charts/RecentHealthRecords.componets.tsx"

export default function Home() {
  return (
    <>
      <PageMeta
        title="Home Dashboard | Aklile - React.js Admin Dashboard"
        description="This is the Health log Dashboard page By aklile - React.js Tailwind CSS Admin Dashboard"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget target={200} />
        </div>

        {/* <div className="col-span-12 xl:col-span-5">
          <ClassIncidentsBarChart />
        </div> */}

        <div className="col-span-12 xl:col-span-5">
          <SeverityPieChart
            filters={{
              startDate: new Date("2025-09-01"),
              endDate: new Date("2025-09-30"),
            }}
          />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentRecords />
        </div>
      </div>
    </>
  )
}
