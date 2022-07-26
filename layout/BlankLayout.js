import React from "react";

const BlankLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      {children}
    </div>
  );
};

export default BlankLayout;
