import React, { createContext, useContext, useState } from "react";
import Overlay from '../Components/Utility/Overlay/Overlay'
const OverlayContext = createContext();

export const OverlayProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(()=>()=>{});
  const [cancelText,setCancelText] = useState('');
  const [confirmText,setConfirmText] = useState('');

  const showConfirmation = (title, message, onConfirm, cancelText, confirmText) => {
    setTitle(title);
    setMessage(message);
    setOnConfirm(() => onConfirm);
    setCancelText(cancelText);
    setConfirmText(confirmText)
    setIsOpen(true);
  };

  const hideConfirmation = () => {
    setIsOpen(false);
  };
  const handleConfirm = () => {
    onConfirm()
    setIsOpen(false);
  };

  return (
    <OverlayContext.Provider value={{ showConfirmation }}>
      {children}
      {isOpen && (
        <Overlay title={title} message={message} handleCancel={hideConfirmation} handleConfirm={handleConfirm} cancelText={cancelText || "cancel"} confirmText={confirmText || "confirm"} />
      )}
    </OverlayContext.Provider>
  );
};

export const useConfirmation = () => useContext(OverlayContext);
