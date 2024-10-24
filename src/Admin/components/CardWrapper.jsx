import { useEffect, useState } from "react";
import styles from "./css/cardWrapper.module.css";
import { UsersIcon, WorkIcon, ClockIcon, InboxIcon } from "../../icons/index";

//Cantidad de turnos disponibles en el día; Turnos disponibles en el mes; Servicios Totales; Ingresos del mes)
const cardData = [
  { title: "Turnos disponibles 24-10-2024", value: "0/5", type: "pending" },
  { title: "Servicios Totales", value: 6, type: "services" },
  { title: "Ingresos del mes", value: "$50.400", type: "invoices" },
  { title: "Clientes Totales", value: 30, type: "customers" },
];

const iconMap = {
  services: WorkIcon,
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
        {Icon ? <Icon size={24} color="#374151" /> : null}
        <h3 className={styles.componentTitle}>{title}</h3>
      </div>
      <p className={styles.componentValue}>{value}</p>
    </div>
  );
}
