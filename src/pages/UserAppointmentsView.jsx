import { useEffect } from "react";
import ServicesContext from "../context/ServiceContext";
import useContextValue from "../hooks/useContextValue";
import useTitle from "../hooks/useTitle";
import showToast from "../utils/toastUtils";
import UserAppointments from "../components/UserAppointments";

const UserAppointmentsView = () => {

    useTitle({ title: "Mis turnos" });

    const {
      arrayTurnos,
      listaTurnos,
      eliminarTurno,
    } = useContextValue(ServicesContext);
  
    useEffect(() => {
      listaTurnos();
    }, [listaTurnos]);
  
    const handleEliminarTurno = async (turnoId) => {
      const success = await eliminarTurno(turnoId);
      if (success) {
        showToast(`Turno ${turnoId} eliminado con éxito`, "success");
        listaTurnos(); // Actualiza la lista de turnos después de la eliminación
      } else {
        showToast(`Error al eliminar el turno ${turnoId}`, "error");
      }
    };

  return (
    <UserAppointments
    onEliminarTurno={handleEliminarTurno}
    turnos={arrayTurnos}
  />
  )
}
export default UserAppointmentsView;