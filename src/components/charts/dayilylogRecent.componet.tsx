import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table"
import Badge from "../ui/badge/Badge"
import { useRecentDailyLogs } from "../../services/logsService/log.query"

export default function RecentDailyLogsTable() {
  const { data, isLoading, error } = useRecentDailyLogs()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error fetching recent logs</p>

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Recent Daily Logs
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Child
              </TableCell>
              <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Staff
              </TableCell>
              <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Type
              </TableCell>
              <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Details
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {data?.map((log) => (
              <TableRow key={log.id}>
                {/* Child Column with Avatar */}
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold text-lg">
                      {log.childName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {log.childName}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Staff */}
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {log.staffName}
                </TableCell>

                {/* Type */}
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      log.type === "Meal"
                        ? "success"
                        : log.type === "Nap"
                        ? "info"
                        : log.type === "Diaper"
                        ? "warning"
                        : log.type === "Mood"
                        ? "primary"
                        : "light"
                    }
                  >
                    {log.type}
                  </Badge>
                </TableCell>

                {/* Details */}
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {log.details}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
