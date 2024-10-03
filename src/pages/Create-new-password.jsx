import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { putWithPassword } from "../utils/http";
import "./css/PasswordRecovery.css";

const sendNewPassword = import.meta.env.VITE_ENDPOINT_SEND_NEW_PASSWORD;
const isTokenValid = import.meta.env.VITE_ENDPOINT_IS_PASSWORD_TOKEN_VALID;
const initialRecoveryForm = {
  email: "",
  password: "",
  repeatPassword: "",
};

const CreateNewPassword = () => {
  const [recoveryPasswordForm, setRecoveryPasswordForm] =
    useState(initialRecoveryForm);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const { jwt } = useParams();
  const navigate = useNavigate();

  const getCookieForPassword = async (url) => {
    try {
      const respuesta = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!respuesta.ok) {
        throw new Error(
          `${respuesta.status} error en fetch: ${respuesta.statusText}`
        );
      }

      const data = await respuesta.json();
      return data;
    } catch (err) {
      console.error("Error al obtener el cookie:", err);
      throw err;
    }
  };

  useEffect(() => {
    const jwtIsValid = async () => {
      try {
        const respuesta = await getCookieForPassword(
          `${isTokenValid}?jwt=${jwt}`
        );
        const { email } = respuesta; // Extraer el email de la respuesta
        if (email) {
          setRecoveryPasswordForm((prevForm) => ({
            ...prevForm,
            email: email,
          }));
        }
      } catch (error) {
        console.error("Error al validar el JWT:", error);
        navigate("*");
      }
    };

    if (!jwt) {
      navigate("*");
    } else {
      jwtIsValid();
    }
  }, [jwt, navigate]);

  const onPasswordChange = (e) => {
    setRecoveryPasswordForm({
      ...recoveryPasswordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ACA EL FORM");
    console.log(recoveryPasswordForm);
    if (
      recoveryPasswordForm.password !== recoveryPasswordForm.repeatPassword
    ) {
      console.log("Las contraseñas no coinciden.");
      return;
    }
    try {
      await putWithPassword(sendNewPassword, recoveryPasswordForm);
      setIsSubmitted(true);
    } catch (err) {
      setFormError("Ocurrió un error al enviar el correo. Intenta nuevamente.");
      console.error("Error:", err);
    }
  };

  return (
    <main className="main-container">
      <div className="form-container">
        <div className="border-inset">
          <h1 className="form-title">Crear nueva contraseña</h1>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="form">
              <div className="password-form">
                <label htmlFor="newPassword" className="label">
                  Ingresa tu nueva contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={onPasswordChange}
                  required
                  className="input"
                  placeholder="Nueva contraseña"
                />
                <label htmlFor="repeatPassword" className="label">
                  Repetir contraseña
                </label>
                <input
                  type="password"
                  id="repeatPassword"
                  name="repeatPassword"
                  onChange={onPasswordChange}
                  required
                  className="input"
                  placeholder="Repetir contraseña"
                />
              </div>
              <button type="submit" className="hero-btn">
                Enviar contraseña
              </button>
            </form>
          ) : (
            <div className="text-center">
              <p className="success-message">
                Tu contraseña ha sido cambiada exitosamente.
              </p>
              <Link to="/login" className="hero-btn">
                Volver al inicio de sesión
              </Link>
            </div>
          )}
          <div className="link-container">
            <Link to="/login" className="link">
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateNewPassword;
