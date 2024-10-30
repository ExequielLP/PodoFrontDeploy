import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SignInWithGoogle } from "../components/SignInWithGoogle";
import AuthenticationContext from "../context/AuthContext";
import useTitle from "./../hooks/useTitle";
import { MailIcon, PasswordIconHide, PasswordIconShow, UserIcon } from "../icons/index";
import "./css/registro.css";
import { FormField } from "../shared/components/FormField";

const Register = () => {
  useTitle({ title: "Registro" });

  const { submitRegistro } = useContext(AuthenticationContext);

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
          <div className="register-inputs">
            <FormField
              label="Nombre de usuario"
              type="text"
              id="registerUserName"
              name="userName"
              placeholder="Nombre de usuario"
              className="register-input"
              onChange={handleChange}
              icon={UserIcon}
            />
            <FormField
              label="Nombre completo"
              type="text"
              placeholder="Nombre"
              id="registerName"
              name="name"
              className="register-input"
              onChange={handleChange}
              icon={UserIcon}
            />
            <FormField
              label="Correo electronico"
              type="text"
              placeholder="Email"
              id="registerEmail"
              name="email"
              className="register-input"
              onChange={handleChange}
              icon={MailIcon}
            />
            <FormField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              id="registerPassword"
              name="password"
              className="register-input"
              onChange={handleChange}
              icon={PasswordIconHide}
            />
            <FormField
              label="Repetir contraseña"
              type="password"
              placeholder="repetir contraseña"
              id="registerPassword"
              name="repeatePassword"
              className="register-input"
              onChange={handleChange}
              icon={PasswordIconShow}
            />
            <div className="register-buttons">
              <button
                type="submit"
                className="registrobutton"
                onClick={(e) => {
                  submitRegistro(e, form);
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
      <span className="register-span">¿Ya tienes una cuenta?</span> Inicia sesión aquí!
      </Link>
      <SignInWithGoogle />
    </main>
  );
};

export default Register;
