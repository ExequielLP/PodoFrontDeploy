import { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { SignInWithGoogle } from "../components/SignInWithGoogle";
import AuthenticationContext from "../context/AuthContext";
import useTitle from "../hooks/useTitle";
import "./css/login.css";

const formInciallogin = {
  email: "",
  password: "",
};

const Login = () => {
  useTitle({ title: "Login" });
  const { submitLogin, usuarioLogueado } = useContext(AuthenticationContext);

  //form y use State para form
  const [formlogin, setformlogin] = useState(formInciallogin);

  if (usuarioLogueado.auth) {
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
              type="email"
              placeholder="Nombre de usuario"
              id="loginUserName"
              name="email"
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
        No tienes cuenta? Regístrate aquí!
      </Link>
      <SignInWithGoogle />
    </main>
  );
};

export default Login;
