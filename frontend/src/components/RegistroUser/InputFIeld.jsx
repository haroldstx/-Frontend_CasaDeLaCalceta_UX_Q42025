import React from "react";

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
  tag,
  name,
}) => {
  const inputStyle = {
    width: "100%",
    padding: "10px 10px 10px 60px",
    borderRadius: "25px",
    border: "none",
    outline: "none",
    backgroundColor: "#FFF8E7",
    color: "#333",
    fontSize: "0.9rem",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
  };

  const iconStyle = {
    width: "30px",
    position: "absolute",
    left: "15px",
    top: "38%",
    transform: "translateY(-50%)",
    color: "#FF6B6B",
    fontSize: "1.9rem",
    display: "flex",
    alignItems: "center",
  };

  // Return null if name is "Login"
  if (tag === "Login") {
    return (
      <div className="form-group" style={{ position: "relative" }}>
        <span style={iconStyle}>{icon}</span>

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={inputStyle}
          required
        />
      </div>
    );
  } else if (tag === "Register") {
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
  }

  // Or return a different component for "Login"
  // if (name === "Login") {
  //   return <div>Login specific component</div>;
  // }
};

export default InputField;
