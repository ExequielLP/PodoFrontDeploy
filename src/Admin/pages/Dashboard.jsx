import { Suspense } from "react";
import useContextValue from "../../hooks/useContextValue";
import useTitle from "../../hooks/useTitle";
import styles from "./css/Dashboard.module.css";
import { CardsSkeleton } from "../../shared/skeleton/CardSkeleton";
import { RevenueChartSkeleton } from "../../shared/skeleton/RevenueChartSkeleton";
import { LatestInvoicesSkeleton } from "../../shared/skeleton/InvoiceSkeleton";
import AuthenticationContext from "../../context/AuthContext";
import { ChartView } from "../components/ChartView";
import { LatestAppointments } from "../components/LatestAppointments";
import CardWrapper from "../components/CardWrapper";

const Dashboard = () => {
  useTitle({ title: "Panel Administrador" });
  const { usuarioLogueado } = useContextValue(AuthenticationContext);

  return (
    <section className={`dashboard-section-container ${styles.main}`}>
      {/* ACA VAN LAS BREADCRUMBS */}
      <h1 className={`${styles.dashboardTitle} ${styles.dashboardTitleMd}`}>
        Dashboard {usuarioLogueado.userName}
      </h1>
      <div
        className={`${styles.gridContainer} ${styles.gridCols2} ${styles.gridCols4}`}
      >
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div
        className={`${styles.marginTop6} ${styles.gridContainer} ${styles.gridCols1} ${styles.gridCols4Md} ${styles.gridCols8}`}
      >
        <Suspense fallback={<RevenueChartSkeleton />}>
          <ChartView />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestAppointments />
        </Suspense>
      </div>
    </section>
  );
};
export default Dashboard;
