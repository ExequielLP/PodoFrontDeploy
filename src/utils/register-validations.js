export const validateForm = (form) => {
  const errors = [];
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  // const passwordRegex =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!form.userName) {
    errors.push("El nombre de usuario es requerido.");
  } else if (form.userName.length <= 3) {
    errors.push("El nombre de usuario debe tener al menos 3 caracteres");
  } else if (form.userName.length > 20) {
    errors.push("El nombre de usuario no debe tener más de 20 caracteres");
  } else if (/\s/.test(form.userName)) {
    errors.push("El nombre de usuario no debe contener espacios en blanco");
  } else if (!alphanumericRegex.test(form.userName)) {
    errors.push(
      "El nombre de usuario solo debe contener caracteres alfanuméricos"
    );
  }

  if (!form.name) {
    errors.push("El nombre es requerido.");
  } else if (form.name.length < 3) {
    errors.push("El nombre debe tener al menos 3 caracteres");
  } else if (form.name.length > 50) {
    errors.push("El nombre no debe tener más de 50 caracteres");
  } else if (/\s/.test(form.name)) {
    errors.push("El nombre no debe contener espacios en blanco");
  }

  if (!form.email) {
    errors.push("El correo electrónico es requerido.");
  } else if (!emailRegex.test(form.email)) {
    errors.push("El correo electrónico no es válido.");
  }

  if (!form.password) {
    errors.push("La contraseña es requerida.");
  } else if (form.password.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres.");
  } else if (form.password.length > 20) {
    errors.push("La contraseña no debe tener más de 20 caracteres");
  }
  // else if (!passwordRegex.test(form.password)) {
  //   errors.push(
  //     "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"
  //   );
  // }

  if (!form.repeatePassword) {
    errors.push("Debe repetir la contraseña.");
  } else if (form.repeatePassword !== form.password) {
    errors.push("Las contraseñas no coinciden.");
  }

  return errors;
};
