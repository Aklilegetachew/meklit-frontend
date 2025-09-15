import Chart from "react-apexcharts"
import { ApexOptions } from "apexcharts"
import { useIncidentsByClass } from "../../services/healthServices/health.query"

export default function ClassIncidentsBarChart() {
  const now = new Date()
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1)
  startDate.setHours(0, 0, 0, 0) 
  const startISO = startDate.toISOString().split("T")[0] 

 
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  endDate.setHours(23, 59, 59, 999) // end of day
  const endISO = endDate.toISOString().split("T")[0]

  const { data, isLoading } = useIncidentsByClass({
    startDate: startISO,
    endDate: endISO,
    
  })
  console.log("data", data)

  const categories = data ? Object.keys(data) : []
  const counts = data ? Object.values(data) : []

  const options: ApexOptions = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ["transparent"] },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: { title: { text: undefined } },
    grid: { yaxis: { lines: { show: true } } },
    fill: { opacity: 1 },
    tooltip: {
      x: { show: false },
      y: { formatter: (val: number) => `${val}` },
    },
  }

  const series = [{ name: "Incidents", data: counts }]

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      {isLoading ? (
        <p className="text-center text-gray-400 py-4">Loading...</p>
      ) : (
        <div id="chartOne" className="min-w-[600px]">
          <Chart options={options} series={series} type="bar" height={180} />
        </div>
      )}
    </div>
  )
}
