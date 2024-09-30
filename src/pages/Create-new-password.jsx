import { useState } from 'react'
import { Link } from 'react-router-dom'
import './css/PasswordRecovery.css'
import { put } from '../utils/http'

const sendNewPassword = import.meta.env.VITE_ENDPOINT_SEND_NEW_PASSWORD;

const createNewPassword = () => {

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState('')
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      console.log('Password recovery requested for:', password)
      try {
        await put(sendNewPassword, { password })
        setIsSubmitted(true)
      } catch (err) {
        setError('Ocurrió un error al enviar el correo. Intenta nuevamente.')
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
