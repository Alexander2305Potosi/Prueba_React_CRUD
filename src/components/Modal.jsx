import React from "react";

const Modal = ({ children, visible, close }) => {
  return (
    <div className={`modal ${visible ? "" : "hidden"}`}>
      <div className="modal__wrapper">
        <button type="button" className="bt-close" onClick={close}>
          <span className="cross"></span>
          <span className="text">Close</span>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
