import React from 'react';
import './Loading.css'; // External CSS file for styling

const Loading = ({messge}) => {
  return (
    <div className="loading-container">
      <div className="loader" />
      <p>{messge}</p>
    </div>
  );
};

export default Loading;
