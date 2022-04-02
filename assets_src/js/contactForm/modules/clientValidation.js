import isEmail from "validator/lib/isEmail";

export function checkEmpty(formData) {
  let emptyValues = [];
  for (let pair of formData.entries()) {
    let inputKey = pair[0];
    let inputValue = pair[1].trim();
    if (inputValue.length === 0) {
      emptyValues.push(inputKey);
      let inputClassName = inputKey + "Input";
      window[inputClassName].error(0);
    }
  }
  return emptyValues;
}

export function validateEmail(email) {
  let isValid = isEmail(email, {
    require_tld: false,
    ignore_max_length: true,
    allow_ip_domain: true,
  });
  if (!isValid) {
    emailInput.error(1);
  }
  return isValid;
}
