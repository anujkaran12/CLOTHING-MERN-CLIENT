import React from "react";
import "./Overlay.css";
const Overlay = ({ handleCancel, handleConfirm, message ,title,cancelText,confirmText}) => {
  return (
    <div className="common-overlay-container">
      <div className="common-overlay-box">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="common-overlay-actions">
          <button className="common-overlay-btn common-overlay-cancel" onClick={handleCancel}>
            {cancelText}
          </button>
          <button className="common-overlay-btn common-overlay-confirm" onClick={handleConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
