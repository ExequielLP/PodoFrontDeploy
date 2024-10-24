import { useState } from "react";
import "../css/formField.css";
import { PasswordIconHide, PasswordIconShow } from "../../icons";

export const FormField = ({
  label,
  icon: Icon,
  className = "",
  id,
  type,
  name,
  placeholder = "",
  onChange,
  value,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="shared-input-section">
      <label className="shared-label-text">{label}</label>
      <div className="shared-input-container">
        {Icon && type !== "password" && (
          <Icon className="formfield-icon" size={20} color="#9ca3af" />
        )}
        {type === "password" && (
          <span
            className="formfield-icon togglePasswordVisibility"
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? (
              <PasswordIconShow size={20} color="#9ca3af" />
            ) : (
              <PasswordIconHide size={20} color="#9ca3af" />
            )}
          </span>
        )}
        <input
          className={`${className} formfield-input`}
          type={showPassword && type === 'password' ? 'text' : type}
          placeholder={placeholder}
          id={id}
          name={name}
          onChange={onChange}
          aria-describedby={`${name}-error`}
          {...(value !== undefined ? { value } : {})}
        />
      </div>
    </div>
  );
};
