import { Outlet } from 'react-router-dom';
import TopNavLayout from './topNav';
import NavigationLayout from './navigatiojn-layout';

const DashboardLayout = () => {
  return (
    <div className="bg-black pb-24 min-h-screen">
      <TopNavLayout />
      <NavigationLayout />
      <br /> <br />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
