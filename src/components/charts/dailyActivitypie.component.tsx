import { ApexOptions } from "apexcharts"
import Chart from "react-apexcharts"
import { AnalyticsFilters } from "../../services/healthServices/health.api"
import { useActivityCountByType } from "../../services/logsService/log.query"

interface ActivityPieChartProps {
  filters?: AnalyticsFilters
}

export default function ActivityPieChart({ filters }: ActivityPieChartProps) {
  const { data, isLoading, error } = useActivityCountByType(filters)
  console.log("Activity Pie", data)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">Loading...</div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center">Failed to load data</div>
  }

  
  const categories = data ? Object.keys(data) : []
  const series: number[] = data ? (Object.values(data) as number[]) : []

  const options: ApexOptions = {
    chart: {
      type: "pie",
      fontFamily: "Outfit, sans-serif",
      height: 320,
    },
    labels: categories,
    colors: ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA"], // Red, Yellow, Green, Blue, Purple
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    dataLabels: {
      style: {
        fontSize: "14px",
        fontWeight: "600",
      },
      formatter: function (val, opts) {
        return `${opts.w.globals.labels[opts.seriesIndex]}: ${val}`
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} log(s)`,
      },
    },
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white/90">
        Daily Logs by Type
      </h3>
      <Chart options={options} series={series} type="pie" height={320} />
    </div>
  )
}
