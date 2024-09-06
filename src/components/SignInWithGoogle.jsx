import "./css/SignInWithGoogle.css";
import { GoogleLogin } from '@react-oauth/google';
export const SignInWithGoogle = () => {
  const handleLoginSuccess = (response) => {
    const accessToken = response.credential;
    // Enviar el access token al backend
    console.log(accessToken)
    fetch('http://localhost:8080/api/v1/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: accessToken }),
    })
      .then(response => response.json())
      .then(data => {
        // Guardar el JWT en el almacenamiento local o en el estado
        console.log(data)
        localStorage.setItem("auth_token", data.jwt);
        window.location.href = "/login";
      })
      .catch(error => console.error('Error:', error));
  };
  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};
