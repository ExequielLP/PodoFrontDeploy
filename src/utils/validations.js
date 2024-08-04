// validations.js
export const validateForm = (form) => {
  const errors = [];

  if (!form.userName) {
    errors.push("El nombre de usuario es requerido.");
  }

  if (!form.name) {
    errors.push("El nombre es requerido.");
  }

  if (!form.email) {
    errors.push("El correo electrónico es requerido.");
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.push("El correo electrónico no es válido.");
  }

  if (!form.password) {
    errors.push("La contraseña es requerida.");
  } else if (form.password.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres.");
  }

  if (!form.repeatePassword) {
    errors.push("Debe repetir la contraseña.");
  } else if (form.repeatePassword !== form.password) {
    errors.push("Las contraseñas no coinciden.");
  }

  return errors;
};
