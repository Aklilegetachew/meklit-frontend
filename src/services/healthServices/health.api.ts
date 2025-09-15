import api from "../api" 

export interface HealthRecord {
  id?: string
  childId: string
  recordedByUserId: string
  centerId: string
  timestamp: Date
  type: "Incident" | "Medication Administered"
  severity?: "Low" | "Medium" | "High"
  details: string
  actionTaken: string
  medicationName?: string
  dose?: string
  notes?: string
  child?: any
  staff?: any 
  center?: any 
  class?: any 
}

export type IncidentsByClassResponse = Record<string, number>

export interface IncidentByClassFilters {
  startDate: string
  endDate: string
}

// Create a new health record
export const createHealthRecord = async (
  record: Omit<HealthRecord, "id" | "child" | "staff" | "center" | "class">
): Promise<HealthRecord> => {
  const res = await api.post<HealthRecord>("/healthRecords", record)
  return res.data
}

// Get all health records
export const getAllHealthRecords = async (): Promise<HealthRecord[]> => {
  const res = await api.get<HealthRecord[]>("/healthRecords")
  return res.data
}

// Get health records by childId
export const getHealthRecordsByChildId = async (
  childId: string
): Promise<HealthRecord[]> => {
  const res = await api.get<HealthRecord[]>(`/healthRecords/child/${childId}`)
  return res.data
}

// Get health records by staffId
export const getHealthRecordsByStaffId = async (
  staffId: string
): Promise<HealthRecord[]> => {
  const res = await api.get<HealthRecord[]>(`/healthRecords/staff/${staffId}`)
  return res.data
}

// Get health records by centerId
export const getHealthRecordsByCenterId = async (
  centerId: string
): Promise<HealthRecord[]> => {
  const res = await api.get<HealthRecord[]>(`/healthRecords/center/${centerId}`)
  return res.data
}

export interface AnalyticsFilters {
  childId?: string
  staffId?: string
  centerId?: string
  classId?: string
  type?: string
  severity?: string
  startDate?: string
  endDate?: string
}

export const getIncidentVsMedication = async (filters?: AnalyticsFilters) => {
  const res = await api.get("/healthRecords/incident-vs-medication", {
    params: filters,
  })
  return res.data
}

export const getIncidentsBySeverity = async (filters?: AnalyticsFilters) => {
  const res = await api.get("/healthRecords/incidents-by-severity", {
    params: filters,
  })
  return res.data
}

export const getIncidentsByChild = async (filters?: AnalyticsFilters) => {
  const res = await api.get("/healthRecords/incidents-by-child", {
    params: filters,
  })
  return res.data
}

export const getMedicationByChild = async (filters?: AnalyticsFilters) => {
  const res = await api.get("/healthRecords/medication-by-child", {
    params: filters,
  })
  return res.data
}

export const getRecordsByStaff = async (filters?: AnalyticsFilters) => {
  const res = await api.get("/healthRecords/records-by-staff", {
    params: filters,
  })
  return res.data
}

export const getRecordsByCenter = async (filters?: AnalyticsFilters) => {
  const res = await api.get("/healthRecords/records-by-center", {
    params: filters,
  })
  return res.data
}

export const getRecordsOverTime = async (filters?: AnalyticsFilters) => {
  const res = await api.get("/healthRecords/records-over-time", {
    params: filters,
  })
  return res.data
}

export const getIncidentTypeBreakdown = async (filters?: AnalyticsFilters) => {
  const res = await api.get("/healthRecords/incident-type-breakdown", {
    params: filters,
  })
  return res.data
}

export const getActionTakenSummary = async (filters?: AnalyticsFilters) => {
  const res = await api.get("/healthRecords/action-taken-summary", {
    params: filters,
  })
  return res.data
}

export const getIncidentsByClass = async (filters: IncidentByClassFilters) => {
  const { data } = await api.get<IncidentsByClassResponse>(
    "/healthRecords/incident-by-class",
    { params: filters }
  )
  return data
}

export const getRecent = async () => {
  const { data } = await api.get(
    "/healthRecords/recent"
  )
  return data
}
