import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { fakeData } from "../fakeData";
import styles from "./css/chart-styles.module.css";
import { CalendarSettingsIcon } from "../../icons/index";

export const ChartView = () => {
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const currentMonth = monthNames[new Date().getMonth()];

  const chartRef = useRef(null); // using useRef to keep track of the chart instance

  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: fakeData.map((service) => service.label),
        datasets: [
          {
            label: currentMonth,
            data: fakeData.map((service) => service.data[0]),
            borderColor: fakeData.map((service) => service.borderColor),
            backgroundColor: fakeData.map((service) => service.backgroundColor),
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 1,
        maintainAspectRatio: false,
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
      <h2
        className={`${styles.recentRevenueTitle} ${styles.recentRevenueTitleMd}`}
      >
        Servicios mas utilziados de {currentMonth}
      </h2>
      <div className={styles.recentChartContainer}>
        <div className={styles.chartCanvas}>
          <canvas id="myChart"></canvas>
        </div>
        <div className={styles.recentRevenueFooter}>
          <CalendarSettingsIcon
            size={"24"}
            color="#6b7280"
            className={styles.recentRevenueFooterIcon}
          />
          <h3 className={styles.recentRevenueFooterText}>Último mes</h3>
        </div>
      </div>
    </div>
  );
};
