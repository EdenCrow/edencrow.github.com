function input(errors, classes) { // Gives borders and message to inputs with errors
  if (errors.empty.length > 0 || errors.invalid.length > 0) {
    errors.empty.forEach((value) => {
      classes[value].error(0);
    });
    errors.invalid.forEach((value) => {
      classes[value].error(1);
    });
  }
}

function errorBox(errors, box) { // Outputs an error box
  if (errors.length > 0) {
    box.setMessage(errors);
  }
}

function successBox(form, box) { // Outputs success box and removes form
  form.remove();
  box.setMessage();
}

export { input, errorBox, successBox };
