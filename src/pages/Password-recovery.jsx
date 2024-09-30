import { useState } from 'react'
import { Link } from 'react-router-dom'
import './css/PasswordRecovery.css'
import { post } from '../utils/http'

const sendEmailRecovery = import.meta.env.VITE_ENDPOINT_SEND_EMAIL;

export default function PasswordRecovery() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Password recovery requested for:', email)
    try {
      await post(sendEmailRecovery, { email })
      setIsSubmitted(true)
    } catch (err) {
      setError('Ocurrió un error al enviar el correo. Intenta nuevamente.')
      console.error('Error:', err)
    }
  }


  return (
    <main className="main-container">
    <div className="form-container">
      <h1 className="form-title">Recuperar Contraseña</h1>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label htmlFor="email" className="label">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
              placeholder="tu@email.com"
            />
          </div>
          <button type="submit" className="hero-btn">
            Enviar Instrucciones
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="success-message">
            Se han enviado las instrucciones de recuperación a tu correo electrónico.
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
  </main>
  )
}