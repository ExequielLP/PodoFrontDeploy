import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./shared/components/Navbar";
import { Footer } from "./shared/components/Footer";
import { ServicesProvider } from "./context/ServiceContext";
import AppRouters from "./routers/AppRouters";
import { Toaster } from "sonner";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pages/css/Toast.css";
import "./styles.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ModalProvider } from "./context/ModalContext";

const CLIENT_ID = import.meta.env.VITE_ENDPOINT_Cliente_id;

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ModalProvider>
        <ServicesProvider>
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            <Navbar />
            <Toaster className="toast-success toast-error toast-warning" />
            <AppRouters />
            <Footer />
          </GoogleOAuthProvider>
        </ServicesProvider>
      </ModalProvider>
    </AuthProvider>
  </BrowserRouter>
);
