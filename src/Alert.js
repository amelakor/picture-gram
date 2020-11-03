import React from "react";
import "./Alert.css";

function Alert({ type, text }) {
  return <div className={`alert alert-${type}`}>{text}</div>;
}

export default Alert;
