import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import ComponentCard from "../../components/common/ComponentCard"
import ReusableDataTable from "../../components/tables/reusableDataTabel"
import { useDailyLogs } from "../../services/logsService/log.query"

export default function BasicTables() {
  const { data: logs, isLoading } = useDailyLogs()


  const columns = [
    { field: "id", header: "Log ID", sortable: true },
    { field: "childName", header: "Child", sortable: true },
    { field: "staffName", header: "Staff", sortable: true },
    { field: "centerName", header: "Center", sortable: true },
    { field: "type", header: "Activity Type", sortable: true },
    { field: "details", header: "Details" },
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
      alert(`Editing log ${rowData.id}`)
    } else if (buttonName === "delete") {
      alert(`Deleting log ${rowData.id}`)
    }
  }


  const tableData =
    logs?.map((log: any) => {
      const date =
        log.timestamp && log.timestamp._seconds
          ? new Date(log.timestamp._seconds * 1000)
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
        type: log.type,
        details: log.details,
        timestamp: date ? date.toLocaleString() : "", 
      }
    }) || []

  console.log(logs)

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <PageBreadcrumb pageTitle="List Logs" />
      <div className="space-y-6">
        <ComponentCard title="Daily Logs">
          <ReusableDataTable
            title="Logs"
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
