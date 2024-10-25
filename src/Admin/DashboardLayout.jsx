import { Outlet } from "react-router-dom";
import SideNav from "./components/SideNav";
import "./DashboardLayout.css"

export default function DashboardLayout() {
    return (
      <div className="dashboard-layout-container">
        <div className="dashboard-sidenav-container">
          <SideNav />
        </div>
        <section className="dashboard-main-content"><Outlet/></section>
      </div>
    );
  }