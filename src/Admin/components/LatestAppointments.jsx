import { useAppointments } from "../../utils/calendarData";
import { useEffect } from "react";
import { ArrowPathIcon } from "../../icons/index";
import styles from "./css/LatestAppointments.module.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const LatestAppointments = () => {
  const { fetchAppointments, turno } = useAppointments();

  const fechaEspecifica = new Date(2024, 9, 25);
  const today = format(new Date(fechaEspecifica), "do 'de' MMMM", { locale: es });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filterDay = turno.filter((t) => t.estado === true);

  return (
    <div className={styles.latestInvoicesContainerMd}>
      <h3 className={`${styles.latestInvoicesTitle} ${styles.latestInvoicesTitleMd}`}>
        Turnos del día: {today}
      </h3>
      <div className={styles.latestInvoicesContent}>
        <div className={styles.latestInvoicesList}>
          {filterDay.map((day, i) => (
            <div
              key={day.id}
              className={`${styles.latestInvoiceItem} ${i !== 0 ? styles.latestInvoiceItemBorder : ""}`}
            >
              <div className="flex items-center">
                <div className={styles.latestInvoiceDetails}>
                  <p className={`${styles.latestInvoiceName} ${styles.latestInvoiceNameMd}`}>
                    {format(new Date(day.startTime), "hh:mm a dd/MM/yyyy")}
                  </p>
                  <p className={`${styles.latestInvoiceEmail} ${styles.latestInvoiceEmailSm}`}>
                    {day.nombreUsuario}
                  </p>
                </div>
              </div>
              <p className={`${styles.latestInvoiceAmount} ${styles.latestInvoiceAmountMd}`}>
                {day.nombreServicio}
              </p>
            </div>
          ))}
        </div>
        <div className={styles.latestInvoicesFooter}>
          <ArrowPathIcon className={styles.latestInvoicesFooterIcon} />
          <h3 className={styles.latestInvoicesFooterText}>Updated just now</h3>
        </div>
      </div>
    </div>
  );
};
