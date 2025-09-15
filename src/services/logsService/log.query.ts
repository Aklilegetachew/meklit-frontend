import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  DailyLog,
  createDailyLog,
  getDailyLogs,
  getActivityCountByType,
  getLogsByChild,
  getLogsByStaff,
  getLogsByCenter,
  getLogsOverTime,
  getMoodTrends,
  getDiaperNapPatterns,
  AnalyticsFilters,
  getRecentDailyLogs,
  RecentDailyLog,
} from "./log.api"

// ---------------- Daily Logs ----------------
export const useDailyLogs = () => {
  return useQuery<DailyLog[], Error>({
    queryKey: ["dailyLogs"],
    queryFn: getDailyLogs,
  })
}

export const useCreateDailyLog = () => {
  const queryClient = useQueryClient()
  return useMutation<DailyLog, Error, Omit<DailyLog, "id">>({
    mutationFn: createDailyLog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dailyLogs"] }),
  })
}

// ---------------- Analytics Hooks ----------------
const createAnalyticsQuery = <T>(
  key: string,
  fn: (filters?: AnalyticsFilters) => Promise<T>,
  filters?: AnalyticsFilters
) => {
  return useQuery<T, Error>({
    queryKey: ["analytics", key, filters ?? {}],
    queryFn: () => fn(filters),
  })
}

export const useActivityCountByType = (filters?: AnalyticsFilters) =>
  createAnalyticsQuery("activityCountByType", getActivityCountByType, filters)

export const useLogsByChild = (filters?: AnalyticsFilters) =>
  createAnalyticsQuery("logsByChild", getLogsByChild, filters)

export const useLogsByStaff = (filters?: AnalyticsFilters) =>
  createAnalyticsQuery("logsByStaff", getLogsByStaff, filters)

export const useLogsByCenter = (filters?: AnalyticsFilters) =>
  createAnalyticsQuery("logsByCenter", getLogsByCenter, filters)

export const useLogsOverTime = (filters?: AnalyticsFilters) =>
  createAnalyticsQuery("logsOverTime", getLogsOverTime, filters)

export const useMoodTrends = (filters?: AnalyticsFilters) =>
  createAnalyticsQuery("moodTrends", getMoodTrends, filters)

export const useDiaperNapPatterns = (filters?: AnalyticsFilters) =>
  createAnalyticsQuery("diaperNapPatterns", getDiaperNapPatterns, filters)

export const useRecentDailyLogs = () => {
  return useQuery<RecentDailyLog[], Error>({
    queryKey: ["recentDailyLogs"],
    queryFn: getRecentDailyLogs,
    staleTime: 1000 * 60, // 1 min
  })
}
