import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import styles from "./css/chart-styles.module.css";
import { CalendarSettingsIcon } from "../../icons/index";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { serviceColors } from "../../utils/serviciesColors";

// Calcular currentDay fuera del componente
const currentDay = new Date();
const MONTH_URL = import.meta.env.VITE_ENDPOINT_MONTH_APPOINTMENTS;

export const ChartView = () => {
  const chartRef = useRef(null); // using useRef to keep track of the chart instance
  const [monthAppointments, setMonthAppointments] = useState([]);
  const currentMonth = format(new Date(), "MMMM", {
    locale: es,
  });

  //DEPENDECY --> currentMonth - monthAppointments??
  useEffect(() => {
    //Filtrar por servicio la data
    const getMonthAppointments = async () => {
      const data = await fetch(
        `${MONTH_URL}${currentDay.toISOString().split("T")[0]}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const response = await data.json();
      setMonthAppointments(response);
    };
    getMonthAppointments();
  }, []);

  //Filtramos los turnos del mes por ocupados
  const monthAppointmentsFiltered = monthAppointments.filter(
    (appointmentsReserved) => appointmentsReserved.estado === true
  );

  //Pasamos los turnos filtrados a un objeto nuevo para añadir el border color y el backgroundColor
  const chartMonthData = Object.keys(serviceColors).map((service) => {
    const countData = monthAppointmentsFiltered.filter(
      (appointment) => appointment.nombreServicio === service
    ).length;
    return {
      label: service,
      data: [countData],
      borderColor: serviceColors[service].borderColor,
      backgroundColor: serviceColors[service].backgroundColor,
    };
  });

  //MONTA Y DESTRUYE EL GRAFICO
  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartMonthData.map((service) => service.label),
        datasets: chartMonthData.map((service) => ({
          label: service.label,
          data: service.data,
          borderColor: service.borderColor,
          backgroundColor: service.backgroundColor,
          borderWidth: 1,
        })),
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
  }, [currentMonth, chartMonthData]);

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
