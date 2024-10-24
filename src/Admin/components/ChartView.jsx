import { useEffect } from "react";
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

  //Esto deberia cambiar cuando el mes cambio o cuando la cantidad de turnos consumidos del mes aumente
  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
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
      <h2
        className={`${styles.recentRevenueTitle} ${styles.recentRevenueTitleMd}`}
      >
        Servicios mas utilziados de {currentMonth}
      </h2>
      <div className={styles.recentRevenueContainer}>
        <canvas id="myChart" width="400" height="300"></canvas>
        <div className={styles.recentRevenueFooter}>
          <CalendarSettingsIcon
            size={"1.25rem"}
            color="#6b7280"
            className={styles.recentRevenueFooterIcon}
          />
          <h3 className={styles.recentRevenueFooterText}>Último mes</h3>
        </div>
      </div>
    </div>
  );
};
