import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ServicesProvider } from "./context/ServiceContext";
import AppRouters from "./routers/AppRouters";
import { Toaster } from "sonner";
import "./styles.css";
import "./pages/css/Toast.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ServicesProvider>
      <BrowserRouter>
        <GoogleOAuthProvider clientId="683178027103-uepqin3teou8mup3gjv9qhrp983nsp53.apps.googleusercontent.com">
          <Navbar />
          <Toaster className="toast-success toast-error toast-warning" />
          <AppRouters />
          <Footer />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </ServicesProvider>
  </AuthProvider>
);
