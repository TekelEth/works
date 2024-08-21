import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {
  Borrow,
  Dashboard,
  DepositPage,
  HomePage,
  MarketDashboard,
  Repay,
  Withdrawal,
} from './pages';
import DashboardLayout from './layout/dashboard-layout';
import AOS from 'aos'
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200, 
      once: true
    })
  })

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="market" element={<MarketDashboard />} />
          <Route path="dapp" element={<Dashboard />} />
          <Route path="deposit" element={<DepositPage />} />
          <Route path="withdrawal" element={<Withdrawal />} />
          <Route path="repay" element={<Repay />} />
          <Route path="mint" element={<Borrow />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
