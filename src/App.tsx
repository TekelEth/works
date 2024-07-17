import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { HomePage, MarketDashboard } from "./pages";
import DashboardLayout from "./layout/dashboard-layout";
import Dashboard from "./pages/dashboard";

function App() {
  return <Router>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path='/dashboard' element={<DashboardLayout />}>
      <Route path="market" element={<MarketDashboard />}/>
      <Route path='dapp' element={<Dashboard />} />
    </Route>
  </Routes>
</Router>
}

export default App;
