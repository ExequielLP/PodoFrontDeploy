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
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ServicesProvider>
      <BrowserRouter>
        <Navbar />
        <Toaster className="toast-success toast-error toast-warning" />
        <AppRouters />
        <Footer />
      </BrowserRouter>
    </ServicesProvider>
  </AuthProvider>
);
