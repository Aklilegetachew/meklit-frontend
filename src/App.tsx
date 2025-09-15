import { Route, BrowserRouter as Router, Routes } from "react-router"
import NotFound from "./pages/OtherPage/NotFound"

import { ScrollToTop } from "./components/common/ScrollToTop"
import AppLayout from "./layout/AppLayout"
import DailyLogPage from "./pages/Dashboard/DailyLog.page"
import Home from "./pages/Dashboard/Home"
import Healthreport from "./pages/Healthreport/Healthreport.page"
import ListLogs from "./pages/LogsPage/ListLogs.page"

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route
              index
              path="/dailyLog-Dashboard"
              element={<DailyLogPage />}
            />

            <Route path="/logs" element={<ListLogs />} />
            <Route path="/health" element={<Healthreport />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}
