import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import ComponentCard from "../../components/common/ComponentCard"
import ReusableDataTable from "../../components/tables/reusableDataTabel"
import { useAllHealthRecords } from "../../services/healthServices/health.query"

export default function HealthLogPage() {
  const { data: logs, isLoading } = useAllHealthRecords()

  
  const columns = [
    { field: "id", header: "Log ID", sortable: true },
    { field: "childName", header: "Child", sortable: true },
    { field: "staffName", header: "Staff", sortable: true },
    { field: "centerName", header: "Center", sortable: true },
    { field: "className", header: "Class", sortable: true },
    { field: "type", header: "Type", sortable: true },
    { field: "severity", header: "Severity", sortable: true },
    { field: "details", header: "Details" },
    { field: "actionTaken", header: "Action Taken" },
    {
      field: "timestamp",
      header: "Time",
      sortable: true,
      body: (row: any) =>
        row.timestamp ? new Date(row.timestamp).toLocaleString() : "N/A",
    },
  ]

  const actionItems = [
    { buttonName: "edit", displayName: "Edit", visible: true },
    { buttonName: "delete", displayName: "Delete", visible: true },
  ]

  const handleRowAction = (buttonName: string, rowData: any) => {
    if (buttonName === "edit") {
      alert(`Editing health record ${rowData.id}`)
    } else if (buttonName === "delete") {
      alert(`Deleting health record ${rowData.id}`)
    }
  }

  
  const tableData =
    logs?.map((log: any) => {
      const date =
        log.timestamp && log.timestamp._seconds
          ? new Date(log.timestamp._seconds * 1000)
          : log.timestamp
          ? new Date(log.timestamp)
          : null

      return {
        id: log.id,
        childName: log.child
          ? `${log.child.firstName} ${log.child.lastName}`
          : "",
        staffName: log.staff
          ? `${log.staff.firstName} ${log.staff.lastName}`
          : "",
        centerName: log.center?.name || "",
        className: log.class?.name || "",
        type: log.type,
        severity: log.severity || "-",
        details: log.details,
        actionTaken: log.actionTaken,
        timestamp: date ? date.toLocaleString() : "",
      }
    }) || []

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <PageBreadcrumb pageTitle="Health Logs" />
      <div className="space-y-6">
        <ComponentCard title="Health Logs">
          <ReusableDataTable
            title="Health Records"
            data={tableData}
            columns={columns}
            actionItems={actionItems}
            totalRecords={tableData.length}
            onActionButtonClick={handleRowAction}
            defaultRows={5}
          />
        </ComponentCard>
      </div>
    </>
  )
}
