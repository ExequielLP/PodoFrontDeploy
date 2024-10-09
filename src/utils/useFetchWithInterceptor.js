// useFetchWithInterceptor.js
import { useContext } from 'react';
import { AuthenticationContext } from '../context/AuthenticationContext';

export const useFetchWithInterceptor = () => {
  const { usuarioLogueado, setUsuarioLogueado } = useContext(AuthenticationContext);

  const fetchWithInterceptor = async (url, options = {}) => {
    try {
      const response = await fetch(url, { ...options, credentials: 'include' }); // Incluir cookies

      if (response.status === 403) {
        setUsuarioLogueado(null);
        window.location.href = '/login';
        throw new Error('No autorizado');
      }

      return response;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  };

  return fetchWithInterceptor;
};
