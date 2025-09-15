import Badge from "../ui/badge/Badge"
import {
  useIncidentVsMedication,
  useIncidentTypeBreakdown,
  useRecordsOverTime,
} from "../../services/healthServices/health.query"
import {
  ActivityIcon,
  AlertTriangleIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  PillIcon,
} from "lucide-react"

export default function HealthMetrics() {
  
  const { data: recordsOverTime } = useRecordsOverTime()
  const { data: incidentVsMedication } = useIncidentVsMedication()
  const { data: incidentTypeBreakdown } = useIncidentTypeBreakdown()


  const recordsEntries = recordsOverTime ? Object.entries(recordsOverTime) : []
  const latestRecords = recordsEntries[recordsEntries.length - 1]?.[1] ?? 0
  const prevRecords = recordsEntries[recordsEntries.length - 2]?.[1] ?? 0
  const recordsChange =
    Number(prevRecords) > 0
      ? (
          ((Number(latestRecords) - Number(prevRecords)) /
            Number(prevRecords)) *
          100
        ).toFixed(2)
      : "0.00"


  const incidents = incidentVsMedication?.incidentCount ?? 0
  const medications = incidentVsMedication?.medicationCount ?? 0


  const incidentTypes = incidentTypeBreakdown
    ? Object.entries(incidentTypeBreakdown)
    : []
  const [topIncidentType, topIncidentCount] =
    incidentTypes.length > 0
      ? (incidentTypes as [string, number][]).reduce((a, b) =>
          b[1] > a[1] ? b : a
        )
      : ["None", 0]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
  
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <ActivityIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Health Records (This Month)
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {String(latestRecords)}
            </h4>
          </div>
          <Badge color={parseFloat(recordsChange) >= 0 ? "success" : "error"}>
            {parseFloat(recordsChange) >= 0 ? (
              <ArrowUpIcon />
            ) : (
              <ArrowDownIcon />
            )}
            {recordsChange}%
          </Badge>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <PillIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Incidents vs Medication
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {incidents} / {medications}
            </h4>
          </div>
        </div>
      </div>

  
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <AlertTriangleIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Most Common Incident
            </span>
            <h1 className="mt-2 font-bold text-sm text-gray-800  dark:text-white/90">
              {topIncidentType} ({topIncidentCount})
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
