export function handleResponseError(data, messageBox) {
  let validateEmail = true;

  for (let [key, value] of Object.entries(data)) {
    switch (key) {
      case "missing":
        value.forEach((missingEntry) => {
          if (missingEntry === "token") {
            missingEntry = "captcha";
          } else if (missingEntry === "email") {
            validateEmail = false;
          }
          let inputClassName = missingEntry + "Input";
          window[inputClassName].error(0);
        });
      case "validEmail":
        if (validateEmail) {
          emailInput.error(1);
        }
      case "captcha":
        if (value === -1) {
          captchaInput.error(0);
        } else if (value === 0) {
          // TODO: captcha server error
        }
        break;
      default:
        // TODO: other errors
        break;
    }
  }
}

export function handleResponseSuccess(form, messageBox) {
  // TODO: Show success message
  messageBox.setMessage(false);
  form.remove();
}
