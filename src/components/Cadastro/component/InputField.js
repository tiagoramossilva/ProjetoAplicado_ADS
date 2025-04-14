// InputField.js
import React from "react";

function InputField({ type, name, placeholder, value, onChange, required }) {
  return (
    <div className="input-container">
      <input
        className="InputLogin"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default InputField;
