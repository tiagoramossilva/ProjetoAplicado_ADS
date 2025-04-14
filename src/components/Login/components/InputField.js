import React from "react";

const InputField = ({ type, placeholder, value, onChange }) => (
  <div className="input-container">
    <input
      className="InputLogin"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default InputField;
