import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useModalContext } from "../../context/ModalContext";
import "../css/modal.css";

const eventListener = "keydown";

export const Modal = ({ children }) => {
  const modalRef = useRef(null);
  const { state, setState } = useModalContext();

  const closeModal = () => {
    setState(false);
  };

  const modalRoot = document.getElementById("modal");

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setState(false);
      }
    };
    if (state) {
      document.addEventListener(eventListener, handleEsc);
    }

    return () => {
      document.removeEventListener(eventListener, handleEsc);
    };
  }, [setState, state]);

  if (!state || !modalRoot) {
    return null;
  }
  return createPortal(
    <div className="overlay" onClick={closeModal}>
      <div className="modal" ref={modalRef} onClick={handleContentClick}>
        {children}
        <button className="close-button" onClick={closeModal}>
          Cerrar
        </button>
      </div>
    </div>,
    modalRoot
  );
};
