import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ContextoAdministrador from "../context/AuthContext";
import useTitle from "./../hooks/useTitle";
import "./css/registro.css";
import { SignInWithGoogle } from "../components/SignInWithGoogle";

const Register = () => {
  useTitle({ title: "Registro" });

  const { SubmitRegistro } = useContext(ContextoAdministrador);

  const [form, setform] = useState({
    userName: "",
    name: "",
    email: "",
    password: "",
    repeatePassword: "",
  });

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="register-container">
      <form className="form-register">
        <div className="form-border-inset">
          <p className="form-vertical-advice">Ingrese sus datos</p>
          <div className="register-input">
            <input
              type="text"
              placeholder="Nombre de usuario"
              id="registerUserName"
              name="userName"
              className="registro-text-input"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Nombre"
              id="registerName"
              name="name"
              className="registro-text-input"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Email"
              id="registerEmail"
              name="email"
              className="registro-text-input"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Contraseña"
              id="registerPassword"
              name="password"
              className="registro-password-input"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="repetir contraseña"
              id="registerPassword"
              name="repeatePassword"
              className="registro-password-input"
              onChange={handleChange}
            />
            <div className="register-buttons">
              <button
                type="submit"
                className="registrobutton"
                onClick={(e) => {
                  SubmitRegistro(e, form);
                }}
              >
                Registrarse
              </button>
              <button type="submit" className="registrobutton">
                <Link to={"/"} className="Linkclass">
                  Ir a Inicio
                </Link>
              </button>
            </div>
          </div>
        </div>
      </form>

      <Link to={"/login"} className="go-to-login">
        Ya tienes cuenta? Inicia sesión!
      </Link>
      <SignInWithGoogle />
    </main>
  );
};

export default Register;
