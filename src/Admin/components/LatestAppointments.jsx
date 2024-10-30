// import { useAppointments } from "../../utils/calendarData";
// import { useEffect } from "react";
import { ArrowPathIcon } from "../../icons/index";
import { fakeTurno } from "../fakeData";
import styles from "./css/LatestAppointments.module.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const LatestAppointments = () => {
  // const { fetchAppointments, turno } = useAppointments();

  const fechaEspecifica = new Date(2024, 9, 25);
  const today = format(new Date(fechaEspecifica), "do 'de' MMMM", {
    locale: es,
  });

  // useEffect(() => {
  //   fetchAppointments();
  // }, []);
  const turno = fakeTurno;
  const filterDay = turno.filter((t) => t.estado === true);

  return (
    <div className={styles.latestInvoicesContainerMd}>
      <h3
        className={`${styles.latestInvoicesTitle} ${styles.latestInvoicesTitleMd}`}
      >
        Turnos del día: {today}
      </h3>
      <div className={styles.latestInvoicesContent}>
        <div className={styles.latestInvoicesList}>
          {filterDay.map((day, i) => (
            <div
              key={day.id}
              className={`${styles.latestInvoiceItem} ${
                i !== 0 ? styles.latestInvoiceItemBorder : ""
              }`}
            >
              <div className={`${styles.appointmentData}`}>
                <img
                  src={day.image}
                  width={36}
                  height={36}
                  alt={day.image}
                  className={`${styles.latestInvoiceImage}`}
                />
                <div className={`${styles.latestInvoiceDetails}`}>
                  <p
                    className={`${styles.latestInvoiceName} ${styles.latestInvoiceNameMd}`}
                  >
                    {day.nombreUsuario}
                  </p>
                  <p
                    className={`${styles.latestInvoiceEmail} ${styles.latestInvoiceEmailSm}`}
                  >
                    {day.email}
                  </p>
                </div>
              </div>
              <p
                className={`${styles.latestInvoiceAmount} ${styles.latestInvoiceAmountMd}`}
              >
                {/* {format(new Date(day.startTime), "hh:mm a dd/MM/yyyy")} */}
                {day.startTime}
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
