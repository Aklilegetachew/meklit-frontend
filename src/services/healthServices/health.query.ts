import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getAllHealthRecords,
  getHealthRecordsByChildId,
  getHealthRecordsByStaffId,
  getHealthRecordsByCenterId,
  createHealthRecord,
  HealthRecord,
  getIncidentVsMedication,
  getIncidentsBySeverity,
  getIncidentsByChild,
  getMedicationByChild,
  getRecordsByStaff,
  getRecordsByCenter,
  getRecordsOverTime,
  getIncidentTypeBreakdown,
  getActionTakenSummary,
  AnalyticsFilters,
  getIncidentsByClass,
  IncidentsByClassResponse,
  IncidentByClassFilters,
  getRecent,
} from "./health.api"

export const useAllHealthRecords = () => {
  return useQuery({
    queryKey: ["healthRecords"],
    queryFn: getAllHealthRecords,
    staleTime: 1000 * 60 * 5,
  })
}

// 2️⃣ Fetch by childId
export const useHealthRecordsByChildId = (childId: string) => {
  return useQuery({
    queryKey: ["healthRecords", "child", childId],
    queryFn: () => getHealthRecordsByChildId(childId),
    enabled: !!childId,
  })
}

// 3️⃣ Fetch by staffId
export const useHealthRecordsByStaffId = (staffId: string) => {
  return useQuery({
    queryKey: ["healthRecords", "staff", staffId],
    queryFn: () => getHealthRecordsByStaffId(staffId),
    enabled: !!staffId,
  })
}

// 4️⃣ Fetch by centerId
export const useHealthRecordsByCenterId = (centerId: string) => {
  return useQuery({
    queryKey: ["healthRecords", "center", centerId],
    queryFn: () => getHealthRecordsByCenterId(centerId),
    enabled: !!centerId,
  })
}

// 5️⃣ Create a new health record
export const useCreateHealthRecord = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      record: Omit<HealthRecord, "id" | "child" | "staff" | "center" | "class">
    ) => createHealthRecord(record),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["healthRecords"] })
    },
  })
}

// ----------- Health Analytics -----------
export const useIncidentVsMedication = (filters?: AnalyticsFilters) =>
  useQuery({
    queryKey: ["incidentVsMedication", filters],
    queryFn: () => getIncidentVsMedication(filters),
  })

export const useIncidentsBySeverity = (filters?: AnalyticsFilters) =>
  useQuery({
    queryKey: ["incidentsBySeverity", filters],
    queryFn: () => getIncidentsBySeverity(filters),
  })

export const useIncidentsByChild = (filters?: AnalyticsFilters) =>
  useQuery({
    queryKey: ["incidentsByChild", filters],
    queryFn: () => getIncidentsByChild(filters),
  })

export const useMedicationByChild = (filters?: AnalyticsFilters) =>
  useQuery({
    queryKey: ["medicationByChild", filters],
    queryFn: () => getMedicationByChild(filters),
  })

export const useRecordsByStaff = (filters?: AnalyticsFilters) =>
  useQuery({
    queryKey: ["recordsByStaff", filters],
    queryFn: () => getRecordsByStaff(filters),
  })

export const useRecordsByCenter = (filters?: AnalyticsFilters) =>
  useQuery({
    queryKey: ["recordsByCenter", filters],
    queryFn: () => getRecordsByCenter(filters),
  })

export const useRecordsOverTime = (filters?: AnalyticsFilters) =>
  useQuery({
    queryKey: ["recordsOverTime", filters],
    queryFn: () => getRecordsOverTime(filters),
  })

export const useIncidentTypeBreakdown = (filters?: AnalyticsFilters) =>
  useQuery({
    queryKey: ["incidentTypeBreakdown", filters],
    queryFn: () => getIncidentTypeBreakdown(filters),
  })

export const useActionTakenSummary = (filters?: AnalyticsFilters) =>
  useQuery({
    queryKey: ["actionTakenSummary", filters],
    queryFn: () => getActionTakenSummary(filters),
  })

export const useIncidentsByClass = (filters: IncidentByClassFilters) => {
  return useQuery<IncidentsByClassResponse>({
    queryKey: ["incidentsByClass", filters],
    queryFn: () => getIncidentsByClass(filters),
    enabled: !!filters.startDate && !!filters.endDate,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useRecentHealthRecords = () => {
  return useQuery({
    queryKey: ["recentHealthRecords"],
    queryFn: getRecent,
    staleTime: 1000 * 60 * 35,
  })
}
