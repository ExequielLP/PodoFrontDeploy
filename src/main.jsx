import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ContextLoginRegister } from "./context/ContextLoginRegister";
import AppRouters from "./routers/AppRouters";
import { Footer } from "./components/Footer";
import "../src/styles.css";
import { Toaster } from "sonner";
import "./pages/css/Toast.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextLoginRegister>
    <BrowserRouter>
      <Navbar />
      <Toaster className="toast-success toast-error toast-warning" />
      <AppRouters />
      <Footer />
    </BrowserRouter>
  </ContextLoginRegister>
);
