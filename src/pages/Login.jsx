import { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { SignInWithGoogle } from "../components/SignInWithGoogle";
import AuthenticationContext from "../context/AuthContext";
import useTitle from "../hooks/useTitle";
import "./css/login.css";
import { FormField } from "../shared/components/FormField";
import { MailIcon, PasswordIconHide } from "../icons";

const formInciallogin = {
  email: "",
  password: "",
};

const Login = () => {
  useTitle({ title: "Login" });
  const { submitLogin, usuarioLogueado } = useContext(AuthenticationContext);
  const [formlogin, setformlogin] = useState(formInciallogin);
  //chekear si manejamos la redirección desde el componente o desde la función
  if (usuarioLogueado.auth && usuarioLogueado.rol === "USER") {
    return <Navigate to="/" />;
  }

  if (usuarioLogueado.auth && usuarioLogueado.rol === "ADMIN") {
    return <Navigate to="/dashboard" />;
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
          <div className="login-inputs">
            <FormField
              label="Correo electronico"
              className="login-input"
              type="email"
              placeholder="user@example.com"
              id="loginUserName"
              name="email"
              onChange={handleChangelogin}
              icon={MailIcon}
            />
            <FormField
              label="Contraseña"
              className="login-input"
              type="password"
              placeholder="Contraseña"
              id="loginPassword"
              name="password"
              onChange={handleChangelogin}
              icon={PasswordIconHide}
            />
            <button
              className="login-button"
              type="submit"
              value="Sign in"
              onClick={(e) => submitLogin(e, formlogin)}
            >
              Login
            </button>
          </div>
          <Link to={"/password-recovery"} className="password-loss">
            Olvide mi contraseña!
          </Link>
        </div>
      </form>
      <Link to={"/registro"} className="go-to-login">
        <span className="login-span">No tienes cuenta?</span> Regístrate aquí!
      </Link>
      <SignInWithGoogle />
    </main>
  );
};

export default Login;
