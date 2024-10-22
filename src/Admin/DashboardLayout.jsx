import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import "./DashboardLayout.css"

export default function DashboardLayout() {
    return (
      <div className="dashboard-layout-container">
        <div className="dashboard-sidenav-container">
          <SideNav />
        </div>
        <div className="dashboard-main-content"><Outlet/></div>
      </div>
    );
  }