import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useModalContext } from "../../context/ModalContext";
import "../css/modal.css";

const eventListener = "keydown";

export const Modal = ({ children, modalType }) => {
  const modalRef = useRef(null);
  const { actionModal, filterModal, setExclusiveModal } = useModalContext();

  //En caso de tener más tipos se va a tener q cambiar esto...
  const isOpen = modalType === 'filter' ? filterModal : actionModal;
  actionModal;
  const closeModal = () => setExclusiveModal(null);
  
  //Si el setExclusiveModal cambia a un booleano, se usa lo siguiente
  // const closeModal = () => {
  //   setExclusiveModal(false);
  // };

  const modalRoot = document.getElementById("modal");

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeModal();
        // closeModal(false);
      }
    };
    if (isOpen) {
      document.addEventListener(eventListener, handleEsc);
    }

    return () => {
      document.removeEventListener(eventListener, handleEsc);
    };
  }, [isOpen]);

  if (!isOpen || !modalRoot) {
    return null;
  }
  return createPortal(
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-container"
        ref={modalRef}
        onClick={handleContentClick}
      >
        <button className="modal-close-button" onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
