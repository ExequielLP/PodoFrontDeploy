import { useState } from 'react'
import { Link } from 'react-router-dom'
import './css/PasswordRecovery.css'

export default function PasswordRecovery() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically call an API to handle the password recovery process
    console.log('Password recovery requested for:', email)
    setIsSubmitted(true)
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
          <button type="submit" className="button">
            Enviar Instrucciones
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="success-message">
            Se han enviado las instrucciones de recuperación a tu correo electrónico.
          </p>
          <Link href="/login" className="link">
            Volver al inicio de sesión
          </Link>
        </div>
      )}
      <div className="link-container">
        <Link href="/login" className="link">
          Volver al inicio de sesión
        </Link>
      </div>
    </div>
  </main>
  )
}