import ActivityPieChart from "../../components/charts/dailyActivitypie.component.tsx"
import DailyLogMetrics from "../../components/charts/dailylogNumbers.component.tsx"
import MonthlyTargetDailylog from "../../components/charts/dailyMonthrecord.component.tsx"
import RecentDailyLogsTable from "../../components/charts/dayilylogRecent.componet.tsx"
import PageMeta from "../../components/common/PageMeta"

export default function DailyLogPage() {
  return (
    <>
      <PageMeta
        title="Daily Log Dashboard | Aklile - React.js Admin Dashboard"
        description="This is the Daily Log Dashboard page By aklile - React.js Tailwind CSS Admin Dashboard"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <DailyLogMetrics />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTargetDailylog target={200} />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <ActivityPieChart
            filters={{
              startDate: "2025-09-01",
              endDate: "2025-09-30",
            }}
          />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentDailyLogsTable />
        </div>
      </div>
    </>
  )
}
