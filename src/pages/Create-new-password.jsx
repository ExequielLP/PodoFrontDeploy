import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom'
import { put } from '../utils/http'
import './css/PasswordRecovery.css'

const sendNewPassword = import.meta.env.VITE_ENDPOINT_SEND_NEW_PASSWORD;
const isTokenValid = import.meta.env.VITE_ENDPOINT_IS_PASSWORD_TOKEN_VALID;

const createNewPassword = () => {

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formError, setFormError] = useState('')
    const { jwt } = useParams();
    const navigate = useNavigate();

    const getCookieForPassword = async (url) => {
      try {
        const respuesta = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include" // Asegúrate de incluir las credenciales
        });
    
        if (!respuesta.ok) {
          throw new Error(`${respuesta.status} error en fetch: ${respuesta.statusText}`);
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
          const respuesta = await getCookieForPassword(`${isTokenValid}?jwt=${jwt}`);
          console.log('la respuesta');
          console.log(respuesta);
          // if (respuesta.ok) {
          //   sacar el id del usuario para enviar al backend con las contraseñas
          // }
          return respuesta;
        } catch (error) {
          console.error("Error al validar el JWT:", error);
          navigate('*');
        }
      };
  
      if (!jwt) {
        navigate('*');
      } else {
        jwtIsValid();
      }
    }, [jwt, navigate]);

    const handleSubmit = async (e) => {
      e.preventDefault()
      console.log('Password recovery requested for:', password)
      try {
        await put(sendNewPassword, { password })
        setIsSubmitted(true)
      } catch (err) {
        setFormError('Ocurrió un error al enviar el correo. Intenta nuevamente.')
        console.error('Error:', err)
      }
    }
  
  return (
    <main className="main-container">
    <div className="form-container">
    <div className="border-inset">
      <h1 className="form-title">Crear nueva contraseña</h1>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="form">
          
          <div className='password-form'>
            <label htmlFor="password" className="label">
              Ingresa tu nueva contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
              placeholder="Nueva contraseña"
            />
            <label htmlFor="repeat-password" className="label">
              Repetir contraseña
            </label>
            <input
              type="password"
              id="repeat-password"
              name="repeat-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="input"
              placeholder="repetir contraseña"
            />
          </div>
          <button type="submit" className="hero-btn">
            Enviar contraseña
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="success-message">
            Se contraseña ha sido cambiada exitosamente.
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
  )
}

export default createNewPassword;
