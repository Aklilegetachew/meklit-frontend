import {
  useLogsOverTime,
  useActivityCountByType,
  useLogsByChild,
} from "../../services/logsService/log.query"
import Badge from "../ui/badge/Badge"

import { ActivityIcon, ArrowDownIcon, ArrowUpIcon } from "lucide-react"

export default function DailyLogMetrics() {

  const { data: logsOverTime } = useLogsOverTime()
  const { data: activityCounts } = useActivityCountByType()
  const { data: logsByChild } = useLogsByChild()


  const logsEntries = logsOverTime ? Object.entries(logsOverTime) : []
  const latestLogs = logsEntries[logsEntries.length - 1]?.[1] ?? 0
  const prevLogs = logsEntries[logsEntries.length - 2]?.[1] ?? 0
  const logsChange =
    Number(prevLogs) > 0
      ? (
          ((Number(latestLogs) - Number(prevLogs)) / Number(prevLogs)) *
          100
        ).toFixed(2)
      : "0.00"


  const activities = activityCounts ? Object.entries(activityCounts) : []
  const [topActivity, topActivityCount] =
    activities.length > 0
      ? (activities as [string, number][]).reduce((a, b) =>
          b[1] > a[1] ? b : a
        )
      : ["None", 0]


  const children = logsByChild ? Object.entries(logsByChild) : []
  let topChildren: string[] = []
  let topChildLogs = 0

  if (children.length > 0) {
    topChildLogs = Math.max(...children.map(([_, count]) => count))
    topChildren = children
      .filter(([_, count]) => count === topChildLogs)
      .map(([name]) => name)
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {/* 🔹 Daily Logs (Latest Month) */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <ActivityIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Daily Logs (Latest)
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {latestLogs}
            </h4>
          </div>
          <Badge color={parseFloat(logsChange) >= 0 ? "success" : "error"}>
            {parseFloat(logsChange) >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {logsChange}%
          </Badge>
        </div>
      </div>

      {/* 🔹 Most Frequent Activity */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <ActivityIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Most Frequent Activity
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {topActivity} ({topActivityCount})
            </h4>
          </div>
        </div>
      </div>

      {/* 🔹 Top Active Child */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <ActivityIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Top Active Child
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {topChildren.join(", ")} ({topChildLogs})
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}
