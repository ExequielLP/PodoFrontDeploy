import { useContext, useState } from "react";
import ContextoAdministrador from "../context/ContextLoginRegister";
import { Navigate } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import "./css/login.css";

const formInciallogin = {
  userName: "",
  password: "",
};

const Login = () => {
  useTitle({ title: "Login" });
  const { SubmitLogin, usuarioLogeado } = useContext(ContextoAdministrador);

  //form y use State para form
  const [formlogin, setformlogin] = useState(formInciallogin);

  if (usuarioLogeado.Auth === true) {
    return <Navigate to="/" />;
  }

  const handleChangelogin = (e) => {
    setformlogin({
      ...formlogin,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="login-container">
      <form className="form-login">
        <div className="login-border-inset">
          <p className="login-text-vertical">BIENVENIDO</p>
          <div className="login-input">
            <input
              className="userName-input"
              type="text"
              placeholder="Nombre de usuario"
              id="loginUserName"
              name="userName"
              onChange={handleChangelogin}
            />
            <input
              className="password-input"
              type="password"
              placeholder="Contraseña"
              id="loginPassword"
              name="password"
              onChange={handleChangelogin}
            />
            <button
              className="login-button"
              type="submit"
              value="Sign in"
              onClick={(e) => SubmitLogin(e, formlogin)}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Login;
