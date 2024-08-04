import Card from "./Card";
import "./css/cards.css";
const Cards = ({ listaServicios }) => {
  return (
    <div className="card-section ">
      {listaServicios &&
        listaServicios.map((e) =>
          e.estado == true ? <Card listaServicios={e} key={e.id} /> : null
        )}
    </div>
  );
};
export default Cards;
