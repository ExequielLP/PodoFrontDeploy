import { useEffect } from "react";
import Chart from "chart.js/auto";
import { fakeData } from "../fakeData";
import styles from "./css/chart-styles.module.css";
import { CalendarSettingsIcon } from "../../icons/index";

export const ChartView = () => {
  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Octubre"],
        datasets: fakeData.map((service) => ({
          label: service.label,
          data: service.data,
          borderColor: service.borderColor,
          backgroundColor: service.backgroundColor,
          borderWidth: 1,
        })),
      },
      options: {
        aspectRatio: 1,
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <div className={styles.recentRevenueMdColSpan4}>
      <h2 className={`${styles.recentRevenueTitle} ${styles.recentRevenueTitleMd}`}>
        Cantidad de turnos por servicio
      </h2>
      <div className={styles.recentRevenueContainer}>
        <canvas id="myChart" width="400" height="300"></canvas>
        <div className={styles.recentRevenueFooter}>
          <CalendarSettingsIcon size={"1.25rem"} color="#6b7280" className={styles.recentRevenueFooterIcon} />
          <h3 className={styles.recentRevenueFooterText}>Último mes</h3>
        </div>
      </div>
    </div>
  );
};
