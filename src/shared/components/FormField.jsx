import '../css/formField.css'

export const FormField = ({
  label,
  icon: Icon,
  className = '',
  id,
  type,
  name,
  placeholder = '',
  onChange,
  value,
}) => {
  return (
    <div className="shared-input-section">
      <label className="shared-label-text">{label}</label>
      <div className="shared-input-container">
        {Icon && <Icon className="formfield-icon" size={20} color="#9ca3af" />}
        <input
          className={`${className} formfield-input`}
          type={type}
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
