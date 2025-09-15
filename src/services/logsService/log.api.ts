import api from "../api"

export interface DailyLog {
  id?: string
  title: string
  description: string
  timestamp: Date
}

export interface RecentDailyLog {
  id: string
  childName: string
  staffName: string
  type: "Meal" | "Nap" | "Diaper" | "Mood" | "General Activity"
  details: string
  timestamp: Date
}

// ----------- Daily Logs -----------
export const getDailyLogs = async (): Promise<DailyLog[]> => {
  const res = await api.get<DailyLog[]>("/daily-logs/all")
  return res.data
}

export const createDailyLog = async (log: Omit<DailyLog, "id">) => {
  const res = await api.post<DailyLog>("/daily-logs", log)
  return res.data
}

// ---------------- Filters ----------------
export interface AnalyticsFilters {
  childId?: string
  staffId?: string
  centerId?: string
  type?: string
  startDate?: string | Date
  endDate?: string | Date
}

// Helper to convert filters to query string
const toQueryParams = (filters: AnalyticsFilters) => {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) params.append(key, String(value))
  })
  return params.toString()
}
export const getActivityCountByType = async (filters?: AnalyticsFilters) => {
  const query = filters ? `?${toQueryParams(filters)}` : ""
  const res = await api.get<Record<string, number>>(`/daily-logs/type${query}`)
  return res.data
}

// 2️⃣ Logs by Child
export const getLogsByChild = async (filters?: AnalyticsFilters) => {
  const query = filters ? `?${toQueryParams(filters)}` : ""
  const res = await api.get<Record<string, number>>(
    `/daily-logs/by-child${query}`
  )
  return res.data
}

// 3️⃣ Logs by Staff
export const getLogsByStaff = async (filters?: AnalyticsFilters) => {
  const query = filters ? `?${toQueryParams(filters)}` : ""
  const res = await api.get<Record<string, number>>(
    `/daily-logs/by-staff${query}`
  )
  return res.data
}

// 4️⃣ Logs by Center
export const getLogsByCenter = async (filters?: AnalyticsFilters) => {
  const query = filters ? `?${toQueryParams(filters)}` : ""
  const res = await api.get<Record<string, number>>(
    `/daily-logs/by-center${query}`
  )
  return res.data
}

// 5️⃣ Logs over Time
export const getLogsOverTime = async (filters?: AnalyticsFilters) => {
  const query = filters ? `?${toQueryParams(filters)}` : ""
  const res = await api.get<Record<string, number>>(
    `/daily-logs/over-time${query}`
  )
  return res.data
}

// 6️⃣ Mood Trends
export const getMoodTrends = async (filters?: AnalyticsFilters) => {
  const query = filters ? `?${toQueryParams(filters)}` : ""
  const res = await api.get<Record<string, number>>(
    `/daily-logs/mood-trends${query}`
  )
  return res.data
}

// 7️⃣ Diaper / Nap Patterns
export const getDiaperNapPatterns = async (filters?: AnalyticsFilters) => {
  const query = filters ? `?${toQueryParams(filters)}` : ""
  const res = await api.get<Record<string, Record<string, number>>>(
    `/daily-logs/diaper-nap-patterns${query}`
  )
  return res.data
}

export const getRecentDailyLogs = async (): Promise<RecentDailyLog[]> => {
  const res = await api.get<RecentDailyLog[]>("/daily-logs/recent")
  return res.data.map((log) => ({
    ...log,
    timestamp: new Date(log.timestamp),
  }))
}
