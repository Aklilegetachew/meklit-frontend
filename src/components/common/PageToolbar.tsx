import React from "react"
import { Button } from "../ui/button/Button"

interface ToolbarAction {
  label: string
  onClick: () => void
  icon?: React.ReactNode
  variant?: "default" | "outline" | "ghost"
}

interface PageToolbarProps {
  actions: ToolbarAction[]
  children?: React.ReactNode
}

const PageToolbar: React.FC<PageToolbarProps> = ({ actions, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 w-full">
    <div className="flex gap-2 flex-wrap">
      {actions.map((action, idx) => (
        <Button
          key={idx}
       
          onClick={action.onClick}
          className="flex items-center gap-1"
        >
          {action.icon}
          {action.label}
        </Button>
      ))}
    </div>
    {children && <div className="flex-1 flex justify-end">{children}</div>}
  </div>
)

export default PageToolbar
