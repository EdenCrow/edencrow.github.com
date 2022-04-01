import isEmail from "validator/lib/isEmail";

// Set div IDs
// (note IDs must match name attribute for form and submit)
const formID = "formData";
const submitID = "submit";
const captchaID = "captcha";
const emailID = "email";

// Set CSS classes
const inputErrorClass = "blinkBorder";
const captchaInputErrorClass = "captchaBlinkBorder";

// Set loading icon
const spinner = '<i class="fa fa-spinner" aria-hidden="true"></i>';

// Set URL
// const URL = "https://contact.edencrow.info";
const URL = "http://localhost:9876";

// Setup captcha array for checking against
const captchaArray = ["h-captcha-response", "g-recaptcha-response", captchaID];

// Setup classes for form elements
class Button {
  constructor(id) {
    this.element = document.getElementById(id);
    this.spinner = spinner;
    this.processedText = this.element.innerHTML;
  }
  processing(validating = false) {
    let text = validating ? "Validating" : "Processing";
    this.element.innerHTML = [this.spinner, text].join(" ");
    this.element.style.cursor = "default";
    this.element.disabled = true;
  }
  processed() {
    this.element.innerHTML = this.processedText;
    this.element.style.cursor = "pointer";
    this.element.disabled = false;
  }
}

class Input {
  constructor(id, isCaptcha = false) {
    this.element = document.getElementById(id);
    this.isError = false;
    this.isCaptcha = isCaptcha;
    this.errorClass = this.isCaptcha ? captchaInputErrorClass : inputErrorClass;

    // Setup error message text
    this.errorTextID = "errorText" + id;
    this.errorMessageDefault = "<br>";
    this.element.insertAdjacentHTML(
      "afterend",
      `<div id="${this.errorTextID}">${this.errorMessageDefault}</div>`
    );
    this.errorMessageDiv = document.getElementById(this.errorTextID);

    // Function to remove errors
    this.removeError = function () {
      this.element.classList.remove(this.errorClass);
      this.errorMessageDiv.innerHTML = this.errorMessageDefault;
      this.isError = false;
    };

    // Removes error message on blur if not empty
    this.removeListener = function (e) {
      if (!this.isCaptcha) {
        let currentValue = this.element.value.trim();
        if (currentValue.length > 0) {
          this.removeError();
        }
      }
    };
    this.removeHandler = this.removeListener.bind(this);
  }

  // Shows relevant error message
  error(errorType) {
    this.isError = true;
    this.element.classList.add(this.errorClass);
    this.element.addEventListener("blur", this.removeHandler);
    let errorMessage = "";
    switch (errorType) {
      case 0:
        if (!this.isCaptcha) {
          this.element.value = "";
        }
        errorMessage = `Missing ${this.element.id}!`;
        break;
      case 1:
        errorMessage = `Invalid ${this.element.id}!`;
        break;
      default:
        errorMessage = "Undefined Error";
    }
    this.errorMessageDiv.innerHTML = errorMessage;
  }

  // Remove error messages
  reset() {
    this.element.blur();
    if (this.isError) {
      this.element.removeEventListener("blur", this.removeHandler);
      this.removeError();
    }
  }
}

// Get form and submit
const form = document.getElementById(formID);
const submitButton = new Button(submitID);

// Setup captcha
window.captchaInput = new Input(captchaID, true);
window.captchaCallback = function () {
  if (captchaInput.isError) {
    captchaInput.removeError();
  }
};

// Setup input classes
const formFields = new FormData(form);
let fieldClasses = [captchaInput];
for (let pair of formFields.entries()) {
  let field = pair[0];
  if (!captchaArray.includes(field)) {
    let textClassName = field + "Input";
    window[textClassName] = new Input(field);
    fieldClasses.push(window[textClassName]);
  }
}

// Validation functions
function checkEmpty(formData) {
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

function validateEmail(email) {
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

// Functions to deal with Fetch response
function handleResponseError(data) {
  submitButton.processed();
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

function handleResponseSuccess() {
  // TODO: Show success message
  form.remove();
}

// Main function
form.addEventListener(submitID, async (event) => {
  event.preventDefault();

  // Reset error messages
  fieldClasses.forEach((item) => {
    item.reset();
  });

  // Change button
  submitButton.processing(true);

  // Get form data
  let formData = new FormData(form);
  formData.delete("g-recaptcha-response");
  for (let pair of formData.entries()) {
    if (captchaArray.includes(pair[0])) {
      formData.delete(pair[0]);
      formData.append("captcha", pair[1]);
    }
  }

  // Check if data is empty
  let emptyValues = checkEmpty(formData);

  // Check if email is valid if email field present
  let validEmail = false;
  if (!emptyValues.includes(emailID)) {
    validEmail = validateEmail(formData.get(emailID));
  }

  // Espace function if any values empty or email is not valid
  if (emptyValues.length > 0 || !validEmail) {
    submitButton.processed();
    return;
  }

  // Input is valid => send form
  submitButton.processing();
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then((result) =>
      result
        .json()
        .then((jsonResult) =>
          jsonResult.error ? handleResponseError(jsonResult.errors) : handleResponseSuccess()
        )
    )
});
