import { useEffect, useState } from "react";
import styles from "./css/cardWrapper.module.css";
import { UsersIcon, WorkIcon, ClockIcon, InboxIcon } from "../../icons/index";

const loadMonthData = import.meta.env.VITE_ENDPOINT_MONTH_APPOINTMENTS;

const iconMap = {
  services: WorkIcon,
  customers: UsersIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

const currentMonth = new Date();

export default function CardWrapper() {
  const [data, setData] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    availableAppointmentsToday: 0,
    totalAppointmentsToday: 0,
    availableAppointmentsMonth: 0,
    totalAppointmentsMonth: 0,
    revenueMonth: 0,
    servicesPerformedMonth: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${loadMonthData}${currentMonth.toISOString().split("T")[0]}`,
        {
          method: "GET",
          credentials: "include",
        }
      ); // Usamos datos ficticios aquí.
      const monthData = await result.json();
      setData(monthData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadCardData = () => {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const todayAppointments = data.filter((appointment) => {
        const appointmentDate = new Date(appointment.startTime).getDate();
        return appointmentDate === today.getDate();
      });

      const monthAppointment = data.filter((appointment) => {
        const appointmentDate = new Date(appointment.startTime);
        return appointmentDate >= startOfMonth && appointmentDate <= endOfMonth;
      });

      const availableAppointmentsToday = todayAppointments.filter(
        (appointment) => !appointment.estado
      ).length;
      const totalAppointmentsToday  = todayAppointments.length;

      const availableAppointmentsMonth = monthAppointment.filter(
        (appointment) => !appointment.estado
      ).length;
      const totalAppointmentsMonth = monthAppointment.length;

      const revenueMonth = monthAppointment.reduce(
        (acc, appointment) => acc + (appointment.estado ? appointment.costo : 0),
        0
      );

      const servicesPerformedMonth  = monthAppointment.filter(
        (appointment) => appointment.estado
      ).length;

      setDashboardData({
        availableAppointmentsToday,
        totalAppointmentsToday,
        availableAppointmentsMonth,
        totalAppointmentsMonth,
        revenueMonth,
        servicesPerformedMonth
      });
    };

    if (data.length > 0) {
      loadCardData();
    }
  }, [data]);

  const cardData = [
    {
      title: `Turnos disponibles hoy`,
      value: `${dashboardData.availableAppointmentsToday}/${dashboardData.totalAppointmentsToday}`,
      type: "pending",
    },
    {
      title: "Turnos disponibles mes",
      value: `${dashboardData.availableAppointmentsMonth}/${dashboardData.totalAppointmentsMonth}`,
      type: "customers",
    },
    {
      title: "Ingresos del mes",
      value: `$${dashboardData.revenueMonth}`,
      type: "invoices",
    },
    {
      title: "Servicios Totales",
      value: `${dashboardData.servicesPerformedMonth}`,
      type: "services",
    },
  ];

  return (
    <>
      {cardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          value={card.value}
          type={card.type}
        />
      ))}
    </>
  );
}

export function Card({ title, value, type }) {
  const Icon = iconMap[type];

  return (
    <div className={styles.componentContainer}>
      <div className={styles.componentHeader}>
        {Icon ? <Icon size={24} color="#374151" /> : null}
        <h3 className={styles.componentTitle}>{title}</h3>
      </div>
      <p className={styles.componentValue}>{value}</p>
    </div>
  );
}
