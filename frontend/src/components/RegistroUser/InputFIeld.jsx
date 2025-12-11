import React from "react";

const InputField = ({ label, type, placeholder, value, onChange, icon }) => {
  return (
    <div className="form-group">
      {/* El label va dentro del input container para mejor agrupamiento visual */}
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputField;
