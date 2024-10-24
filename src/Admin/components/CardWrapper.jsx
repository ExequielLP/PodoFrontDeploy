import { useEffect, useState } from "react";
import styles from "./css/cardWrapper.module.css";
import { UsersIcon, WorkIcon, ClockIcon, InboxIcon } from "../../icons/index";

//Cantidad de turnos disponibles en el día; Turnos disponibles en el mes; Servicios Totales; Ingresos del mes)
const cardData = [
  { title: "Collected", value: 6, type: "collected" },
  { title: "Pending", value: 10, type: "pending" },
  { title: "Total Invoices", value: 15, type: "invoices" },
  { title: "Total Customers", value: 4, type: "customers" },
];

const iconMap = {
  collected: WorkIcon,
  customers: UsersIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default function CardWrapper() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simula una llamada asíncrona para obtener datos.
    const fetchData = async () => {
      // Aquí puedes reemplazar con una llamada a una API real si es necesario.
      // Por ejemplo: const result = await fetch('/api/cards').then(response => response.json());
      const result = cardData; // Usamos datos ficticios aquí.
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <>
      {data.map((card, index) => (
        <Card key={index} title={card.title} value={card.value} type={card.type} />
      ))}
    </>
  );
}

export function Card({ title, value, type }) {
  const Icon = iconMap[type];

  return (
    <div className={styles.componentContainer}>
      <div className={styles.componentHeader}>
        {Icon ? <Icon className={styles.componentIcon} /> : null}
        <h3 className={styles.componentTitle}>{title}</h3>
      </div>
      <p className={styles.componentValue}>{value}</p>
    </div>
  );
}
