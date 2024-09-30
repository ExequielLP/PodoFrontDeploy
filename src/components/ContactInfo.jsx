
const ContactInfo = () => {
  return (
    <section className="bg-pink-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">Contáctanos</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-pink-600 mb-4">Información de Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin className="text-pink-500 mr-2" />
                <span>Calle 123, La Plata, Buenos Aires</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-pink-500 mr-2" />
                <span>+54 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-pink-500 mr-2" />
                <span>info@pedicurialaplata.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="text-pink-500 mr-2" />
                <span>Lunes a Viernes: 9:00 - 20:00</span>
              </li>
            </ul>
          </div>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-pink-600 mb-4">Envíanos un Mensaje</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300"
              >
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactInfo;

// import { useState } from 'react'
// import { MapPin, Phone, Mail, Clock } from 'lucide-react'

// export default function ContactSection() {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [message, setMessage] = useState('')

//   const handleSubmit = (e:) => {
//     e.preventDefault()
//     // Here you would typically send the form data to your backend
//     console.log('Form submitted:', { name, email, message })
//     // Reset form fields
//     setName('')
//     setEmail('')
//     setMessage('')
//   }

//   return (

//   )
// }