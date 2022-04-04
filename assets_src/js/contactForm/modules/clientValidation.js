import isEmail from "validator/lib/isEmail";

function clientValid(data, emailID) {
  let errors = { errors: false, empty: [], invalid: [] };

  // Checks for missing fields
  errors.empty = [];
  for (let pair of data.entries()) {
    let inputKey = pair[0];
    let inputValue = pair[1].trim();
    if (inputValue.length === 0) {
      errors.empty.push(inputKey);
    }
  }

  // Checks if email is valid
  if (!errors.empty.includes(emailID) && !isEmail(data.get(emailID))) {
    errors.invalid.push(emailID);
  }

  // Sets errors to true if any missing or invalid fields
  if (errors.empty.length > 0 || errors.invalid.length > 0) {
    errors.errors = true;
  }

  return errors;
}

export { clientValid };
